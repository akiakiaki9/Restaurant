'use client'
import Link from 'next/link';
import React from 'react';
import NoneData from '../NoneData';

export default function HeaderPage({ data }) {
  const { layout, contacts } = data;

  if (!layout || !contacts) {
    return <NoneData />;
  }

  return (
    <div className="header" style={{ backgroundImage: `url(${layout.header_image})` }}>
      <div className="header-blok" key={contacts.id}>
        <h1 className="header__h1-1">Вкусная еда вовремя</h1>
        <h1 className="header__h1-2">{contacts.name}</h1>
        <h2 className="header__h1-3">Мы привлекаем ценителей истинного вкуса!</h2>
        <div className="header-blok__container">
          <Link href="/menu">
            <button className="header__button-1">К Блюдам</button>
          </Link>
          <Link href="/booking">
            <button className="header__button-2">Забронировать</button>
          </Link>
        </div>
      </div>
    </div>
  );
};