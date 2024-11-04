'use client'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import NoneData from '../NoneData';

export default function FooterPage({ data }) {
  return (
    <div className="footer">
      {(!data || data.length === 0) ? (
        <NoneData />
      ) : (
        data.map((item => (
          <div className="footer-blok" key={item}>
            <div className="footer-blok__section">
              <p className="footer-blok__section-1__p1">О Нас</p>
              <br />
              <p className="footer-blok__section-1__p2">{item.about_us}</p>
            </div>
            <div className="footer-blok__section footer-blok__section-2">
              <div className="footer-blok__section-container">
                <b className="footer-blok__section__b">Полезные</b>
                <br /><br />
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href="/" className="footer-blok__section-container__link">Главная</Link>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href="/news" className="footer-blok__section-container__link">Новости</Link>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href="/booking" className="footer-blok__section-container__link">Забронировать</Link>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href="/menu" className="footer-blok__section-container__link">Меню</Link>
                </div>
              </div>
              <div className="footer-blok__section-container">
                <b className="footer-blok__section__b">Подпишитесь</b>
                <br /><br />
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <a href="" className="footer-blok__section-container__link">Email</a>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href={item.media_links.find(link => link.messanger === 'facebook').link} className="footer-blok__section-container__link">Facebook</Link>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href={item.media_links.find(link => link.messanger === 'instagram').link} className="footer-blok__section-container__link">Instagram</Link>
                </div>
                <div>
                  <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
                  <Link href={item.media_links.find(link => link.messanger === 'telegram').link} className="footer-blok__section-container__link">Telegram</Link>
                </div>
              </div>
            </div>
            <div className="footer-blok__section footer-blok__section-3">
              <b className="footer-blok__section__b">Связаться с нами</b>
              <br /><br />
              <p className="footer-blok__section-3__p">Адрес нашей улицы, {item.address}</p>
              <p className="footer-blok__section-3__p">
                <b>Телефон:</b> <a href={`tel:+${item.phone1}`}>+{item.phone1}</a>, <a href={`tel:+${item.phone2}`}>+{item.phone2}</a>
              </p>
              <p className="footer-blok__section-3__p"><b>Email:</b> {item.media_links.find(link => link.messanger === 'email').link}</p>
            </div>
          </div>
        )))
      )}
      <div className="footer-footer">
        {(!data || data.length == 0) ? (
          <p>Нет инфы</p>
        ) : (
          data.map((item => (
            <p key={item.id}>© Copyright <b>{item.name}</b>. Все права защищены!</p>
          )))
        )}
      </div>
    </div>
  )
};