import { fetchSiteData } from './fetchSiteData';
import Chefs from './components/chefs/chefs';
import ContactLink from './components/ContatcLink';
import Header from './components/header/header';
import Services from './components/services/services';
import Testimonials from './components/testimonials/Testimonials';

// Функция для генерации мета-данных
export async function generateMetadata() {
    const siteName = await fetchSiteData();
    return {
        title: `${siteName} - Аутентичная узбекская кухня в Узбекистане`,
        description: `Откройте для себя богатые вкусы Узбекистана в ресторане ${siteName}. Мы предлагаем аутентичные узбекские блюда, теплое гостеприимство и незабываемые кулинарные впечатления.`,
        keywords: `${siteName}, Узбекистан, узбекский ресторан, аутентичная кухня, обед, еда, семейный ресторан, традиционные блюда, кулинарный опыт, повара, ресторан в Узбекистане, лучшие рестораны Узбекистана, топ лучших ресторанов в Узбекистане, где лучший ресторан в Узбекистане?`,
        robots: 'index, follow',
        openGraph: {
            title: `${siteName} - Вкус Узбекистана`,
            description: `Посетите ${siteName} и насладитесь уникальными вкусами узбекской кухни. Присоединяйтесь к нам для приятного обеда в уютной атмосфере.`,
            url: 'https://yourwebsite.com', // Замените на ваш фактический URL
            type: 'website',
            locale: 'ru_RU',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${siteName} - Узбекская кухня в лучшем виде`,
            description: `Посетите ${siteName} и откройте для себя кулинарное путешествие по вкусам Узбекистана. Забронируйте столик прямо сейчас!`,
        },
    };
}

export default function Home() {
    return (
        <div>
            <Header />
            <Services />
            <Chefs />
            <ContactLink />
            <Testimonials />
        </div>
    );
};