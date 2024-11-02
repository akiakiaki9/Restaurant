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

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
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