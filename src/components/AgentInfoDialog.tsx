import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentPublic } from '@/lib/dto';

interface AgentInfoDialogProps {
    agent: AgentPublic;
    className?: string;
}

const AgentInfoDialog: React.FC<AgentInfoDialogProps> = ({ agent, className }) => {
    const formatPrice = (priceInUsd: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }).format(priceInUsd / 10000);
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={cn('text-sm font-medium cursor-pointer', className)}>
                    <Info />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={agent.image} alt={agent.name} />
                            <AvatarFallback>
                                {agent.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-bold mb-1">
                                {agent.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mb-2">
                                {agent.tagline}
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium mb-2">Creator</h3>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={agent.creator.profileImage} alt={agent.creator.name} />
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{agent.creator.walletAddress}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium mb-2">Pricing</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Price per token</p>
                                    <p className="text-lg font-medium">{formatPrice(agent.pricePerTokenUsd)}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Royalty per token</p>
                                    <p className="text-lg font-medium">{formatPrice(agent.royaltyPerTokenUsd)}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {agent.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Total Chats</p>
                                <p className="text-lg font-medium">
                                    {agent.totalChats.toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                                <p className="text-lg font-medium">
                                    {agent.totalMessages.toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AgentInfoDialog;