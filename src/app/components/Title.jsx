'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Title() {

    const pathname = usePathname();
    const componentName = pathname ? pathname.replace('/', '') || 'Home' : '';

    return (
        <div className='pagename'>
            <div className="pagename-blok">
                <h1>{componentName}</h1>
                <p>
                    <Link href="/" className='pagename-parent'>Home</Link>
                    <span className='pagename-drop'>/</span>
                    <span className='pagename-child'>{componentName}</span>
                </p>
            </div>
        </div>
    );
};