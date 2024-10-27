import React from 'react';
import TestimonialPage from './TestimonialPage';

export default async function Testimonials() {
  // Получение данных с сервера
  const res = await fetch('http://127.0.0.1:8000/api/v1/home/testimonials');

  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  const data = await res.json();

  return (
    <div>
      <TestimonialPage data={data} />
    </div>
  );
}