
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Disclaimers = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('disclaimers')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('generalDisclaimer')}</h2>
            <p>
              {t('disclaimersText1')}
            </p>
            
            <h2>2. {t('liabilityDisclaimer')}</h2>
            <p>
              {t('disclaimersText2')}
            </p>
            
            <h2>3. {t('accuracyInformation')}</h2>
            <p>
              {t('disclaimersText3')}
            </p>
            
            <h2>4. {t('thirdPartyLinks')}</h2>
            <p>
              {t('disclaimersText4')}
            </p>
            
            <h2>5. {t('forcesMajeure')}</h2>
            <p>
              {t('disclaimersText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimers;
