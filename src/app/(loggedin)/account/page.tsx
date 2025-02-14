import { fetchAgentsOrReturnEmpty } from '@/lib/utils'
import { auth } from '@/config/auth'
import { getUser } from '@/actions/users'
import { redirect } from 'next/navigation'
import YourCreation from '@/YourCreation'
import AgentCreate from '@/AgentCreate'
import Credits from '@/Credits';

export default async function CreationPage() {
    const session = await auth()
    const user = await getUser(session!.user.address)
    
    if ('error' in user) {
        redirect('/?error=unauthorized')
    }
    
    const creations = await fetchAgentsOrReturnEmpty({ creator: user.id })
    
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Account</h1>
            
            
            <div className="ring ring-muted-foreground rounded-2xl p-10 sm:max-w-[min(45rem,60vw)] max-w-[90vw] mx-auto mt-10">
                <Credits/>
            
            </div>
            
            <h2 className="text-2xl text-center font-bold mb-4 mt-10">Your Creations</h2>
            <div className="flex gap-8 justify-center">
                {creations.map((agent, index) => (
                    <YourCreation key={agent.id || index} {...agent} />
                ))}
                <AgentCreate />
                
            </div>
            
            
            
            
            
          
        </main>
    )
}