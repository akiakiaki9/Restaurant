import React from 'react';
import NewsDetailPage from './NewsDetail';
import TitleDetail from '@/app/components/TitleDetail';

const NewsDetail = async ({ params }) => {
    const { id } = params; // Получаем id из параметров

    const res = await fetch(`https://restaurant-booking-system-production.up.railway.app/api/v1/posts/${id}`);

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <TitleDetail data={data} />
            <NewsDetailPage data={data} />
        </div>
    );
};

export default NewsDetail;