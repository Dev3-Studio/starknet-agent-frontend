import dotenv from 'dotenv';
dotenv.config();

export const SetMetadata = {
    title: 'Agent Forge',
    description: 'Create your own custom, no-code AI models with Argent Forge.',
    type: 'website',
    siteName: 'AgentForge',
    url: process.env.SITE_URL,
    author: 'Dev3.Studio',
    author_url: 'https://dev3.studio',
    themeColor: '#6f6dc0',
    image: 'https://agentforge.dev3.studio/preview.png',
};