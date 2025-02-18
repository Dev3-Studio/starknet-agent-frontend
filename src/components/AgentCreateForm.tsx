'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zAgentCreate, zAgentTool } from '@/lib/dto';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import { ImagePlus, Info, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { z } from 'zod';
import { createAgent } from '@/actions/agents';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/constants';
import { useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Textarea } from '@/ui/textarea';
import { Card, CardContent } from '@/ui/card';
import Ajv from 'ajv';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import getPresignedUrl from '@/actions/getPresignedUrl';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/ui/use-toast';

const zJsonTemplate = z.string().refine(
    (value) => {
        try {
            if (value === '') return true; // Allow empty string
            JSON.parse(value);
            return true;
        } catch (error) {
            return false;
        }
    },
    {
        message: 'Invalid JSON format. Please check your syntax.',
    },
);



const zRecordTemplate = z.object({
    key: z.string(),
    value: z.string(),
}).array();

function validateArgumentsSchema(schema: object) {
    const ajv = new Ajv();
    return ajv.validateSchema(schema);
}

const zToolsForm = zAgentTool.omit({
    bodyTemplate: true,
    queryTemplate: true,
    environment: true,
    headersTemplate: true,
    argumentsSchema: true,
}).extend({
    bodyTemplate: zJsonTemplate,
    queryTemplate: zJsonTemplate,
    headersTemplate: zRecordTemplate,
    environment: zRecordTemplate,
    argumentsSchema: z.string().refine(
        (value) => {
            try {
                return  validateArgumentsSchema(JSON.parse(value));
            } catch (error) {
                return false;
            }
        },
        {
            message: 'Invalid JSON schema. Please check your syntax.',
        },
    ),
});

