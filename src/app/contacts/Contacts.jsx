'use client'
import React from 'react';
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import NoneData from '../components/NoneData';
import YandexGo from '../components/yandex/yandexgo';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function ContactsPage({ data }) {

  const pathname = usePathname();
  const router = useRouter();
  const componentName = pathname ? pathname.replace('/', '') || 'Home' : '';

  return (
    <div className='pagename1'>
      <div className="pagename1-blok">
        <h1>{componentName}</h1>
        <p>
          <Link href="/" className='pagename1-parent'>Home</Link>
          <span className='pagename1-drop'>/</span>
          <span className='pagename1-child'>{componentName}</span>
        </p>
      </div>
      {(!data || data.length === 0) ? (
        <NoneData />
      ) : (
        data.map((item) => (
          <div key={item.id} className="contacts">
            <div className="contacts-blok">
              <div className="contacts-blok__section contacts-blok__section-1">
                <div className="contacts-blok__section__container">
                  <div className="contacts-blok__section__container-part">
                    <LuPhone className='contacts__icon' />
                    <p><a href={`tel:+${item.phone1}`}>+{item.phone1}</a>, <a href={`tel:+${item.phone2}`}>+{item.phone2}</a></p>
                  </div>
                  <div className="contacts-blok__section__container-part">
                    <MdOutlineEmail className='contacts__icon' />
                    <p>{item.media_links.find(link => link.messanger === 'email')?.link}</p>
                  </div>
                  <div className="contacts-blok__section__container-part">
                    <IoLocationOutline className='contacts__icon' />
                    <p>{item.address}</p>
                  </div>
                  <div className="contacts-blok__section__container-part">
                    <YandexGo />
                  </div>
                </div>
                <div className="contacts-blok__section__container">
                  <div className="contacts-footer">
                    <h2>Следите за нами:</h2>
                    <div className="contacts-footer__section">
                      {item.media_links.map(link => {
                        switch (link.messanger) {
                          case 'facebook':
                            return (
                              <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF className='contacts-footer__icon' />
                              </a>
                            );
                          case 'telegram':
                            return (
                              <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                                <FaTelegramPlane className='contacts-footer__icon' />
                              </a>
                            );
                          case 'instagram':
                            return (
                              <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className='contacts-footer__icon' />
                              </a>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="contacts-blok__section">
                <div dangerouslySetInnerHTML={{ __html: item.coordinate }} className='contacts__map' />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};