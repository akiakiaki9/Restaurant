'use client';
import React, { useState, useEffect, act } from 'react';
import { FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RiMenu3Fill } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="brand">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img className="navbar-brand" src="/images/brand.png" alt="Brand" />
        </Link>
      </div>
      <div className={`menu-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        <RiMenu3Fill />
      </div>
      <div className={`menu-links ${isOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <Link href="/" onClick={() => handleLinkClick('/')} style={{ color: activePage === '/' ? 'var(--main-color)' : '' }}>
          Главная
        </Link>
        <Link href="/menu" onClick={() => handleLinkClick('/menu')} style={{ color: activePage === '/menu' ? 'var(--main-color)' : '' }}>
          Меню
        </Link>
        <Link href="/gallery" onClick={() => handleLinkClick('/gallery')} style={{ color: activePage === '/gallery' ? 'var(--main-color)' : '' }}>
          Галерея
        </Link>
        <Link href="/contacts" onClick={() => handleLinkClick('/contacts')} style={{ color: activePage === '/contacts' ? 'var(--main-color)' : '' }}>
          Контакты
        </Link>
        <Link href="/news" onClick={() => handleLinkClick('/news')} style={{ color: activePage === '/news' ? 'var(--main-color)' : '' }}>
          Новости
        </Link>
        <Link href="/booking">
          <button className="book-button" onClick={() => handleLinkClick('/booking')}
            style={{ backgroundColor: activePage === '/booking' ? 'var(--main-color)' : '', color: activePage === '/booking' ? '#fff' : '' }}
          >
            Бронируй
          </button>
        </Link>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu} />}
    </nav>
  );
};