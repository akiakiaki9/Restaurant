'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import NoneData from '../components/NoneData';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Section({ data }) {
    const [isVisible, setIsVisible] = useState(false);  // Состояние видимости для мобильной версии
    const sectionRef = useRef(null);  // Ссылка на компонент
    const [isMobile, setIsMobile] = useState(false);  // Состояние для проверки мобильной версии

    const pathname = usePathname();
    const router = useRouter();
    const componentName = pathname ? pathname.replace('/', '') || 'Home' : '';

    // Проверка мобильной версии при монтировании компонента
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 828);  // Измените значение на необходимое для вашей мобильной версии
        };

        checkMobile();  // Проверка на этапе монтирования

        window.addEventListener('resize', checkMobile);  // Проверка при изменении размера окна

        return () => {
            window.removeEventListener('resize', checkMobile);  // Удаляем слушатель при размонтировании
        };
    }, []);

    useEffect(() => {
        if (!isMobile) return;  // Если не мобильная версия, не включаем отслеживание

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);  // Изменяем состояние видимости при пересечении
            },
            {
                threshold: 0.1,  // Процент видимости компонента
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);  // Начинаем отслеживание
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);  // Останавливаем отслеживание при размонтировании
            }
        };
    }, [isMobile]);

    // Функция для открытия PDF
    const openPdf = (pdfUrl) => {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');  // Открываем PDF в новой вкладке
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
            <div className="section" ref={sectionRef}>
                <div className="section-blok">
                    {(!data || data.length === 0) ? (
                        <NoneData />
                    ) : (
                        data.map((item) => (
                            <div
                                className="section-blok__section"
                                key={item.id}
                                onClick={() => openPdf(item.file)}  // Открываем PDF при клике
                            >
                                <div className="section-image-container">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={500}
                                        height={300}
                                        className="section-image"
                                    />
                                    {/* Для мобильной версии показываем при скролле, для ПК по наведению */}
                                    <div className={`section-info ${isMobile ? (isVisible ? 'visible' : '') : ''}`}>
                                        <h1>{item.title}</h1>
                                        {/* Ссылка на PDF */}
                                        <a href={item.file} target="_blank" rel="noopener noreferrer">
                                            Открыть PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};