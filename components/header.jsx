'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import netlifyLogo from 'public/netlify-logo.svg';
import githubLogo from 'public/images/github-mark-white.svg';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Channels', href: '/channels' },
    { linkText: 'About', href: '/about' }
];

export function Header() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={netlifyLogo} alt="Netlify logo" width={140} height={28} />
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                prefetch={true}
                                className={`inline-flex px-1.5 py-1 sm:px-3 sm:py-2 rounded-full no-underline ${pathname === item.href
                                    ? 'bg-[#FFFFF0] text-gray-900'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <Link
                href="https://github.com/mattdnkim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex ml-auto no-underline"
            >
                <Image src={githubLogo} alt="GitHub logo" className="w-7" />
            </Link>
        </nav>
    );
}
