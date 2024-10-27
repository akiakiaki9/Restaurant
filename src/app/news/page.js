import { fetchSiteData } from '../fetchSiteData';
import News from './news';

// Функция для генерации мета-данных
export async function generateMetadata() {
    const siteName = await fetchSiteData();
    return {
        title: `${siteName} - Новости ресторана`,
        description: `Ознакомьтесь с последними новостями ресторана ${siteName}. Узнайте о новых блюдах, специальных предложениях и мероприятиях.`,
        keywords: `новости, ресторан, ${siteName}, события, блюда, специальные предложения, какие новости, новости ресторанов в Узбекистане, новости ${siteName}`,
        robots: 'index, follow',
        openGraph: {
            title: `Новости ${siteName}`,
            description: `Следите за новостями ${siteName} и оставайтесь в курсе последних событий и предложений.`,
            url: 'https://yourwebsite.com/news', // Замените на фактический URL вашей страницы новостей
            type: 'website',
            locale: 'ru_RU',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Новости ${siteName}`,
            description: `Читайте последние новости ресторана ${siteName} и следите за нашими специальными предложениями.`,
        },
    };
}

export default function NewsMain() {
    return (
        <div>
            <News />
        </div>
    );
}
