import HorizontalScroll from '@/HorizontalScroll';
import AgentCard from '@/AgentCard';
import AgentCategoryFilter from '@/AgentCategoryFilter';
import SearchBar from '@/components/SearchBar';
import { UserIcon } from 'lucide-react';
import { auth } from '@/config/auth';
import { getUser } from '@/actions/users';
import YourCreation from '@/YourCreation';
import AgentCreate from '@/AgentCreate';
import { fetchAgentsOrReturnEmpty, fetchChatsOrReturnEmpty } from '@/lib/utils';
import { redirect } from 'next/navigation';
import ContinueTalking from '@/ContinueTalking';
import { categories } from '@/lib/constants';

export default async function UserPage() {
    const session = await auth();
    
    const [featuredAgents, newAgents, user] = await Promise.all([
        fetchAgentsOrReturnEmpty({ limit: 6, sort: 'chats', order: 'desc' }),
        fetchAgentsOrReturnEmpty({ limit: 6, sort: 'date', order: 'desc' }),
        getUser(session!.user.address),
    ]);
    
    if ('error' in user) redirect('/?error=unauthorized');
    
    const [creations, continueTalkingTo] = await Promise.all([
        fetchAgentsOrReturnEmpty({ creator: user.id }),
        fetchChatsOrReturnEmpty({ includeMessages: true, order: 'desc' }),
    ]);
    
    const category = featuredAgents[0].tags[0] || categories[0];
    const topPicks = await fetchAgentsOrReturnEmpty({ tags: [category], limit: 6, sort: 'chats', order: 'desc' });
    
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
                    {continueTalkingTo.map((chats, index) => (
                        <ContinueTalking key={index} {...chats} />
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