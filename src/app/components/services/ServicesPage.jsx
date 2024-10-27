'use client';
import React from 'react';
import Image from 'next/image';
import { RiCheckDoubleFill } from 'react-icons/ri';
import NoneData from '../NoneData';

export default function ServicesPage({ data }) {
    return (
        <div className="services">
            {(!data || data.length === 0) ? (
                <NoneData />
            ) : (
                <div>
                    {data.map((item, index) => (
                        <div key={item.id} className={`services-blok ${index % 2 === 1 ? 'reverse' : ''}`}>
                            <div className="services-blok__section">
                                <Image src={item.image} alt={item.title} width={500} height={500} className="d-block mx-auto" />
                            </div>
                            <div className="services-blok__section">
                                <h2 className="services__title">{item.title}</h2>
                                <h5 className="services__subtitle">{item.subtitle1}</h5>
                                <div className="services-blok__section__container">
                                    <RiCheckDoubleFill className="services__icon" />
                                    <p>{item.description1}</p>
                                </div>
                                <div className="services-blok__section__container">
                                    <RiCheckDoubleFill className="services__icon" />
                                    <p>{item.description2}</p>
                                </div>
                                <div className="services-blok__section__container">
                                    <RiCheckDoubleFill className="services__icon" />
                                    <p>{item.description3}</p>
                                </div>
                                <h5 className="services__subtitle">{item.subtitle2}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
