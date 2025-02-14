import HorizontalScroll from '@/HorizontalScroll';
import AgentCard, { AgentCardProps } from '@/AgentCard';
import AgentCategoryFilter from '@/AgentCategoryFilter';
import SearchBar from '@/components/SearchBar';
import { UserIcon } from 'lucide-react';
import { auth } from '@/config/auth';
import { getAgents, GetAgentsOptions } from '@/actions/agents';
import { getUser } from '@/actions/users';
import YourCreation from '@/YourCreation';
import AgentCreate from '@/AgentCreate';

export default async function UserPage() {
    const session = await auth();
    
    async function fetchAgentsOrReturnEmpty(options: GetAgentsOptions) {
        const agents = await getAgents(options);
        if ('error' in agents) return [];
        return agents;
    }
    
    const [featuredAgents, newAgents, user] = await Promise.all([
        fetchAgentsOrReturnEmpty({ limit: 6, sort: 'chats', order: 'desc' }),
        fetchAgentsOrReturnEmpty({ limit: 6, sort: 'date', order: 'desc' }),
        getUser(session!.user.address),
    ]);
    
    if ('error' in user) return <p>{user.error}</p>;
    
    const [creations, continueTalkingTo] = await Promise.all([
        fetchAgentsOrReturnEmpty({ creator: user.id }),
        // todo fetch agents talked to recently
        fetchAgentsOrReturnEmpty({ limit: 6, sort: 'messages', order: 'desc' }),
    ]);
    
    const recentCategory = continueTalkingTo[0].tags[0];
    const topPicks = await fetchAgentsOrReturnEmpty({ tags: [recentCategory], limit: 6, sort: 'chats', order: 'desc' });
    
    
    return (
        <main className="flex flex-col gap-5 overflow-hidden mb-10">
            <div className='place-self-end flex justify-between gap-2 items-center p-2 max-w-60'>
                <SearchBar/>
                <UserIcon/>
            </div>
            <AgentCategoryFilter/>
            
            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Top picks for you...</h2>
                
                <HorizontalScroll>
                    {topPicks.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            
            </section>
            
            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Continue talking to...</h2>
                <HorizontalScroll>
                    {continueTalkingTo.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>
            
            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Featured Agents</h2>
                <HorizontalScroll>
                    {featuredAgents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>
            
            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Creations by you...</h2>
                <HorizontalScroll>
                    {creations.map((agent, index) => (
                        <YourCreation key={index} {...agent} />
                    ))}
                    
                    <AgentCreate/>
                </HorizontalScroll>
            </section>
            
            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>New agents today!</h2>
                <HorizontalScroll>
                    {newAgents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>
        
        </main>
    )
}