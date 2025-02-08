import SearchBar from '@/components/SearchBar';
import WalletConnectButton from '@/components/WalletConnectButton';
import Logo from '@/public/logo.svg'

export default function Header(){
    return(
        <header className="p-4 flex justify-between">
            <Logo/>
            <WalletConnectButton />
        </header>
    )
}