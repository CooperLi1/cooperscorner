import { Sigmar } from 'next/font/google';

export const sigmar = Sigmar({weight: '400', subsets: ['latin']})

import { Montserrat } from 'next/font/google';

export const mont = Montserrat({weight: ['500'], subsets: ['latin']})

import { Open_Sans } from 'next/font/google';

export const opensans = Open_Sans({weight: ['500'], subsets: ['latin']})

import { Manrope } from 'next/font/google';

export const manrope = Manrope({weight: ['500'], subsets: ['latin']})

import { IBM_Plex_Mono } from 'next/font/google';

export const hackerMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-hacker-mono',
})
