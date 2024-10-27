'use client';
import React from 'react';
import Link from 'next/link';

export default function TitleDetail({ data }) {

    return (
        <div className='pagename'>
            <div className="pagename-blok">
                {(!data) ? (
                    <p>Нет названия</p>
                ) : (
                    <h2>{data.title}</h2>
                )}
                <p>
                    <Link href="/" className='pagename-parent'>Home</Link>
                </p>
            </div>
        </div>
    );
}