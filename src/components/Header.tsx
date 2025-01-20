import SearchBar from '@/components/SearchBar';
import WalletConnectButton from '@/components/WalletConnectButton';

export default function Header(){
    return(
        <header className="bg-primary text-white p-4 flex justify-between">
            <h1>Header</h1>
            <WalletConnectButton />
            <SearchBar/>
        </header>
    )
}