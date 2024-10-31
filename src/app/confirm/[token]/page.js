// app/confirm/[token]/page.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmedEmail from '@/app/components/ConfirmedEmail';

const ConfirmEmailPage = ({ params }) => {
    const router = useRouter();
    const { token } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const confirmEmail = async (token) => {
            try {
                const res = await fetch(`https://restaurant-booking-system-production.up.railway.app/api/v1/confirm/${token}`, {
                    method: 'GET',
                });

                if (!res.ok) {
                    throw new Error('Ошибка при подтверждении email');
                }

                setIsSuccess(true); // Успешное подтверждение
            } catch (error) {
                setErrorMessage('Произошла ошибка при подтверждении почты.');
            } finally {
                setIsLoading(false);
            }
        };

        // Подтверждение email при загрузке страницы
        confirmEmail(token);
    }, [token]);

    const handleRedirect = () => {
        router.push('/booking'); // Перенаправление на страницу бронирования
    };

    if (isLoading) {
        return <p>Подождите, идет подтверждение...</p>;
    }

    return (
        <div>
            {isSuccess ? (
                <div>
                    <ConfirmedEmail />
                </div>
            ) : (
                <div>
                    <h1>Ошибка подтверждения</h1>
                    <p>{errorMessage}</p>
                    <button onClick={handleRedirect}>Перейти к бронированию</button>
                </div>
            )}
        </div>
    );
};

export default ConfirmEmailPage;