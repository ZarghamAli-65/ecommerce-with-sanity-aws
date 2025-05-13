// lib/client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // optional, only needed for authenticated requests
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
