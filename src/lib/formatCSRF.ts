export default function formatCSRF(token: string){
    return token.substring(0,31);
}