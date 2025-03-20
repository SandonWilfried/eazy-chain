
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('privacyPolicy')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('informationCollection')}</h2>
            <p>
              {t('privacyPolicyText1')}
            </p>
            
            <h2>2. {t('informationUsage')}</h2>
            <p>
              {t('privacyPolicyText2')}
            </p>
            
            <h2>3. {t('informationSharing')}</h2>
            <p>
              {t('privacyPolicyText3')}
            </p>
            
            <h2>4. {t('cookies')}</h2>
            <p>
              {t('privacyPolicyText4')}
            </p>
            
            <h2>5. {t('userRights')}</h2>
            <p>
              {t('privacyPolicyText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
