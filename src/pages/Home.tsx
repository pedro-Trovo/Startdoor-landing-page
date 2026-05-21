import Footer from '@components/Footer';
import Header from '@components/Header';
import HeroSection from '@components/HeroSection';
import TeamSection from '@components/TeamSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
