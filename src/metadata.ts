import dotenv from 'dotenv';
dotenv.config();

// todo: update metadata
export const SetMetadata = {
    title: 'Title',
    description: 'Description',
    type: 'website',
    siteName: 'SiteName',
    url: process.env.SITE_URL,
    author: 'Dev3.Studio',
    author_url: 'https://dev3.studio',
    themeColor: '#00FF00',
    image: 'https://placehold.co/600x400',
};