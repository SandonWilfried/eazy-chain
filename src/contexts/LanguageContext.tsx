
import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextProps {
  language: string;
  t: (key: string) => string;
  switchLanguage: (lang: string) => void;
  setLanguage: (lang: string) => void; // Added this line
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  t: (key: string) => key,
  switchLanguage: () => console.warn('switchLanguage function not implemented'),
  setLanguage: () => console.warn('setLanguage function not implemented'), // Added this line
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = useCallback((lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  // English translations
  const englishTranslations = {
    hello: "Hello",
    selectLanguage: "Select Language",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    eazyChain: "Eazy Chain",
    allRightsReserved: "All Rights Reserved",
    ourServices: "Our Services",
    servicesDesc: "Explore our comprehensive suite of services designed to streamline your supply chain and optimize your logistics operations.",
    internationalShippingServices: "International Shipping Services",
    customsClearance: "Customs Clearance",
    customsClearanceDesc: "Navigating customs regulations can be complex. Let us simplify the process for you.",
    airFreight: "Air Freight",
    airFreightDesc: "Fast and reliable air freight solutions for time-sensitive shipments.",
    airGroupage: "Air Groupage",
    oceanFreight: "Ocean Freight",
    oceanFreightDesc: "Cost-effective ocean freight services for large and heavy shipments.",
    oceanGroupage: "Ocean Groupage",
    roadFreight: "Road Freight",
    roadFreightDesc: "Efficient door-to-door transportation solution for your cargo within continent.",
    paymentToSuppliers: "Payment to Suppliers",
    suppliersDesc: "Secure and timely payments to your suppliers worldwide.",
    courierServices: "Courier Services",
    courierServicesDesc: "Fast and secure courier services for documents and small packages.",
    droneServices: "Drone Services",
    droneServicesDesc: "Innovative drone delivery solutions for remote and hard-to-reach locations.",
    maritimeSolutions: "Maritime Solutions",
    globalTradeConsulting: "Global Trade Consulting",
    globalTradeConsultingDesc: "Expert guidance on international trade regulations and compliance.",
    supplyChainAnalytics: "Supply Chain Analytics",
    supplyChainAnalyticsDesc: "Data-driven insights to optimize your supply chain performance.",
    sustainableShipping: "Sustainable Shipping",
    sustainableShippingDesc: "Eco-friendly shipping options to reduce your carbon footprint.",
    weatherRoutingServices: "Weather Routing Services",
    weatherRoutingServicesDesc: "Minimize delays and maximize fuel efficiency with our weather routing services.",
    ballastWaterManagement: "Ballast Water Management",
    ballastWaterManagementDesc: "Ensure compliance with ballast water regulations and protect marine ecosystems.",
    energyEfficiencyConsulting: "Energy Efficiency Consulting",
    energyEfficiencyConsultingDesc: "Reduce energy consumption and lower operating costs with our energy efficiency solutions.",
    readyToGetStarted: "Ready to Get Started?",
    contactOurTeam: "Contact our team today to discuss your shipping needs and get a personalized quote.",
    bookConsultation: "Book a Consultation",
    
    // Payment related
    securePayment: "Secure Payment",
    enterBookingReference: "Enter Booking Reference",
    verifyBookingDesc: "Enter your booking reference to verify your shipment details.",
    bookingReference: "Booking Reference",
    enterReferenceNumber: "Enter your reference number",
    verify: "Verify",
    verified: "Verified",
    verifying: "Verifying...",
    loadingPayment: "Loading payment details...",
    shipmentDetails: "Shipment Details",
    shipmentId: "Shipment ID",
    origin: "Origin",
    destination: "Destination",
    containerCount: "Container Count",
    units: "Units",
    weight: "Weight",
    description: "Description",
    estimatedDelivery: "Estimated Delivery",
    paymentMethod: "Payment Method",
    choosePaymentMethod: "Choose your preferred payment method",
    creditDebitCard: "Credit/Debit Card",
    cardDetails: "Card Details",
    pay: "Pay",
    processing: "Processing...",
    mobileMoney: "Mobile Money",
    bankTransfer: "Bank Transfer",
    phoneNumber: "Phone Number",
    enterPhoneNumber: "Enter your phone number",
    accountName: "Account Name",
    enterAccountName: "Enter account name",
    bankName: "Bank Name",
    enterBankName: "Enter bank name",
    back: "Back",
    enterBookingReferenceDesc: "Please enter your booking reference number to proceed with payment.",
    
    // Road Freight form specific - removing duplicates here
    locations: "Locations",
    pickupAddress: "Pickup Address",
    deliveryAddress: "Delivery Address",
    enterFullAddress: "Enter full address",
    cargoDetails: "Cargo Details",
    cargoType: "Cargo Type",
    generalCargo: "General Cargo",
    refrigeratedCargo: "Refrigerated Cargo",
    hazardousCargo: "Hazardous Cargo",
    oversizeCargo: "Oversize Cargo",
    totalWeight: "Total Weight",
    volume: "Volume",
    schedule: "Schedule",
    pickupDate: "Pickup Date",
    requestedDeliveryDate: "Requested Delivery Date",
    specialInstructions: "Special Instructions",
    anySpecialRequirements: "Any special requirements or instructions",
    contactInformation: "Contact Information",
    fullName: "Full Name",
    enterFullName: "Enter your full name",
    email: "Email",
    enterEmail: "Enter your email",
    cancel: "Cancel",
    submitting: "Submitting...",
    submitBooking: "Submit Booking",
    bookingSuccess: "Booking Successful",
    roadFreightBookingDesc: "Your road freight booking has been submitted successfully. You can now proceed to payment.",
    
    // For other pages
    english: "English",
    french: "French", 
    spanish: "Spanish",
    changeLanguage: "Change Language",
    booking: "Booking",
    bookingDesc: "Book your cargo or passenger accommodations with us",
    bookYourCargo: "Book Your Cargo",
    shippingInformation: "Shipping Information",
    vesselDesc: "Our vessels are fully equipped with the necessary facilities to transport your cargo safely and efficiently across the ocean.",
    palletTypesAvailable: "Pallet Types Available",
    usPallet: "US Pallet",
    euroPallet: "Euro Pallet",
    heroTitle: "Seamless Shipping Across Africa",
    heroDesc: "Eazy Chain provides efficient and reliable shipping solutions connecting major ports across Africa. Track your cargo in real-time and enjoy hassle-free logistics.",
    bookShipment: "Book Shipment",
    trackYourCargo: "Track Your Cargo",
    trackYourShipment: "Track Your Shipment",
    vesselBooking: "Vessel Booking",
    vesselBookingDesc: "Book space on our vessels for your cargo with flexible scheduling options.",
    cargoTracking: "Cargo Tracking",
    cargoTrackingDesc: "Track your shipments in real-time with our advanced tracking system.",
    logisticsSupport: "Logistics Support",
    logisticsSupportDesc: "Get comprehensive logistics support for your shipping needs.",
    easyPayments: "Easy Payments",
    easyPaymentsDesc: "Secure and convenient payment options for all your shipping transactions.",
    ourVessels: "Our Vessels",
    vesselsDesc: "Our modern fleet of vessels is equipped with the latest technology to ensure the safe and efficient transport of your cargo.",
    ourDigitalPlatform: "Our Digital Platform",
    platformDesc: "Our user-friendly digital platform allows you to book, track, and manage your shipments with ease.",
    ourTrustedPartners: "Our Trusted Partners",
    partnersDesc: "We collaborate with leading logistics and transportation companies to provide you with the best shipping solutions.",
    readyToShip: "Ready to Ship Your Cargo?",
    joinThousands: "Join thousands of businesses that trust Eazy Chain for their shipping needs.",
    getStarted: "Get Started",
    passengerAccommodations: "Passenger Accommodations",
    passengerDesc: "Experience a unique maritime journey with comfortable accommodations on our cargo vessels.",
    sailingVoyageExperience: "Sailing Voyage Experience",
    sailingDesc: "Our passenger accommodations offer a unique opportunity to experience life at sea on a working cargo vessel, combining adventure with comfort.",
    ecoFriendlyTravel: "Eco-Friendly Travel",
    ecoDesc: "Sail with minimal environmental impact as our vessels are designed for optimal fuel efficiency.",
    limitedCapacity: "Limited Capacity",
    capacityDesc: "With only a small number of cabins available, enjoy a personalized and exclusive travel experience.",
    tenDayVoyage: "10-Day Voyage",
    voyageDesc: "Experience the rhythms of the ocean during our 10-day journey between ports.",
    cantFind: "Can't find what you're looking for?",
    createCustomBooking: "Create Custom Booking",
    availableCabins: "Available Cabins",
    customBooking: "Custom Booking",
    moreCabinViews: "More Cabin Views",
    moreCabinDesc: "Explore additional images of our passenger accommodations and onboard facilities.",
    diningHall: "Dining Hall",
    diningHallDesc: "Shared dining space where all meals are served daily.",
    commonLounge: "Common Lounge",
    commonLoungeDesc: "Relaxing space for passengers to socialize and unwind.",
    socialSpace: "Social Space",
    socialSpaceDesc: "Open area for activities and gatherings during the voyage.",
    premiumLounge: "Premium Lounge",
    premiumLoungeDesc: "Exclusive space for premium cabin passengers.",
    readingCorner: "Reading Corner",
    readingCornerDesc: "Quiet area with a selection of books and comfortable seating.",
    luxuriousBathroom: "Luxurious Bathroom",
    kingSizeBed: "King Size Bed",
    panoramicView: "Panoramic View",
    sittingArea: "Sitting Area",
    roomService: "Room Service",
    premiumAmenities: "Premium Amenities",
    freeWiFi: "Free WiFi",
    breakfastIncluded: "Breakfast Included",
    lunchIncluded: "Lunch Included",
    dinnerIncluded: "Dinner Included"
  };

  // French translations
  const frenchTranslations = {
    hello: "Bonjour",
    selectLanguage: "Sélectionner la Langue",
    home: "Accueil",
    about: "À propos",
    services: "Services",
    contact: "Contact",
    eazyChain: "Eazy Chain",
    allRightsReserved: "Tous droits réservés",
    ourServices: "Nos Services",
    servicesDesc: "Découvrez notre gamme complète de services conçus pour rationaliser votre chaîne d'approvisionnement et optimiser vos opérations logistiques.",
    internationalShippingServices: "Services d'Expédition Internationale",
    customsClearance: "Dédouanement",
    customsClearanceDesc: "Naviguer dans les réglementations douanières peut être complexe. Laissez-nous simplifier le processus pour vous.",
    airFreight: "Fret Aérien",
    airFreightDesc: "Solutions de fret aérien rapides et fiables pour les envois urgents.",
    airGroupage: "Groupage Aérien",
    oceanFreight: "Fret Maritime",
    oceanFreightDesc: "Services de fret maritime rentables pour les envois volumineux et lourds.",
    oceanGroupage: "Groupage Maritime",
    roadFreight: "Transport Routier",
    roadFreightDesc: "Solution de transport efficace de porte à porte pour votre cargaison à l'intérieur du continent.",
    paymentToSuppliers: "Paiement aux Fournisseurs",
    suppliersDesc: "Paiements sécurisés et ponctuels à vos fournisseurs dans le monde entier.",
    courierServices: "Services de Courrier",
    courierServicesDesc: "Services de courrier rapides et sécurisés pour les documents et les petits colis.",
    droneServices: "Services de Drone",
    droneServicesDesc: "Solutions innovantes de livraison par drone pour les endroits éloignés et difficiles d'accès.",
    maritimeSolutions: "Solutions Maritimes",
    globalTradeConsulting: "Consulting en Commerce International",
    globalTradeConsultingDesc: "Conseils d'experts sur les réglementations et la conformité du commerce international.",
    supplyChainAnalytics: "Analyse de la Chaîne d'Approvisionnement",
    supplyChainAnalyticsDesc: "Informations basées sur les données pour optimiser les performances de votre chaîne d'approvisionnement.",
    sustainableShipping: "Expédition Durable",
    sustainableShippingDesc: "Options d'expédition écologiques pour réduire votre empreinte carbone.",
    weatherRoutingServices: "Services de Routage Météorologique",
    weatherRoutingServicesDesc: "Minimisez les retards et maximisez l'efficacité énergétique grâce à nos services de routage météorologique.",
    ballastWaterManagement: "Gestion de l'Eau de Ballast",
    ballastWaterManagementDesc: "Assurez la conformité aux réglementations sur l'eau de ballast et protégez les écosystèmes marins.",
    energyEfficiencyConsulting: "Consulting en Efficacité Énergétique",
    energyEfficiencyConsultingDesc: "Réduisez la consommation d'énergie et diminuez les coûts d'exploitation grâce à nos solutions d'efficacité énergétique.",
    readyToGetStarted: "Prêt à Démarrer?",
    contactOurTeam: "Contactez notre équipe dès aujourd'hui pour discuter de vos besoins d'expédition et obtenir un devis personnalisé.",
    bookConsultation: "Réserver une Consultation",
    
    // Payment related
    securePayment: "Paiement Sécurisé",
    enterBookingReference: "Entrez la Référence de Réservation",
    verifyBookingDesc: "Entrez votre référence de réservation pour vérifier les détails de votre expédition.",
    bookingReference: "Référence de Réservation",
    enterReferenceNumber: "Entrez votre numéro de référence",
    verify: "Vérifier",
    verified: "Vérifié",
    verifying: "Vérification...",
    loadingPayment: "Chargement des détails de paiement...",
    shipmentDetails: "Détails de l'Expédition",
    shipmentId: "ID d'Expédition",
    origin: "Origine",
    destination: "Destination",
    containerCount: "Nombre de Conteneurs",
    units: "Unités",
    weight: "Poids",
    description: "Description",
    estimatedDelivery: "Livraison Estimée",
    paymentMethod: "Méthode de Paiement",
    choosePaymentMethod: "Choisissez votre méthode de paiement préférée",
    creditDebitCard: "Carte de Crédit/Débit",
    cardDetails: "Détails de la Carte",
    pay: "Payer",
    processing: "Traitement...",
    mobileMoney: "Mobile Money",
    bankTransfer: "Virement Bancaire",
    phoneNumber: "Numéro de Téléphone",
    enterPhoneNumber: "Entrez votre numéro de téléphone",
    accountName: "Nom du Compte",
    enterAccountName: "Entrez le nom du compte",
    bankName: "Nom de la Banque",
    enterBankName: "Entrez le nom de la banque",
    back: "Retour",
    enterBookingReferenceDesc: "Veuillez entrer votre numéro de référence de réservation pour procéder au paiement.",
    
    // Road Freight form specific - removing duplicates
    locations: "Emplacements",
    pickupAddress: "Adresse de Ramassage",
    deliveryAddress: "Adresse de Livraison",
    enterFullAddress: "Entrez l'adresse complète",
    cargoDetails: "Détails de la Cargaison",
    cargoType: "Type de Cargaison",
    generalCargo: "Cargaison Générale",
    refrigeratedCargo: "Cargaison Réfrigérée",
    hazardousCargo: "Cargaison Dangereuse",
    oversizeCargo: "Cargaison Surdimensionnée",
    totalWeight: "Poids Total",
    volume: "Volume",
    schedule: "Horaire",
    pickupDate: "Date de Ramassage",
    requestedDeliveryDate: "Date de Livraison Demandée",
    specialInstructions: "Instructions Spéciales",
    anySpecialRequirements: "Exigences ou instructions spéciales",
    contactInformation: "Informations de Contact",
    fullName: "Nom Complet",
    enterFullName: "Entrez votre nom complet",
    email: "Email",
    enterEmail: "Entrez votre email",
    cancel: "Annuler",
    submitting: "Soumission...",
    submitBooking: "Soumettre la Réservation",
    bookingSuccess: "Réservation Réussie",
    roadFreightBookingDesc: "Votre réservation de transport routier a été soumise avec succès. Vous pouvez maintenant procéder au paiement.",

    // For other pages
    english: "Anglais",
    french: "Français", 
    spanish: "Espagnol",
    changeLanguage: "Changer de Langue",
    booking: "Réservation",
    bookingDesc: "Réservez votre fret ou hébergement passager avec nous",
    bookYourCargo: "Réservez Votre Cargaison",
    shippingInformation: "Informations d'Expédition",
    vesselDesc: "Nos navires sont entièrement équipés des installations nécessaires pour transporter votre cargaison en toute sécurité et efficacité à travers l'océan.",
    palletTypesAvailable: "Types de Palettes Disponibles",
    usPallet: "Palette US",
    euroPallet: "Palette Euro",
    heroTitle: "Expédition Transparente à Travers l'Afrique",
    heroDesc: "Eazy Chain offre des solutions d'expédition efficaces et fiables reliant les principaux ports d'Afrique. Suivez votre cargaison en temps réel et profitez d'une logistique sans tracas.",
    bookShipment: "Réserver un Envoi",
    trackYourCargo: "Suivre Votre Cargaison",
    trackYourShipment: "Suivre Votre Envoi",
    vesselBooking: "Réservation de Navire",
    vesselBookingDesc: "Réservez de l'espace sur nos navires pour votre cargaison avec des options de programmation flexibles.",
    cargoTracking: "Suivi de Cargaison",
    cargoTrackingDesc: "Suivez vos envois en temps réel avec notre système de suivi avancé.",
    logisticsSupport: "Support Logistique",
    logisticsSupportDesc: "Obtenez un support logistique complet pour vos besoins d'expédition.",
    easyPayments: "Paiements Faciles",
    easyPaymentsDesc: "Options de paiement sécurisées et pratiques pour toutes vos transactions d'expédition.",
    ourVessels: "Nos Navires",
    vesselsDesc: "Notre flotte moderne de navires est équipée des dernières technologies pour assurer le transport sûr et efficace de votre cargaison.",
    ourDigitalPlatform: "Notre Plateforme Numérique",
    platformDesc: "Notre plateforme numérique conviviale vous permet de réserver, suivre et gérer vos envois en toute simplicité.",
    ourTrustedPartners: "Nos Partenaires de Confiance",
    partnersDesc: "Nous collaborons avec des entreprises leaders en logistique et transport pour vous offrir les meilleures solutions d'expédition.",
    readyToShip: "Prêt à Expédier Votre Cargaison?",
    joinThousands: "Rejoignez des milliers d'entreprises qui font confiance à Eazy Chain pour leurs besoins d'expédition.",
    getStarted: "Commencer",
    passengerAccommodations: "Hébergements pour Passagers",
    passengerDesc: "Vivez une expérience maritime unique avec des hébergements confortables sur nos navires de charge.",
    sailingVoyageExperience: "Expérience de Voyage en Mer",
    sailingDesc: "Nos hébergements pour passagers offrent une opportunité unique de vivre la vie en mer sur un navire de charge en activité, alliant aventure et confort.",
    ecoFriendlyTravel: "Voyage Écologique",
    ecoDesc: "Naviguez avec un impact environnemental minimal, nos navires étant conçus pour une efficacité énergétique optimale.",
    limitedCapacity: "Capacité Limitée",
    capacityDesc: "Avec seulement un petit nombre de cabines disponibles, profitez d'une expérience de voyage personnalisée et exclusive.",
    tenDayVoyage: "Voyage de 10 Jours",
    voyageDesc: "Vivez les rythmes de l'océan durant notre trajet de 10 jours entre les ports.",
    cantFind: "Vous ne trouvez pas ce que vous cherchez?",
    createCustomBooking: "Créer une Réservation Personnalisée",
    availableCabins: "Cabines Disponibles",
    customBooking: "Réservation Personnalisée",
    moreCabinViews: "Plus de Vues de Cabines",
    moreCabinDesc: "Explorez des images supplémentaires de nos hébergements pour passagers et des installations à bord.",
    diningHall: "Salle à Manger",
    diningHallDesc: "Espace de repas partagé où tous les repas sont servis quotidiennement.",
    commonLounge: "Salon Commun",
    commonLoungeDesc: "Espace de détente pour les passagers pour socialiser et se détendre.",
    socialSpace: "Espace Social",
    socialSpaceDesc: "Espace ouvert pour activités et rassemblements pendant le voyage.",
    premiumLounge: "Salon Premium",
    premiumLoungeDesc: "Espace exclusif pour les passagers de cabines premium.",
    readingCorner: "Coin Lecture",
    readingCornerDesc: "Espace calme avec une sélection de livres et des sièges confortables.",
    luxuriousBathroom: "Salle de Bain Luxueuse",
    kingSizeBed: "Lit King Size",
    panoramicView: "Vue Panoramique",
    sittingArea: "Espace Salon",
    roomService: "Service en Chambre",
    premiumAmenities: "Équipements Premium",
    freeWiFi: "WiFi Gratuit",
    breakfastIncluded: "Petit-déjeuner Inclus",
    lunchIncluded: "Déjeuner Inclus",
    dinnerIncluded: "Dîner Inclus"
  };

  // Spanish translations
  const spanishTranslations = {
    hello: "Hola",
    selectLanguage: "Seleccionar Idioma",
    home: "Inicio",
    about: "Acerca de",
    services: "Servicios",
    contact: "Contacto",
    eazyChain: "Eazy Chain",
    allRightsReserved: "Todos los derechos reservados",
    ourServices: "Nuestros Servicios",
    servicesDesc: "Explore nuestra completa gama de servicios diseñados para optimizar su cadena de suministro y optimizar sus operaciones logísticas.",
    internationalShippingServices: "Servicios de Envío Internacional",
    customsClearance: "Despacho de Aduanas",
    customsClearanceDesc: "Navegar por las regulaciones aduaneras puede ser complejo. Permítanos simplificar el proceso por usted.",
    airFreight: "Flete Aéreo",
    airFreightDesc: "Soluciones de flete aéreo rápidas y confiables para envíos urgentes.",
    airGroupage: "Grupaje Aéreo",
    oceanFreight: "Flete Marítimo",
    oceanFreightDesc: "Servicios de flete marítimo rentables para envíos grandes y pesados.",
    oceanGroupage: "Grupaje Marítimo",
    roadFreight: "Transporte Terrestre",
    roadFreightDesc: "Solución eficiente de transporte puerta a puerta para su carga dentro del continente.",
    paymentToSuppliers: "Pago a Proveedores",
    suppliersDesc: "Pagos seguros y puntuales a sus proveedores en todo el mundo.",
    courierServices: "Servicios de Mensajería",
    courierServicesDesc: "Servicios de mensajería rápidos y seguros para documentos y paquetes pequeños.",
    droneServices: "Servicios de Drones",
    droneServicesDesc: "Soluciones innovadoras de entrega con drones para ubicaciones remotas y de difícil acceso.",
    maritimeSolutions: "Soluciones Marítimas",
    globalTradeConsulting: "Consultoría de Comercio Global",
    globalTradeConsultingDesc: "Orientación experta sobre las regulaciones y el cumplimiento del comercio internacional.",
    supplyChainAnalytics: "Análisis de la Cadena de Suministro",
    supplyChainAnalyticsDesc: "Información basada en datos para optimizar el rendimiento de su cadena de suministro.",
    sustainableShipping: "Envío Sostenible",
    sustainableShippingDesc: "Opciones de envío ecológicas para reducir su huella de carbono.",
    weatherRoutingServices: "Servicios de Enrutamiento Meteorológico",
    weatherRoutingServicesDesc: "Minimice los retrasos y maximice la eficiencia del combustible con nuestros servicios de enrutamiento meteorológico.",
    ballastWaterManagement: "Gestión del Agua de Lastre",
    ballastWaterManagementDesc: "Asegure el cumplimiento de las regulaciones sobre el agua de lastre y proteja los ecosistemas marinos.",
    energyEfficiencyConsulting: "Consultoría de Eficiencia Energética",
    energyEfficiencyConsultingDesc: "Reduzca el consumo de energía y disminuya los costos operativos con nuestras soluciones de eficiencia energética.",
    readyToGetStarted: "¿Listo para Comenzar?",
    contactOurTeam: "Póngase en contacto con nuestro equipo hoy mismo para analizar sus necesidades de envío y obtener un presupuesto personalizado.",
    bookConsultation: "Reservar una Consulta",
    
    // Payment related
    securePayment: "Pago Seguro",
    enterBookingReference: "Ingrese Referencia de Reserva",
    verifyBookingDesc: "Ingrese su referencia de reserva para verificar los detalles de su envío.",
    bookingReference: "Referencia de Reserva",
    enterReferenceNumber: "Ingrese su número de referencia",
    verify: "Verificar",
    verified: "Verificado",
    verifying: "Verificando...",
    loadingPayment: "Cargando detalles de pago...",
    shipmentDetails: "Detalles del Envío",
    shipmentId: "ID del Envío",
    origin: "Origen",
    destination: "Destino",
    containerCount: "Cantidad de Contenedores",
    units: "Unidades",
    weight: "Peso",
    description: "Descripción",
    estimatedDelivery: "Entrega Estimada",
    paymentMethod: "Método de Pago",
    choosePaymentMethod: "Elija su método de pago preferido",
    creditDebitCard: "Tarjeta de Crédito/Débito",
    cardDetails: "Detalles de la Tarjeta",
    pay: "Pagar",
    processing: "Procesando...",
    mobileMoney: "Dinero Móvil",
    bankTransfer: "Transferencia Bancaria",
    phoneNumber: "Número de Teléfono",
    enterPhoneNumber: "Ingrese su número de teléfono",
    accountName: "Nombre de la Cuenta",
    enterAccountName: "Ingrese nombre de la cuenta",
    bankName: "Nombre del Banco",
    enterBankName: "Ingrese nombre del banco",
    back: "Volver",
    enterBookingReferenceDesc: "Por favor ingrese su número de referencia de reserva para proceder con el pago.",
    
    // Road Freight form specific - removing duplicates
    locations: "Ubicaciones",
    pickupAddress: "Dirección de Recogida",
    deliveryAddress: "Dirección de Entrega",
    enterFullAddress: "Ingrese dirección completa",
    cargoDetails: "Detalles de la Carga",
    cargoType: "Tipo de Carga",
    generalCargo: "Carga General",
    refrigeratedCargo: "Carga Refrigerada",
    hazardousCargo: "Carga Peligrosa",
    oversizeCargo: "Carga Sobredimensionada",
    totalWeight: "Peso Total",
    volume: "Volumen",
    schedule: "Horario",
    pickupDate: "Fecha de Recogida",
    requestedDeliveryDate: "Fecha de Entrega Solicitada",
    specialInstructions: "Instrucciones Especiales",
    anySpecialRequirements: "Requisitos o instrucciones especiales",
    contactInformation: "Información de Contacto",
    fullName: "Nombre Completo",
    enterFullName: "Ingrese su nombre completo",
    email: "Correo Electrónico",
    enterEmail: "Ingrese su correo electrónico",
    cancel: "Cancelar",
    submitting: "Enviando...",
    submitBooking: "Enviar Reserva",
    bookingSuccess: "Reserva Exitosa",
    roadFreightBookingDesc: "Su reserva de transporte terrestre ha sido enviada con éxito. Ahora puede proceder al pago.",

    // For other pages
    english: "Inglés",
    french: "Francés", 
    spanish: "Español",
    changeLanguage: "Cambiar Idioma",
    booking: "Reserva",
    bookingDesc: "Reserve su carga o alojamiento de pasajeros con nosotros",
    bookYourCargo: "Reserve Su Carga",
    shippingInformation: "Información de Envío",
    vesselDesc: "Nuestros barcos están completamente equipados con las instalaciones necesarias para transportar su carga de manera segura y eficiente a través del océano.",
    palletTypesAvailable: "Tipos de Palés Disponibles",
    usPallet: "Palé US",
    euroPallet: "Palé Euro",
    heroTitle: "Envío Sin Problemas en África",
    heroDesc: "Eazy Chain proporciona soluciones de envío eficientes y confiables que conectan los principales puertos de África. Rastree su carga en tiempo real y disfrute de una logística sin complicaciones.",
    bookShipment: "Reservar Envío",
    trackYourCargo: "Rastrear Su Carga",
    trackYourShipment: "Rastrear Su Envío",
    vesselBooking: "Reserva de Barco",
    vesselBookingDesc: "Reserve espacio en nuestros barcos para su carga con opciones de programación flexibles.",
    cargoTracking: "Seguimiento de Carga",
    cargoTrackingDesc: "Rastree sus envíos en tiempo real con nuestro sistema de seguimiento avanzado.",
    logisticsSupport: "Soporte Logístico",
    logisticsSupportDesc: "Obtenga soporte logístico integral para sus necesidades de envío.",
    easyPayments: "Pagos Fáciles",
    easyPaymentsDesc: "Opciones de pago seguras y convenientes para todas sus transacciones de envío.",
    ourVessels: "Nuestros Barcos",
    vesselsDesc: "Nuestra moderna flota de barcos está equipada con la última tecnología para garantizar el transporte seguro y eficiente de su carga.",
    ourDigitalPlatform: "Nuestra Plataforma Digital",
    platformDesc: "Nuestra plataforma digital fácil de usar le permite reservar, rastrear y gestionar sus envíos con facilidad.",
    ourTrustedPartners: "Nuestros Socios de Confianza",
    partnersDesc: "Colaboramos con empresas líderes en logística y transporte para proporcionarle las mejores soluciones de envío.",
    readyToShip: "¿Listo para Enviar Su Carga?",
    joinThousands: "Únase a miles de empresas que confían en Eazy Chain para sus necesidades de envío.",
    getStarted: "Comenzar",
    passengerAccommodations: "Alojamientos para Pasajeros",
    passengerDesc: "Experimente un viaje marítimo único con alojamientos cómodos en nuestros barcos de carga.",
    sailingVoyageExperience: "Experiencia de Viaje en Barco",
    sailingDesc: "Nuestros alojamientos para pasajeros ofrecen una oportunidad única de experimentar la vida en el mar en un barco de carga en funcionamiento, combinando aventura con comodidad.",
    ecoFriendlyTravel: "Viaje Ecológico",
    ecoDesc: "Navegue con un impacto ambiental mínimo, ya que nuestros barcos están diseñados para una eficiencia óptima de combustible.",
    limitedCapacity: "Capacidad Limitada",
    capacityDesc: "Con solo un pequeño número de cabinas disponibles, disfrute de una experiencia de viaje personalizada y exclusiva.",
    tenDayVoyage: "Viaje de 10 Días",
    voyageDesc: "Experimente los ritmos del océano durante nuestro viaje de 10 días entre puertos.",
    cantFind: "¿No encuentra lo que busca?",
    createCustomBooking: "Crear Reserva Personalizada",
    availableCabins: "Cabinas Disponibles",
    customBooking: "Reserva Personalizada",
    moreCabinViews: "Más Vistas de Cabinas",
    moreCabinDesc: "Explore imágenes adicionales de nuestros alojamientos para pasajeros e instalaciones a bordo.",
    diningHall: "Comedor",
    diningHallDesc: "Espacio compartido de comedor donde se sirven todas las comidas diariamente.",
    commonLounge: "Salón Común",
    commonLoungeDesc: "Espacio relajante para que los pasajeros socialicen y se relajen.",
    socialSpace: "Espacio Social",
    socialSpaceDesc: "Área abierta para actividades y reuniones durante el viaje.",
    premiumLounge: "Salón Premium",
    premiumLoungeDesc: "Espacio exclusivo para pasajeros de cabinas premium.",
    readingCorner: "Rincón de Lectura",
    readingCornerDesc: "Área tranquila con una selección de libros y asientos cómodos.",
    luxuriousBathroom: "Baño Lujoso",
    kingSizeBed: "Cama King Size",
    panoramicView: "Vista Panorámica",
    sittingArea: "Área de Estar",
    roomService: "Servicio de Habitación",
    premiumAmenities: "Comodidades Premium",
    freeWiFi: "WiFi Gratuito",
    breakfastIncluded: "Desayuno Incluido",
    lunchIncluded: "Almuerzo Incluido",
    dinnerIncluded: "Cena Incluida"
  };

  const translations = {
    en: englishTranslations,
    fr: frenchTranslations,
    es: spanishTranslations,
  };

  const t = useCallback((key: string) => {
    return translations[language as keyof typeof translations][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, switchLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
