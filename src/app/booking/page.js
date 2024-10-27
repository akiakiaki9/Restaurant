import BookingPage from './Booking';
import { fetchSiteData } from '../fetchSiteData';

export async function generateMetadata() {
    const siteName = await fetchSiteData();

    return {
        title: `${siteName} - Бронирование столиков`,
        description: `Забронируйте столик в ресторане ${siteName} и насладитесь уникальными вкусами узбекской кухни. Удобное онлайн-бронирование для вашего комфорта.`,
        keywords: `бронирование, ресторан, ${siteName}, узбекская кухня, столик, онлайн-бронирование, бронировать стол, заказать стол, стол, бронировать стол в Узбекистане, заказать стол в Узбекистане`,
        robots: 'index, follow',
        openGraph: {
            title: `${siteName} - Онлайн Бронирование`,
            description: `Забронируйте столик в ${siteName} прямо сейчас и откройте для себя лучшие блюда узбекской кухни.`,
            url: 'https://yourwebsite.com/booking', // Замените на фактический URL вашей страницы бронирования
            type: 'website',
            locale: 'ru_RU'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Бронирование в ${siteName}`,
            description: `Забронируйте столик в ${siteName} и насладитесь изысканными блюдами узбекской кухни.`,
        }
    };
}

export default async function Booking() {
    return (
        <div>
            <BookingPage />
        </div>
    );
};