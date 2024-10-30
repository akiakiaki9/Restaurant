import React from 'react';
import YandexGoPage from './YandexGoPage';

export default async function YandexGo() {
    // Получение данных с сервера
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <YandexGoPage data={data} />
        </div>
    );
}