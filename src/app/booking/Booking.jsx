'use client';
import React, { useState, useEffect } from 'react';
import IMask from 'imask';
import { getCookie } from '../utils/cookies';
import ConfirmedEmail from '../components/ConfirmedEmail';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    guests: '',
    time: '',
    day: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const componentName = pathname ? pathname.replace('/', '') || 'Home' : '';

  const validatePhone = (phone) => /^\+998\d{9}$/.test(phone);
  const validateGuests = (guests) => Number(guests) > 1 && Number(guests) <= 20;
  const validateTime = (time) => {
    const [hours] = time.split(':').map(Number);
    return hours >= 11 && hours <= 21;
  };

  useEffect(() => {
    const phoneInput = document.querySelector('[name="phone"]');
    if (phoneInput) {
      IMask(phoneInput, {
        mask: '+998000000000',
      });
    }
  }, []);

  // Проверка подтверждения email при загрузке страницы
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      confirmEmail(token);
    }
  }, []);

  const confirmEmail = async (token) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/confirm/${token}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Ошибка при подтверждении email');
      }

      setIsEmailConfirmed(true); // Успешное подтверждение
      router.replace('/booking'); // Убираем токен из URL без перезагрузки
    } catch (error) {
      alert('Произошла ошибка при подтверждении почты.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guests' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = {};

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона.';
    }
    if (!validateGuests(formData.guests)) {
      newErrors.guests = 'Количество гостей должно быть от 2 до 20.';
    }
    if (!validateTime(formData.time)) {
      newErrors.time = 'Выберите время между 11:00 и 21:00.';
    }

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    const maxDateString = threeMonthsFromNow.toISOString().split('T')[0];

    if (formData.day < todayString || formData.day > maxDateString) {
      newErrors.date = `Дата должна быть между ${todayString} и ${maxDateString}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const csrfToken = getCookie('csrftoken');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/booking-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ ...formData, guests: Number(formData.guests) }),
      });

      if (!res.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await res.json();
      alert('Бронирование успешно отправлено!');

      setFormData({
        full_name: '',
        phone: '',
        email: '',
        guests: '',
        time: '',
        day: '',
      });

      setIsSuccess(true);
    } catch (error) {
      alert('Произошла ошибка при бронировании.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minTime = '11:00';
  const maxTime = '21:00';

  return (
    <>
      <div className='pagename1'>
        <div className="pagename1-blok">
          <h1>{componentName}</h1>
          <p>
            <Link href="/" className='pagename1-parent'>Home</Link>
            <span className='pagename1-drop'>/</span>
            <span className='pagename1-child'>{componentName}</span>
          </p>
        </div>
        <div className='booking'>
          {isEmailConfirmed ? (
            <ConfirmedEmail />
          ) : isSuccess ? (
            <ConfirmedEmail />
          ) : (
            <div className="booking-blok">
              <form onSubmit={handleSubmit} className='booking-form'>
                <div className='booking-form__section'>
                  <div className="booking-form__section-part">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Ваше полное имя"
                      maxLength={35}
                      minLength={3}
                      required
                    />
                    {errors.full_name && <p className="error-text">{errors.full_name}</p>}
                  </div>

                  <div className="booking-form__section-part">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Телефон"
                      required
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                </div>

                <div className='booking-form__section'>
                  <div className="booking-form__section-part">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="booking-form__section-part">
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Кол-во гостей"
                      required
                      min={2}
                      max={20}
                    />
                    {errors.guests && <p className="error-text">{errors.guests}</p>}
                  </div>
                </div>

                <div className='booking-form__section'>
                  <div className="booking-form__section-part">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      min={minTime}
                      max={maxTime}
                    />
                    {errors.time && <p className="error-text">{errors.time}</p>}
                  </div>

                  <div className="booking-form__section-part">
                    <input
                      type="date"
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]}
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Забронировать'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};