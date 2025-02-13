import HorizontalScroll from '@/HorizontalScroll';
import AgentCard, { AgentCardProps } from '@/AgentCard';
import AgentCategoryFilter from '@/AgentCategoryFilter';
import SearchBar from '@/components/SearchBar';
import { UserIcon } from 'lucide-react';

const agents: AgentCardProps[] = [
    { creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Astra" },
    { creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Breach" },
    { creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Brimstone" },
]

export default function UserPage() {
    return (
        <main className="flex flex-col gap-5 overflow-hidden">
            <div className='place-content-end flex justify-between gap-2 items-center p-2'>
                <SearchBar />
                <UserIcon />
            </div>
            <HorizontalScroll>
                <AgentCategoryFilter />
            </HorizontalScroll>

            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Top picks for you...</h2>

                <HorizontalScroll>
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>

            </section>

            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Continue talking to...</h2>
                <HorizontalScroll>
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>

            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Featured Agents</h2>
                <HorizontalScroll>
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>

            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>Creations by you...</h2>
                <HorizontalScroll>
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>

            <section className="pl-8 flex flex-col gap-5">
                <h2 className='text-2xl'>New agents today!</h2>
                {/*todo display agents that were created recently*/}
                <HorizontalScroll>
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>

        </main>
    )
}