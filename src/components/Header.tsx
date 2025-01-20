import SearchBar from '@/components/SearchBar';

export default function Header(){
    return(
        <header className="bg-primary text-white p-4 flex justify-between">
            <h1>Header</h1>
            
            <SearchBar/>
        </header>
    )
}