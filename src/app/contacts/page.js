import Title from '../components/Title';
import ContactsPage from './Contacts';
import { fetchSiteData } from '../fetchSiteData';

export async function generateMetadata() {
    const siteName = await fetchSiteData();
    
    return {
        title: `${siteName} - Контакты`,
        description: `Свяжитесь с рестораном ${siteName} для бронирования столиков, вопросов или предложений. Мы всегда рады помочь!`,
        keywords: `контакты, ресторан, ${siteName}, бронирование, связь, узбекская кухня, контакты ${siteName}, обратная связь, связаться с рестораном, контакты ресторана, ${siteName}, телефон номер, телефон, номер`,
        robots: 'index, follow',
        openGraph: {
            title: `Контакты ${siteName}`,
            description: `Узнайте, как связаться с ${siteName}. Мы готовы ответить на ваши вопросы и помочь с бронированием.`,
            url: 'https://yourwebsite.com/contacts', // Замените на фактический URL вашей страницы контактов
            type: 'website',
            locale: 'ru_RU'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Контакты ${siteName}`,
            description: `Свяжитесь с рестораном ${siteName} для получения информации и бронирования.`,
        }
    };
}

export default async function Contacts() {
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <ContactsPage data={data} />
        </div>
    );
};