import Section from './Section';
import Title from '../components/Title';
import { fetchSiteData } from '../fetchSiteData';

export async function generateMetadata() {
    const siteName = await fetchSiteData();
    
    return {
        title: `${siteName} - Меню`,
        description: `Откройте для себя меню ресторана ${siteName} с разнообразием узбекских блюд и международной кухни.`,
        keywords: `меню, ресторан, ${siteName}, узбекская кухня, блюда, меню ресторана, ${siteName} меню, мясо, напитки, салаты, шурба, шашлыки, специльное блюдо, вегетарианские блюда, салат, еда, кухня`,
        robots: 'index, follow',
        openGraph: {
            title: `Меню ${siteName}`,
            description: `Посмотрите меню ${siteName} и выберите свои любимые блюда из нашей кухни.`,
            url: 'https://yourwebsite.com/menu', // Замените на фактический URL вашей страницы меню
            type: 'website',
            locale: 'ru_RU'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Меню ${siteName}`,
            description: `Изучите меню ресторана ${siteName} и выберите что-то вкусное для себя.`,
        }
    };
}

export default async function Menu() {
    const res = await fetch('http://127.0.0.1:8000/api/v1/home/menu');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <Section data={data} />
        </div>
    );
};