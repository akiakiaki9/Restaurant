import NoneData from '@/app/components/NoneData';
import Link from 'next/link';
import React from 'react';
import { FaBackspace, FaTelegram, FaInstagram } from "react-icons/fa"; // Добавляем иконки для Telegram и Instagram

export default function NewsDetailPage({ data }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options); // Форматируем дату для русскоязычного формата
    };

    const renderSocialIcon = (link) => {
        if (!link) return null;

        if (link.includes('t.me')) { // Проверка на Telegram
            return <a href={link} target="_blank" rel="noopener noreferrer"><FaTelegram className="newsdetail__social-icon" /></a>;
        } else if (link.includes('instagram.com')) { // Проверка на Instagram
            return <a href={link} target="_blank" rel="noopener noreferrer"><FaInstagram className="newsdetail__social-icon" /></a>;
        }

        return null; // Если ссылка не на соцсети, ничего не выводим
    };

    return (
        <div className='tables'>
            <div>
                {(!data) ? ( // Проверка только на наличие данных
                    <NoneData />
                ) : (
                    <div className='newsdetail'>
                        <div className="newsdetail-blok">
                            <div className="newsdetail-blok__section newsdetail-blok__section-1">
                                <img src={data.image} alt={data.title} />
                            </div>
                            <div className="newsdetail-blok__section newsdetail-blok__section-2">
                                <h2>{data.title}</h2>
                                <p>{data.description} <b>{formatDate(data.created_at)}</b></p>
                                <div className="newsdetail-blok__container">
                                    <div className="newsdetail-blok__container-part">
                                        {renderSocialIcon(data.media_link1)}
                                        {renderSocialIcon(data.media_link2)}
                                    </div>
                                    <div className="newsdetail-blok__container-part">
                                        <Link href="/news"><button><FaBackspace className='newsdetail__back' /> назад</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};