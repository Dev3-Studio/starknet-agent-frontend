import Image from 'next/image';
export default function Footer(){
    return(
        <footer className="bg-muted p-4 ">
            <a
                className="self-center text-xs text-muted-foreground flex items-center gap-1 w-fit mx-auto"
                href="https://teleswap.gitbook.io/teleswap-docs/"
            >
                Made with ❤️ by{' '}
                <Image
                    src={'https://cdn.dev3.studio/logo.svg'}
                    alt={'Teleswap'}
                    className="h-2 w-auto"
                    width={300}
                    height={62}
                />
            </a>
        </footer>
    )
}