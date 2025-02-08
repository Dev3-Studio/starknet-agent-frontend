import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';


// todo fetch user info from backend
export default function UserInfo(){
    return(
        <div className="bg-primary flex px-4 py-6">
            <Avatar className="h-fit my-auto">
                <AvatarImage src="https://avatars.dicebear.com/api/avataaars/1.svg"/>
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="ml-4">
                <p>
                    Username
                </p>
                <p className="text-gray-400 -mt-1">
                    Credits: 1235
                </p>
            </div>
        </div>
    )
}