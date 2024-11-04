'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NoneData from '../components/NoneData';
import { usePathname, useRouter } from 'next/navigation';

export default function NewsPage({ data }) {
    const [isMobile, setIsMobile] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const componentName = pathname ? pathname.replace('/', '') || 'Home' : '';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        handleResize(); // Проверяем размер экрана при первой загрузке
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <div className="pagename1">
            <div className="pagename1-blok">
                <h1>{componentName}</h1>
                <p>
                    <Link href="/" className='pagename1-parent'>Home</Link>
                    <span className='pagename1-drop'>/</span>
                    <span className='pagename1-child'>{componentName}</span>
                </p>
            </div>
            <div className='news'>
                {(!data || data.length === 0) ? (
                    <NoneData />
                ) : (
                    <div>
                        {data.map((item, index) => (
                            <div className="news-blok" key={item.id}>
                                <div className="news-blok__container">
                                    <div className='new'>
                                        <div className="new-blok">
                                            {isMobile || index % 2 === 0 ? (
                                                <>
                                                    <div className="new-blok__container-1">
                                                        <Image src={item.image} alt={item.title} height={500} width={500} />
                                                    </div>
                                                    <div className="new-blok__container-2">
                                                        <p className='new__date'>{formatDate(item.created_at)}</p>
                                                        <p className='new__title'>{item.title}</p>
                                                        <p className='new__subtitle'>{item.subtitle}</p>
                                                        <Link href={`/news/${item.id}`}>ПОДРОБНО</Link>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="new-blok__container-2">
                                                        <p className='new__date'>{formatDate(item.created_at)}</p>
                                                        <p className='new__title'>{item.title}</p>
                                                        <p className='new__subtitle'>{item.subtitle}</p>
                                                        <Link href={`/news/${item.id}`}>ПОДРОБНО</Link>
                                                    </div>
                                                    <div className="new-blok__container-1">
                                                        <Image src={item.image} alt={item.title} height={500} width={500} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};