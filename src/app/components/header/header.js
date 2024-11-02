import React from 'react';
import HeaderPage from './HeaderPage';

export default async function Header() {
    // Получение данных с сервера
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const [data] = await res.json(); // Получаем первый объект из массива

    return (
        <div>
            <HeaderPage data={data} />
        </div>
    );
}
