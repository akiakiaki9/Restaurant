import React from 'react'
import FooterPage from './FooterPage';

export default async function Footer() {

    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts')

    if (!res.ok) {
        throw new Error('Ошибка при получении данных')
    }

    const data = await res.json();

    return (
        <div>
            <FooterPage data={data} />
        </div>
    )
}
