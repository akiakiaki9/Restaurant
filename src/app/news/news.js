'use client';
import React, { useState, useEffect } from 'react';
import NewsPage from './NewsPage';
import NoneData from '../components/NoneData';
import Title from '../components/Title';

export default function News() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); // Управление текущей страницей
    const [totalPages, setTotalPages] = useState(1); // Количество страниц
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для получения данных с сервера
    const fetchNews = async (page) => {
        setLoading(true);
        try {
            const res = await fetch(`https://restaurant-booking-system-production.up.railway.app/api/v1/posts?page=${page}`);
            if (!res.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const result = await res.json();

            // Сортировка новостей по дате (от новых к старым)
            const sortedResults = result.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setData(sortedResults);
            setTotalPages(Math.ceil(result.count / 3));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(page); // Загружаем новости при изменении страницы
    }, [page]);

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <div>
                    <Title />
                    <NoneData />
                </div>
            ) : (
                <NewsPage data={data} page={page} />
            )}

            <div className="pagination">
                <button
                    onClick={() => handlePageClick(page - 1)}
                    disabled={page === 1}
                >
                    Предыдущая
                </button>

                {page > 2 && <button onClick={() => handlePageClick(1)}>1</button>}
                {page > 3 && <span>...</span>}

                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    // Показываем номера страниц, если они близки к текущей
                    if (pageNumber >= page - 1 && pageNumber <= page + 1) {
                        return (
                            <button
                                key={pageNumber}
                                className={page === pageNumber ? 'active' : ''}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                })}

                {page < totalPages - 2 && <span>...</span>}
                {page < totalPages - 1 && (
                    <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
                )}

                <button
                    onClick={() => handlePageClick(page + 1)}
                    disabled={page === totalPages}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};