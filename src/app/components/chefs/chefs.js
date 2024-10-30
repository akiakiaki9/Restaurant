import React from 'react';
import ChefsPage from './Chefs.jsx'

export default async function Chefs() {
    // Получение данных с сервера
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/home/cooks');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <ChefsPage data={data} />
        </div>
    );
};