import React from 'react';
import HeaderPage from './HeaderPage';

export default async function Header() {
    try {
        // Запрос к первому API
        const res1 = await fetch('http://127.0.0.1:8000/api/v1/layout');
        if (!res1.ok) {
            throw new Error('Ошибка при получении данных от Layout');
        }
        const layoutData = await res1.json();

        // Запрос ко второму API
        const res2 = await fetch('http://127.0.0.1:8000/api/v1/contacts');
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
        return <div>Не удалось загрузить данные для заголовка.</div>;
    }
}