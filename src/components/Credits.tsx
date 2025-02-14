import IconCoin from '@/public/iconCoin.svg';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export default function Credits(){
    
    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-4xl mb-8">Tokens</h1>
            
            {/*box*/}
            <div className="flex flex-col items-center justify-center rounded-xl p-4 xl:py-8 xl:px-10 max-w-[45rem] w-full">
                <div className='flex justify-end w-full pr-2'>
                    <div className="my-auto">
                        <IconCoin alt='Coin Icon'/>
                    
                    </div>
                    <p className='font-mono ml-2 text-2xl'>999</p>
                </div>
                
                {/*amount*/}
                <div className='flex justify-between bg-muted rounded-2xl w-full p-2 xl:px-6 py-5 my-2'>
                    <Input className='text-white focus-visible:-none focus-visible:ring-0 text-xl w-2/5 border-none' defaultValue={500} />
                    
                    <div className="my-auto mr-2">
                        <IconCoin alt='Coin Icon'/>
                    </div>
                </div>
                
                {/*network and fees*/}
                <div className='flex justify-between rounded-3xl w-full px-4 p-2 xl:px-8 xl:py-3 mb-5'>
                    <p className='text-white font-regular text-center'>Est total fees: $2.96</p>
                
                </div>
                
                <Button className='py-3 px-6 mt-3'>Buy Credits</Button>
            </div>
        </div>
    )
}