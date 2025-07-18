// lib/client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // optional, only needed for authenticated requests
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
