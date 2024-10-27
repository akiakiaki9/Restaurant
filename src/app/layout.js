import './styles/styles.css';
import './styles/navbar.css';
import './styles/header.css';
import './styles/scrolltop.css';
import './styles/footer.css';
import './styles/title.css';
import './styles/booking.css';
import './styles/section.css';
import './styles/loadmain.css';
import './styles/chefs.css';
import './styles/testimonials.css';
import './styles/gallery.css';
import './styles/services.css';
import './styles/menudetail.css';
import './styles/contacts.css';
import './styles/yandexgo.css';
import './styles/news.css';
import './styles/contactlink.css';
import './styles/confirm.css';
import './styles/pagination.css';
import './styles/newsdetail.css';
import './styles/titlebooking.css';
import './styles/nonedata.css';

import LoadPage from './components/LoadPage';
import ScrollTop from './components/ScrollTop';
import Navbar from './components/Navbar';
import Footer from './components/footer/footer';
import Head from 'next/head';
import { fetchSiteData } from './fetchSiteData';

export default async function RootLayout({ children }) {
  const siteName = await fetchSiteData();

  const metadata = {
    title: `${siteName} - Аутентичная узбекская кухня`,
    description: `Откройте для себя богатые вкусы Узбекистана в ресторане ${siteName}. Мы предлагаем аутентичные узбекские блюда, теплое гостеприимство и незабываемые кулинарные впечатления.`,
    keywords: `${siteName}, Узбекистан, узбекский ресторан, аутентичная кухня, обед, еда, семейный ресторан, традиционные блюда, кулинарный опыт, повара, ресторан в Узбекистане, лучшие рестораны Узбекистана, топ лучших ресторанов в Узбекистане, где лучший ресторан в Узбекистане?`,
    robots: 'index, follow',
    openGraph: {
      title: `${siteName} - Вкус Узбекистана`,
      description: `Посетите ${siteName} и насладитесь уникальными вкусами узбекской кухни. Присоединяйтесь к нам для приятного обеда в уютной атмосфере.`,
      url: 'https://yourwebsite.com',
      type: 'website',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} - Узбекская кухня в лучшем виде`,
      description: `Посетите ${siteName} и откройте для себя кулинарное путешествие по вкусам Узбекистана. Забронируйте столик прямо сейчас!`,
    },
  };

  return (
    <html lang="ru">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.openGraph.url} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
      </Head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <LoadPage />
        <ScrollTop />
      </body>
    </html>
  );
};