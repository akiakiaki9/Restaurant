import Link from 'next/link'
import React from 'react'

export default function ContactLink() {
  return (
    <div className='contactlink'>
        <div className="contactlink-blok">
            <h1>Свяжитесь с нами для сотрудничества</h1>
            <Link href="/contacts"><button>Контакты</button></Link>
        </div>
    </div>
  )
}
