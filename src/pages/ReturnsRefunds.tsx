
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ReturnsRefunds = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('returnsRefunds')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('returnPolicy')}</h2>
            <p>
              {t('returnsRefundsText1')}
            </p>
            
            <h2>2. {t('refundProcess')}</h2>
            <p>
              {t('returnsRefundsText2')}
            </p>
            
            <h2>3. {t('eligibilityCriteria')}</h2>
            <p>
              {t('returnsRefundsText3')}
            </p>
            
            <h2>4. {t('timeframes')}</h2>
            <p>
              {t('returnsRefundsText4')}
            </p>
            
            <h2>5. {t('specialCases')}</h2>
            <p>
              {t('returnsRefundsText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsRefunds;