const zAgentForm = zAgentCreate.omit({
    image: true,
    tools: true,
}).extend({
    
    tools: zToolsForm.array(),
    
    image: z.instanceof(File, { message: 'Image is required' },
    )
        .refine(
            (file) => file.size <= 50000000,
            'Image must be less than 5MB',
        )
        .refine(
            (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
            'Image must be in JPG or PNG format',
        ).optional(),
});
type AgentForm = z.infer<typeof zAgentForm>;

export default function AgentCreateForm() {
    
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    const form = useForm<AgentForm>({
        resolver: zodResolver(zAgentForm),
        defaultValues: {
            name: '',
            description: '',
            tagline: '',
            biography: '',
            royaltyPerTokenUsd: 5,
            directive: '',
            tags: [],
            rules: [''],
            
        },
    });
    
    const zRecordTemplate = z.object({
        key: z.string(),
        value: z.string(),
    }).array();
    
    const zRecordSchema = z.record(z.string(), z.string());
    
    type RecordTemplate = z.infer<typeof zRecordTemplate>;
    type RecordSchema = z.infer<typeof zRecordSchema>;
    
    
    function arrayToRecord(arr: RecordTemplate): RecordSchema {
        return arr.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {} as RecordSchema);
    }
    
    async function uploadFile(file: File) {
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const presignedUrl = await getPresignedUrl(uniqueFileName);
        
        
        try {
            const response = await fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                    'Content-Length': file.size.toString(),
                },
            });
            
            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            
            return uniqueFileName;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
    
    async function onSubmit(values: AgentForm) {
        // disable submit button
        buttonRef.current?.setAttribute('disabled', 'true');
        
        
        
        let fileUrl = 'https://agentforge.dev3.studio/agent-forge/';
        if (values.image){
            fileUrl = fileUrl + await uploadFile(values.image);
        } else {
            fileUrl = fileUrl + 'defaultAvatar.jpg';
        }
        
        const tools = values.tools.map((tool) => ({
            ...tool,
            argumentsSchema: JSON.parse(tool.argumentsSchema),
            environment: arrayToRecord(tool.environment),
            headersTemplate: arrayToRecord(tool.headersTemplate),
            queryTemplate: JSON.parse(tool.queryTemplate),
            bodyTemplate: JSON.parse(tool.bodyTemplate),
        }));
        
        const res = await createAgent({ ...values, image: fileUrl, tools });
        
        if ("error" in res) {
            console.error(res.error);
            toast(
                {
                    title: "Error",
                    description: res.error,
                    variant: "destructive",
                }
            )
        } else {
            toast({
                title: "Success",
                description: "Agent created successfully",
            })
            
            // clear form
            form.reset();
        }
        
        
        
        
    }
    
    // react hook form
    const { fields: toolFields, append: appendTool, remove: removeTool } = useFieldArray({
        control: form.control,
        name: 'tools',
    });
    
    
    // upload image stuff
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('');
    
    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue('image', acceptedFiles[0]);
                form.clearErrors('image');
            } catch (error) {
                setPreview(null);
                form.resetField('image');
            }
        },
        [form],
    );
    
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 5000000,
            accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
        });
    
    
    return (
        <div className="">
            <h1 className="font-bold text-5xl mb-9 text-center">Forge your Agent</h1>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (e) => {
                    console.error(e);
                })} className="space-y-8">
                    
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="mx-auto md:w-1/2">
                                <FormLabel
                                    className={`${
                                        fileRejections.length !== 0 && 'text-destructive'
                                    }`}
                                >
                                    <h2 className="text-xl font-semibold tracking-tight">
                                <span
                                    className={
                                        form.formState.errors.image || fileRejections.length !== 0
                                            ? 'text-destructive'
                                            : 'text-muted-foreground'
                                    }
                                ></span>
                                    </h2>
                                </FormLabel>
                                <FormControl>
                                    <div
                                        {...getRootProps()}
                                        className="w-80 h-80 overflow-hidden aspect-square mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-primary p-8 shadow-sm shadow-foreground"
                                    >
                                        {preview && (
                                            <Image
                                                src={preview as string}
                                                alt="Uploaded image"
                                                className="w-[80%] h-full p-2 rounded-lg object-contain"
                                                width={320}
                                                height={320}
                                                layout="intrinsic"
                                            />
                                        )}
                                        <ImagePlus className={`size-40 ${preview ? 'hidden' : 'block'}`}/>
                                        <Input {...getInputProps()} type="file"/>
                                        {isDragActive ? (
                                            <p>Drop the image!</p>
                                        ) : (
                                            <p className="text-center">Click here or drag an image to upload it</p>
                                        )}
                                    </div>
                                
                                </FormControl>
                                <FormMessage>
                                    {fileRejections.length !== 0 && (
                                        <p>
                                            Image must be less than 5MB and of type png, jpg, or jpeg
                                        </p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex">
                        <h2 className="font-bold text-2xl">Socials</h2>
                        <Tooltip>
                            <TooltipTrigger className="flex"><Info className="my-auto ml-2" /></TooltipTrigger>
                            <TooltipContent>
                                <p>This information is not given to your agent, but is used to help users find your agent.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    
                    
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Input placeholder="Bob the Builder" {...field} />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>The name of your agent.  This will be displayed to users.</p>
                                    </TooltipContent>
                                </Tooltip>
                                
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Textarea placeholder="Bob is a friendly builder who can help you build things." {...field} />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>A description of your agent.  This will be displayed to users.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tagline</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Input placeholder="I build things!" {...field} />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>A short tagline for your agent (max 32 chars). This is displayed on the agent card.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Select onValueChange={(value) => field.onChange([value])}>
                                                <SelectTrigger className="w-80">
                                                    <SelectValue placeholder="Select a category"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        categories.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Choose a category that best describes your agent.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <FormDescription>
                                    To what category does your agent belong?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    
                    <div className="flex">
                        <h2 className="font-bold text-2xl">Agent Info</h2>
                        <Tooltip>
                            <TooltipTrigger className="flex"><Info className="my-auto ml-2" /></TooltipTrigger>
                            <TooltipContent>
                                <p>This information is used by your agent to inform its actions and responses.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="biography"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biography</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Textarea placeholder="Bob is a master builder with 20 years of experience. He is a friendly and helpful person who loves to build things." {...field} />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Describe your agent&apos;s background and personality.  This is provided to the agent.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="directive"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directive</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Textarea placeholder="Help users build things by providing instructions and advice." {...field} />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>What is the primary goal or purpose of your agent?  This is provided to the agent.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex flex-col">
                        <div>
                            <FormLabel>Rules</FormLabel>
                            <Tooltip>
                                <TooltipTrigger className="inline-flex h-4 w-4 items-center justify-center rounded-full text-xs text-muted-foreground"><Info/></TooltipTrigger>
                                <TooltipContent><p>These are specific rules your agent MUST follow. They&apos;re given to the agent, make them short and clear. Add multiple rules if necessary.</p></TooltipContent>
                            </Tooltip>
                        </div>
                        {form.watch('rules')?.map((_, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={`rules.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex gap-2 mt-2">
                                                <Input placeholder={`Never give financial advice.`} {...field} />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        const rules = form.getValues('rules');
                                                        form.setValue('rules', rules.filter((_, i) => i !== index));
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 w-[8rem]"
                            onClick={() => form.setValue('rules', [...form.getValues('rules'), ''])}
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            Add Rule
                        </Button>
                    </div>
                    
                    {/* Tools Array */
                    }
                    <div className="space-y-4 flex flex-col">
                        <div>
                        
                        <FormLabel>Tools</FormLabel>
                        <Tooltip>
                            <TooltipTrigger className="inline-flex h-4 w-4 items-center justify-center rounded-full text-xs text-muted-foreground"><Info/></TooltipTrigger>
                            <TooltipContent><p>Tools allow your agent to interact with external APIs. Define how your agent will use these tools.</p></TooltipContent>
                        </Tooltip>
                        </div>
                        
                        {toolFields.map((field, index) => (
                            <Card key={field.id}>
                                <CardContent className="pt-6 space-y-4">
                                    {/* Tool Name */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tool Name</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Input placeholder="search_google" {...field} />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>A short, descriptive name for the tool (&apos;search_google&apos;).  This will be used internally by the agent.</p></TooltipContent>
                                                </Tooltip>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* Tool Description */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Input placeholder="Searches Google for information." {...field} />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>A description of what the tool does.  This is provided to the agent.</p></TooltipContent>
                                                </Tooltip>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* Arguments Schema */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.argumentsSchema`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Arguments Schema</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Textarea
                                                                
                                                                placeholder={JSON.stringify({"type": "object", "properties": {"query": {"type": "string", "description": "The search query"}}, "required": ["query"]}, null, 2)}
                                                                className="font-mono h-72" {...field}
                                                            />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            A JSON schema defining the arguments this tool accepts.  This uses the <a href="https://json-schema.org/" target="_blank" rel="noopener noreferrer" className="underline">JSON Schema</a> standard.  This example shows a schema for a single &quot;query&quot; string.  Make sure you describe *every* property!
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* Environment */}
                                    <div>
                                        <FormLabel>Environment Variables</FormLabel>
                                        <Tooltip>
                                            <TooltipTrigger className="inline-flex h-4 w-4 items-center justify-center rounded-full text-xs text-muted-foreground"><Info/></TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Define environment variables for this tool. These are key-value pairs that will be available to the tool.  These are secret, and *are not* provided to the agent prompt. Use this for API keys, etc.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {form.watch(`tools.${index}.environment`)?.map((_, envIndex) => (
                                            <div key={envIndex} className="flex gap-2 mt-2">
                                                <Input
                                                    placeholder="GOOGLE_API_KEY"
                                                    {...form.register(`tools.${index}.environment.${envIndex}.key`)}
                                                />
                                                <Input
                                                    placeholder="your-secret-api-key"
                                                    {...form.register(`tools.${index}.environment.${envIndex}.value`)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="min-w-8"
                                                    onClick={() => {
                                                        const environments = form.getValues(`tools.${index}.environment`);
                                                        form.setValue(
                                                            `tools.${index}.environment`,
                                                            environments.filter((_, i) => i !== envIndex),
                                                        );
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="mt-2"
                                            onClick={() => {
                                                const environments = form.getValues(`tools.${index}.environment`) || [];
                                                form.setValue(`tools.${index}.environment`, [
                                                    ...environments,
                                                    { key: '', value: '' },
                                                ]);
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-2"/>
                                            Add Environment Variable
                                        </Button>
                                    </div>
                                    
                                    {/* Method */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.method`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Method Type</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select method"/>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="GET">GET</SelectItem>
                                                                <SelectItem value="POST">POST</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>The HTTP method to use for this tool (GET or POST).</p></TooltipContent>
                                                </Tooltip>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* URL Template */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.urlTemplate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>URL Template</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Input placeholder="https://www.google.com/search?q={query}" {...field} />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            The URL template for the API endpoint. Use curly braces <code>{`{}`}</code> to denote placeholders for arguments defined in the arguments schema.  For example, if your arguments schema defines a &quot;query&quot; property, you can use <code>{`{query}`}</code> in the URL.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* Headers Template */}
                                    <div>
                                        <FormLabel>Headers Template</FormLabel>
                                        <Tooltip>
                                            <TooltipTrigger className="inline-flex h-4 w-4 items-center justify-center rounded-full text-xs text-muted-foreground"><Info/></TooltipTrigger>
                                            <TooltipContent><p>Define static headers for the API request. These are key-value pairs.</p></TooltipContent>
                                        </Tooltip>
                                        {form.watch(`tools.${index}.headersTemplate`)?.map((_, headerIndex) => (
                                            <div key={headerIndex} className="flex gap-2 mt-2">
                                                <Input
                                                    placeholder="Content-Type"
                                                    {...form.register(`tools.${index}.headersTemplate.${headerIndex}.key`)}
                                                />
                                                <Input
                                                    placeholder="application/json"
                                                    {...form.register(`tools.${index}.headersTemplate.${headerIndex}.value`)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="min-w-8"
                                                    onClick={() => {
                                                        const headers = form.getValues(`tools.${index}.headersTemplate`);
                                                        form.setValue(
                                                            `tools.${index}.headersTemplate`,
                                                            headers.filter((_, i) => i !== headerIndex),
                                                        );
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="mt-2"
                                            onClick={() => {
                                                const headers = form.getValues(`tools.${index}.headersTemplate`) || [];
                                                form.setValue(`tools.${index}.headersTemplate`, [
                                                    ...headers,
                                                    { key: '', value: '' },
                                                ]);
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-2"/>
                                            Add Header
                                        </Button>
                                    </div>
                                    
                                    {/* Query Template */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.queryTemplate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Query Template</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder={JSON.stringify({"query": "{query}"}, null, 2)}
                                                                className="font-mono h-32"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            A JSON template for the query parameters of the API request. Use curly braces <code>{`{}`}</code> to denote placeholders for arguments defined in the arguments schema. Any literal JSON values will be sent with *every* request.  Leave empty to send no query parameters.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <FormDescription>
                                                    Enter a valid JSON object that will serve as the request query
                                                    template
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {/* Body Template */}
                                    <FormField
                                        control={form.control}
                                        name={`tools.${index}.bodyTemplate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Body Template</FormLabel>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder={JSON.stringify({"prompt": "{prompt}", "max_tokens": 100}, null, 2)}
                                                                className="font-mono h-32"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            A JSON template for the body of the API request. Use curly braces <code>{`{}`}</code> to denote placeholders for arguments defined in the arguments schema.  Any literal JSON values will be sent with *every* request. Leave empty to send no body.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <FormDescription>
                                                    Enter a valid JSON object that will serve as the request body
                                                    template
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeTool(index)}
                                    >
                                        Remove Tool
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        
                        <Button
                            className="max-w-[8rem]"
                            type="button"
                            variant="secondary"
                            onClick={() => appendTool({
                                name: '',
                                description: '',
                                argumentsSchema: '',
                                environment: [{ key: '', value: '' }],
                                method: 'GET',
                                urlTemplate: '',
                                headersTemplate: [{ key: '', value: '' }],
                                queryTemplate: '',
                                bodyTemplate: '',
                            })}
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            Add Tool
                        </Button>
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="royaltyPerTokenUsd"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Royalty %</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FormControl>
                                            <Input type="number" className="w-20" placeholder="5" {...field}
                                                   onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                            />
                                        </FormControl>
                                    </TooltipTrigger>
                                    <TooltipContent><p>The percentage of revenue you want to receive for each token generated by your agent.</p></TooltipContent>
                                </Tooltip>
                                <FormDescription>
                                    How much do you want to charge users of your agent?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <Button type="submit" ref={buttonRef}>Create Agent</Button>
                </form>
            </Form>
        </div>
    );
    
    
}