import AgentCreateForm from '@/AgentCreateForm';
import Image from 'next/image';
import formCreate from '@/public/formCreate.png';


export default function CreateAgentPage(){
    return(
        <main className="grid grid-cols-[1fr,auto] px-8 sm:pl-20 sm:pr-20 pt-20 xl:pr-0 max-w-[80rem] mx-auto pb-20 w-full">
            <AgentCreateForm />
            
            <div className="relative h-fit">
                <div className="absolute inset-0 blur-3xl bg-primary rounded-full -z-10"></div>
                <Image className="pl-20 pr-8 hidden xl:block relative z-10" src={formCreate} alt="Form Create"/>
            </div>
        </main>
    )
}