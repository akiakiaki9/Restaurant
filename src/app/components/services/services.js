import React from 'react';
import ServicesPage from './ServicesPage';
export default async function Services() {
    // Получение данных с сервера
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/home/services');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <ServicesPage data={data} />
        </div>
    );
}