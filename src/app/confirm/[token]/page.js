'use client';

import { useEffect, useState } from 'react';
import ConfirmEmail from '@/app/components/ConfirmEmail';
import ConfirmedEmail from '@/app/components/ConfirmedEmail';

export default function ConfirmPage({ params }) {
    const { token } = params;
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            confirmEmail(token);
        }
    }, [token]);

    const confirmEmail = async (token) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/v1/confirm/${token}`, {
                method: 'POST', // Измените метод на POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }), // Отправляем токен в теле запроса
            });

            if (!res.ok) {
                throw new Error('Ошибка при подтверждении email');
            }

            const data = await res.json();

            if (data.confirmed) {
                setIsConfirmed(true);
            } else {
                throw new Error('Email не подтверждён.');
            }
        } catch (error) {
            console.error('Ошибка при подтверждении почты:', error);
            setError('Ошибка при подтверждении почты.');
        }
    };

    return (
        <div className='pagename1'>
            <div className="pagename1-blok">
                <h1>Подтверждение почты</h1>
            </div>
            <div className='booking'>
                {isConfirmed ? (
                    <ConfirmedEmail />
                ) : (
                    <ConfirmEmail />
                )}
            </div>
        </div>
    );
};