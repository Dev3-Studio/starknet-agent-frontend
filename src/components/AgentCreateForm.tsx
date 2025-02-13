"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AgentCreate, zAgentCreate } from '@/lib/dto';
import { useDropzone } from "react-dropzone";
import React from 'react';
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { z } from 'zod';
import { Textarea } from '@/ui/textarea';
import { AutosizeTextarea } from '@/ui/autoresizetextarea';

const zAgentForm = zAgentCreate.omit({ image: true }).extend({image: z.instanceof(File)});
type AgentForm = z.infer<typeof zAgentForm>;

export default function AgentCreateForm(){
    
    const form = useForm<AgentForm>({
        resolver: zodResolver(zAgentForm),
        defaultValues: {
        },
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: AgentForm) {
        // todo upload image to cloudflare bucket and get link
        console.log(values)
    }
    
    // upload image stuff
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
    
    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("image", acceptedFiles[0]);
                form.clearErrors("image");
            } catch (error) {
                setPreview(null);
                form.resetField("image");
            }
        },
        [form],
    );
    
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 1000000,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });
    
    function UploadImageField(){
        return(
            <FormField
                control={form.control}
                name="image"
                render={() => (
                    <FormItem className="mx-auto md:w-1/2">
                        <FormLabel
                            className={`${
                                fileRejections.length !== 0 && "text-destructive"
                            }`}
                        >
                            <h2 className="text-xl font-semibold tracking-tight">
                                <span
                                    className={
                                        form.formState.errors.image || fileRejections.length !== 0
                                            ? "text-destructive"
                                            : "text-muted-foreground"
                                    }
                                ></span>
                            </h2>
                        </FormLabel>
                        <FormControl>
                            <div
                                {...getRootProps()}
                                className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                            >
                                {preview && (
                                    <Image
                                        src={preview as string}
                                        alt="Uploaded image"
                                        className="rounded-lg object-contain"
                                        width={400}
                                        height={300}
                                        layout="intrinsic"
                                    />
                                )}
                                <ImagePlus
                                    className={`size-40 ${preview ? "hidden" : "block"}`}
                                />
                                <Input {...getInputProps()} type="file" />
                                {isDragActive ? (
                                    <p>Drop the image!</p>
                                ) : (
                                    <p>Click here or drag an image to upload it</p>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage>
                            {fileRejections.length !== 0 && (
                                <p>
                                    Image must be less than 1MB and of type png, jpg, or jpeg
                                </p>
                            )}
                        </FormMessage>
                    </FormItem>
                )}
            />
        )
    }

    return(
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <UploadImageField/>
                    
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jarvis" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your agent&apos;s display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <AutosizeTextarea placeholder="Add a short tagline for your character" {...field} />
                                </FormControl>
                                <FormDescription>
                                    User readable description of the agent.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tagline</FormLabel>
                                <FormControl>
                                    <Input placeholder="Add a short tagline for your character" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Max 32 Characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="directive"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directive</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The goal of the agent.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="biography"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biography</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Describe information about your agent. Information like the agent&apos;s personality, background, and more.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="rules"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rules</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your agent&apos;s display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="tools"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tools</FormLabel>
                                <FormControl>
                                
                                </FormControl>
                                <FormDescription>
                                    This is your agent&apos;s display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="royaltyPerTokenUsd"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Royalty %</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your agent&apos;s display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your agent&apos;s display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button type="submit">Create Agent</Button>
                </form>
            </Form>
        </div>
    )
    
    
    

}


