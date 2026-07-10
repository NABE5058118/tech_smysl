import Header from '../components/Header';
import Hero from '../components/Hero';
import Directions from '../components/Directions';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import '../style/style.css';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <Directions />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
