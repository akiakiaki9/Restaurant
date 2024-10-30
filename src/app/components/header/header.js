import React from 'react';
import HeaderPage from './HeaderPage';
import NoneData from '../NoneData';

export default async function Header() {
    try {
        // Запрос к первому API
        const res1 = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');
        if (!res1.ok) {
            throw new Error('Ошибка при получении данных от Layout');
        }
        const layoutData = await res1.json();

        // Запрос ко второму API
        const res2 = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');
        if (!res2.ok) {
            throw new Error('Ошибка при получении данных от Contacts');
        }
        const contactsData = await res2.json();

        // Объединение данных и передача их в компонент HeaderPage
        const combinedData = {
            layout: layoutData[0],  // Например, если layoutData — массив, выбираем первый объект
            contacts: contactsData[0], // Точно так же с данными contacts
        };

        return (
            <div>
                <HeaderPage data={combinedData} />
            </div>
        );
    } catch (error) {
        console.error('Ошибка при запросе данных:', error);
        return <div> <NoneData /> </div>;
    }
}