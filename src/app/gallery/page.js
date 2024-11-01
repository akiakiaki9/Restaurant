import GalleryPage from './GalleryPage';
import Title from '../components/Title';
import { fetchSiteData } from '../fetchSiteData';

export async function generateMetadata() {
    const siteName = await fetchSiteData();
    
    return {
        title: `${siteName} - Галерея`,
        description: `Посмотрите галерею ресторана ${siteName}, где представлены лучшие блюда и атмосфера нашего заведения.`,
        keywords: `галерея, ресторан, ${siteName}, фотографии, узбекская кухня, галерея ресторана, галерея ресторана ${siteName}, фотки, фотографии ресторана`,
        robots: 'index, follow',
        openGraph: {
            title: `Галерея ${siteName}`,
            description: `Изучите галерею ${siteName} и узнайте о нашей атмосфере и изысканных блюдах.`,
            url: 'https://yourwebsite.com/gallery', // Замените на фактический URL вашей страницы галереи
            type: 'website',
            locale: 'ru_RU'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Галерея ${siteName}`,
            description: `Просмотрите галерею ресторана ${siteName} и насладитесь нашими лучшими блюдами и атмосферой.`,
        }
    };
}

export default async function Gallery() {
    const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/gallery', {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <GalleryPage data={data} />
        </div>
    );
};