'use client';
import { logout } from '@/actions/logout';

interface LogoutButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

export default function LogoutButton({
	children,
	mode = 'redirect',
	asChild
}: LogoutButtonProps) {
	const onClick = () => {
		logout();
	};
	return (
		<span
			onClick={onClick}
			className="cursor-pointer"
		>
			{children}
		</span>
	);
}
