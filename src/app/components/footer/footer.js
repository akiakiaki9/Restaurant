import React from 'react'
import FooterPage from './FooterPage';

export default async function Footer() {

    const res = await fetch('http://127.0.0.1:8000/api/v1/contacts')

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
