'use client';
import React, { useEffect, useState } from 'react';
import YandexGoPage from './YandexGoPage';

export default function YandexGo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');
                if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);

                const result = await res.json();

                if (Array.isArray(result) && result.length > 0) {
                    setData(result);
                } else if (result && typeof result === 'object') {
                    // Если результат - объект, конвертируем его в массив
                    setData([result]);
                } else {
                    console.error('Ответ API пустой или неправильный формат:', result);
                }
            } catch (error) {
                console.error('Ошибка сети или получения данных:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <YandexGoPage data={data} />
        </div>
    );
};