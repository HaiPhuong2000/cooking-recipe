import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
