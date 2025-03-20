
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PurchaseConditions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">{t('purchaseConditions')}</h1>
          <div className="prose max-w-none">
            <h2>1. {t('generalProvisions')}</h2>
            <p>
              {t('purchaseConditionsText1')}
            </p>
            
            <h2>2. {t('orderProcess')}</h2>
            <p>
              {t('purchaseConditionsText2')}
            </p>
            
            <h2>3. {t('pricing')}</h2>
            <p>
              {t('purchaseConditionsText3')}
            </p>
            
            <h2>4. {t('paymentTerms')}</h2>
            <p>
              {t('purchaseConditionsText4')}
            </p>
            
            <h2>5. {t('cancellationPolicy')}</h2>
            <p>
              {t('purchaseConditionsText5')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PurchaseConditions;
