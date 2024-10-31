'use client';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NoneData from '../NoneData';

export default function TestimonialPage({ data }) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="testimonials">
            <Carousel
                responsive={responsive}
                infinite={data.length > 3} // Зацикливание
                showDots={true}
                customDot={<CustomDot />} // Используем кастомные доты
                renderDotsOutside={false} // Оставляем доты внутри компонента
                autoPlay={true} // Включаем автопрокрутку
                autoPlaySpeed={3000} // Интервал автопрокрутки (3 секунды)
                keyBoardControl={true} // Управление с клавиатуры
            >
                {(!data || data.length === 0) ? (
                    <NoneData />
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="testimonials-blok__section">
                            <h3 className="testimonials__title">{item.full_name}</h3>
                            <p className="testimonials__description">- {item.description}</p>
                            <img src={item.image} alt={item.full_name} className="testimonial-image" />
                        </div>
                    ))
                )}
            </Carousel>
        </div>
    );
}

const CustomDot = ({ onClick, ...rest }) => {
    const { active } = rest;
    return (
        <button
            className={`custom-dot ${active ? 'active' : ''}`}
            onClick={() => onClick()}
        />
    );
};