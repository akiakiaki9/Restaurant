'use client';
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaDownload } from 'react-icons/fa';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import NoneData from '../components/NoneData';

export default function GalleryPage({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openCarousel = (index) => {
        setCurrentSlide(index);
        setIsOpen(true);
    };

    const closeCarousel = () => {
        setIsOpen(false);
    };

    const downloadImage = async (id) => {
        try {
            const response = await fetch(`https://restaurant-booking-system-production.up.railway.app/api/v1/get-image/${id}`);
            if (!response.ok) {
                console.error('Ошибка при загрузке изображения:', response.status, response.statusText);
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `image_${id}.jpg`);
            link.style.display = 'none'; // Скрываем ссылку
            document.body.appendChild(link);

            link.click(); // Симулируем клик для скачивания
            link.remove(); // Удаляем ссылку после клика

            // Очищаем объект URL для предотвращения утечек памяти
            URL.revokeObjectURL(url);

            console.log('Изображение скачано успешно');
        } catch (error) {
            console.error('Ошибка при скачивании изображения', error);
        }
    };

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div>
            {(!data || data.length === 0) ? (
                <NoneData />
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="gallery"
                    columnClassName="gallery-column"
                >
                    {data.map((item, index) => (
                        <div key={item.id} className="gallery-item">
                            <Image
                                src={item.image}
                                alt={`Gallery Image ${item.id}`}
                                className="gallery-image"
                                width={500}
                                height={500}
                                onClick={() => openCarousel(index)}
                                placeholder="blur"
                                blurDataURL="/images/noimage.jpg"
                            />
                        </div>
                    ))}
                </Masonry>
            )}

            {isOpen && (
                <div className="carousel-overlay">
                    <button className="close-button" onClick={closeCarousel}>×</button>
                    <button
                        type="button"
                        className="download-button"
                        onClick={() => downloadImage(data[currentSlide].id)} // Используем id открытой фотографии
                    >
                        <FaDownload />
                    </button>
                    <Swiper
                        initialSlide={currentSlide}
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        modules={[Navigation]}
                    >
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Image
                                    src={item.image}
                                    alt={`Slide ${item.id}`}
                                    className="carousel-image"
                                    width={500}
                                    height={500}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Кнопки навигации */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                    <div className="slide-counter">
                        {currentSlide + 1} / {data.length}
                    </div>
                </div>
            )}
        </div>
    );
};