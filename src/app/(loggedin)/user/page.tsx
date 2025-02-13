import HorizontalScroll from '@/HorizontalScroll';
import AgentCard from '@/AgentCard';
import AgentCategoryFilter from '@/AgentCategoryFilter';

export default function UserPage(){
    return(
        <main className="">
             <AgentCategoryFilter/>
            
            <section>
                <h2 className="">Top picks for you...</h2>
                <HorizontalScroll>
                    <AgentCard name="" creator="" description="" image=""/>
                </HorizontalScroll>
            </section>
            
            <section>
                <h2>Continue talking to...</h2>
            </section>
            
            <section>
                <h2>Featured Agents</h2>
            </section>
            
            <section>
                <h2>Creations by you...</h2>
            </section>
            
            <section>
                <h2>New agents today!</h2>
                {/*todo display agents that were created recently*/}
                <HorizontalScroll>
                     <AgentCard name="" creator="" description="" image=""/>
                </HorizontalScroll>
            </section>
        
        </main>
    )
}