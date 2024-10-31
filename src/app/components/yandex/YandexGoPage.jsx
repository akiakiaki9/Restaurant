'use client';
import React, { useState, useEffect } from 'react';

export default function YandexGoPage({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|webOS|iPhone|iPad|iPod|blackberry|iemobile|opera mini/i.test(userAgent));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => console.error('Ошибка получения геолокации:', error)
      );
    }
  }, []);

  const handleClickMobile = (item) => {
    const { latitude, longitude } = item;
    if (!latitude || !longitude) {
      console.error("Latitude or longitude is missing");
      return;
    }
    const yandexNavigatorUrl = `yandexnavi://build_route_on_map?lat_to=${latitude}&lon_to=${longitude}`;
    window.location.href = yandexNavigatorUrl;
  };

  const handleClickDesktop = (item) => {
    const { latitude, longitude } = item;
    if (!latitude || !longitude) {
      console.error("Latitude or longitude is missing");
      return;
    }
    const yandexMapsUrl = `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=16&l=map`;
    window.open(yandexMapsUrl, '_blank');
  };

  if (!data || data.length === 0) {
    return <p>Такси не доступно</p>;
  }

  return (
    <div className="yandexgo">
      {data.map((item) => (
        <div key={item.id} className="yandexgo-blok">
          {isMobile ? (
            <div onClick={() => handleClickMobile(item)} className="yandexgo-blok__section">
              <img src="/images/yandexgo.png" alt="Яндекс Навигатор" />
              <p>Вызвать Такси</p>
            </div>
          ) : (
            <div onClick={() => handleClickDesktop(item)} className="yandexgo-blok__section">
              <img src="/images/yandexgo.png" alt="Яндекс Карты" />
              <p>Открыть на Яндекс Картах</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};