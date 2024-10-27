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

    const downloadImage = (id) => {
        // Отправляем запрос на /get-image/{id}
        fetch(`http://127.0.0.1:8000/api/v1/get-image/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке изображения');
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `image_${id}.jpg`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Ошибка при скачивании изображения', error));
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
                            />
                        </div>
                    ))}
                </Masonry>
            )}

            {isOpen && (
                <div className="carousel-overlay">
                    <button className="close-button" onClick={closeCarousel}>×</button>
                    <button
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
}
