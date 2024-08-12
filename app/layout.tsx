import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Nextjs Auth V5',
	description: 'A simple Nextjs authentication app using Authjs'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html
				lang="en"
				suppressHydrationWarning
			>
				<body className={roboto.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						// disableTransitionOnChange
					>
						<Toaster />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
