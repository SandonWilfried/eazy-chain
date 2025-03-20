
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalNotices = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('legalNotices')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('companyInformation')}</h2>
            <p>
              {t('legalNoticesText1')}
            </p>
            
            <h2>2. {t('intellectualProperty')}</h2>
            <p>
              {t('legalNoticesText2')}
            </p>
            
            <h2>3. {t('userAccountsResponsibilities')}</h2>
            <p>
              {t('legalNoticesText3')}
            </p>
            
            <h2>4. {t('prohibitedActivities')}</h2>
            <p>
              {t('legalNoticesText4')}
            </p>
            
            <h2>5. {t('terminationOfService')}</h2>
            <p>
              {t('legalNoticesText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotices;
