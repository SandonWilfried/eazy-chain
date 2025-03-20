
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const UsageConditions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('usageConditions')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('serviceDescription')}</h2>
            <p>
              {t('usageConditionsText1')}
            </p>
            
            <h2>2. {t('userObligations')}</h2>
            <p>
              {t('usageConditionsText2')}
            </p>
            
            <h2>3. {t('liabilityLimitations')}</h2>
            <p>
              {t('usageConditionsText3')}
            </p>
            
            <h2>4. {t('serviceChanges')}</h2>
            <p>
              {t('usageConditionsText4')}
            </p>
            
            <h2>5. {t('governingLaw')}</h2>
            <p>
              {t('usageConditionsText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UsageConditions;
