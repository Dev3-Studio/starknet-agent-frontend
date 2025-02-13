import AgentCreateForm from '@/AgentCreateForm';
import Image from 'next/image';
import formCreate from '@/public/formCreate.png';


export default function CreateAgentPage(){
    return(
        <main className="grid grid-cols-[1fr,auto] px-8 sm:pl-20 sm:pr-20 pt-20 xl:pr-0 max-w-[80rem] mx-auto">
            <AgentCreateForm />
            <Image className="pl-20 pr-8 hidden xl:block" src={formCreate} alt="Form Create"/>
        </main>
    )
}