'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function LoadPage() {
    const router = useRouter();

    useEffect(() => {
        // Прокрутка страницы вверх при изменении маршрута
        window.scrollTo(0, 0);
    }, [router.pathname]);

    return null;
}
