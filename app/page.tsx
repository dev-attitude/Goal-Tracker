import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import TestimonialsSection from './components/TestimonialsSection';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
    </main>
  );
}
