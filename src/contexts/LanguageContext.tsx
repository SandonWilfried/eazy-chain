
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: 'Home',
    book: 'Book',
    passengers: 'Passengers',
    track: 'Track',
    dashboard: 'Dashboard',
    otherServices: 'Other Services',
    payNow: 'Pay Now',
    changeLanguage: 'Change Language',
    english: 'English',
    french: 'French',
    spanish: 'Spanish',
    
    // HomePage
    heroTitle: 'Seamless Shipping for Your Business',
    heroDesc: 'Book shipments, track your cargo, and manage payments all in one place. Fast, reliable, and transparent.',
    bookShipment: 'Book Shipment',
    trackYourCargo: 'Track Your Cargo',
    trackYourShipment: 'Track Your Shipment',
    ourServices: 'Our Services',
    servicesDesc: 'Everything you need to efficiently manage your cargo shipping needs',
    vesselBooking: 'Vessel Booking',
    vesselBookingDesc: 'Book space on our vessels with real-time availability and competitive rates.',
    cargoTracking: 'Cargo Tracking',
    cargoTrackingDesc: 'Real-time visibility into your cargo\'s location and status throughout its journey.',
    logisticsSupport: 'Logistics Support',
    logisticsSupportDesc: 'Comprehensive logistics solutions to ensure smooth operations at every stage.',
    easyPayments: 'Easy Payments',
    easyPaymentsDesc: 'Secure and convenient payment processing for your shipping transactions.',
    ourVessels: 'Our Vessels',
    vesselsDesc: 'Modern and efficient vessels to transport your cargo safely',
    ourDigitalPlatform: 'Our Digital Platform',
    platformDesc: 'Manage your shipments easily with our intuitive mobile application',
    ourTrustedPartners: 'Our Trusted Partners',
    partnersDesc: 'We collaborate with industry leaders to provide the best shipping solutions',
    readyToShip: 'Ready to Ship With Us?',
    joinThousands: 'Join thousands of businesses that trust us with their shipping needs. Get started today.',
    getStarted: 'Get Started',
    
    // Tracking
    enterTrackingNumber: 'Enter tracking number',
    searching: 'Searching...',
    trackShipment: 'Track Shipment',
    noTrackingInfo: 'No Tracking Information Found',
    verifyAndTryAgain: 'We couldn\'t find any shipment with the provided tracking number. Please verify and try again.',
    contactSupport: 'Contact Support',
    shipmentProgress: 'Shipment Progress',
    origin: 'Origin',
    destination: 'Destination',
    departureDate: 'Departure Date',
    estimatedArrival: 'Estimated Arrival',
    vessel: 'Vessel',
    lastUpdated: 'Last Updated',
    shipmentTimeline: 'Shipment Timeline',
    
    // Services
    internationalShippingServices: 'International Shipping Services',
    customsClearance: 'Customs Clearance Request',
    customsClearanceDesc: 'Streamlined customs clearance services to expedite your shipments through border controls and regulatory checkpoints.',
    airFreight: 'Air Freight',
    airFreightDesc: 'Fast and reliable air freight services for urgent shipments and time-sensitive cargo, including air consolidation options.',
    airConsolidation: 'Air Consolidation Service',
    oceanFreight: 'Ocean Freight',
    oceanFreightDesc: 'Cost-effective ocean freight services for container shipments and large cargo volumes, including consolidation options.',
    oceanConsolidation: 'Ocean Consolidation Service',
    courierServices: 'Courier Services',
    courierServicesDesc: 'Fast and reliable courier services for documents and small packages with door-to-door delivery to all countries served by Asky Airlines.',
    droneServices: 'Drone Delivery Services',
    droneServicesDesc: 'Fast, efficient drone delivery services for packages within Togo, Benin, Côte d\'Ivoire, and Senegal with same-day delivery options.',
    droneServiceRequest: 'Drone Delivery Service Request',
    maritimeSolutions: 'Maritime Solutions',
    
    // Booking
    booking: 'Booking',
    bookingDesc: 'Book cargo space on our vessels for your shipments',
    bookYourCargo: 'Book Your Cargo',
    shippingInformation: 'Shipping Information',
    vesselDesc: 'Our vessels operate round trip voyages between Lomé, Togo and Praia, Cape Verde with multiple port stops.',
    palletTypesAvailable: 'Pallet Types Available',
    usPallet: 'US Pallet',
    euroPallet: 'Euro Pallet',
    
    // Passengers
    passengerAccommodations: 'Passenger Accommodations',
    passengerDesc: 'Book your cabin on our sailing vessel for a unique and sustainable ocean voyage',
    sailingVoyageExperience: 'Sailing Voyage Experience',
    sailingDesc: 'Eazy Chain offers passenger accommodations on our cargo sailing vessel. Join us for a unique 10-day voyage between Lomé, Togo and Praia, Cape Verde, with stops at beautiful coastal cities along the way.',
    ecoFriendlyTravel: 'Eco-Friendly Travel',
    ecoDesc: 'Our vessel is powered by wind and solar energy, making your journey environmentally responsible.',
    limitedCapacity: 'Limited Capacity',
    capacityDesc: 'With only 6 cabins for 12 passengers, enjoy an exclusive and personalized sailing experience.',
    tenDayVoyage: '10-Day Voyage',
    voyageDesc: 'Experience a tranquil 10-day journey between Lomé, Togo and Praia, Cape Verde with coastal stops.',
    cantFind: 'Can\'t find what you\'re looking for? Create a custom booking request.',
    createCustomBooking: 'Create Custom Booking',
    availableCabins: 'Available Cabins',
    customBooking: 'Custom Booking',
    moreCabinViews: 'More Cabin Views',
    moreCabinDesc: 'Explore more images of our premium cabin accommodations',
    
    // Payment
    securePayment: 'Secure Payment',
    paymentDesc: 'Complete your payment details to finalize your shipping transaction',
    shipmentTotal: 'Shipment Total',
    shipmentId: 'Shipment ID',
    loadingPayment: 'Loading payment information...',
    
    // Supplier Payment
    paymentToSuppliers: 'Payment to Suppliers',
    suppliersDesc: 'Securely pay your international suppliers with our reliable payment service',
    backToServices: 'Back to Services',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
    
    // Status
    pending: 'Pending Departure',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    customs: 'Customs Clearance',
    delayed: 'Delayed',
    
    // Drone Services Form
    personalInformation: 'Personal Information',
    enterFullName: 'Enter your full name',
    enterEmail: 'Enter your email',
    enterPhone: 'Enter your phone number',
    selectCountry: 'Select your country',
    enterCity: 'Enter your city',
    packageInformation: 'Package Information',
    packageType: 'Package Type',
    selectPackageType: 'Select package type',
    packageWeight: 'Package Weight (kg)',
    enterWeight: 'Enter weight in kg',
    packageDimensions: 'Package Dimensions (cm)',
    lengthWidthHeight: 'Length x Width x Height',
    pickupAddress: 'Pickup Address',
    enterPickupAddress: 'Enter pickup address',
    deliveryAddress: 'Delivery Address',
    enterDeliveryAddress: 'Enter delivery address',
    urgentDelivery: 'Urgent Delivery',
    selectForPriority: 'Select for priority handling and faster delivery',
    additionalInformation: 'Additional Information',
    specialInstructions: 'Any special instructions or requirements',
    cancel: 'Cancel',
    processing: 'Processing...',
    submitRequest: 'Submit Request',
    
    // Package types
    documents: 'Documents',
    smallPackage: 'Small Package',
    mediumPackage: 'Medium Package',
    fragileItems: 'Fragile Items',
    medicalSupplies: 'Medical Supplies',
    
    // Common
    back: 'Back',
    loading: 'Loading...',
    available: 'Available',
    soldOut: 'Sold Out',
    perNight: 'per night',
    bookNow: 'Book Now',
    amenities: 'Amenities:',
    roomSelected: 'Room Selected',
    roomSelectedDesc: 'You\'ve selected {name}. Complete your booking details.',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    firstName: 'Full Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    country: 'Country',
    city: 'City',
    specialRequests: 'Special Requests',
    processingRequest: 'Processing...',
    submitBooking: 'Submit Booking',
    bookingSuccess: 'Request Submitted',
    bookingSuccessDesc: 'We\'ll contact you shortly to confirm your drone delivery service.',
    
    // PassengerBookingForm
    roomType: 'Room Type',
    selectRoomType: 'Select a room type',
    standardCabin: 'Standard Cabin',
    deluxeCabin: 'Deluxe Cabin',
    premiumCabin: 'Premium Cabin',
    numberOfPassengers: 'Number of Passengers',
    selectNumberOfPassengers: 'Select number of passengers',
    passenger: 'Passenger',
    passengers: 'Passengers',
    pickDate: 'Pick a date',
    specialRequestsPlaceholder: 'Any dietary requirements, accessibility needs, or other special requests...',
    enterLastName: 'Enter your last name',
    
    // RoomCard
    person: 'person',
    persons: 'persons',
    
    // ContactSection
    submitApplication: 'Submit Application',
    applyFormDesc: 'Fill out the form below to apply for a position at Eazy Chain. Upload your CV and cover letter.',
    position: 'Position',
    positionApplyingFor: 'Position you\'re applying for',
    tellUsAboutYourself: 'Tell us about yourself and why you\'re interested in this position',
    cvResume: 'CV/Resume',
    coverLetter: 'Cover Letter',
    message: 'Message',
    fullName: 'Full Name',
    address: 'Address',
    iWouldLikeTo: 'I would like to',
    shipMyCargo: 'Ship my cargo',
    bookCabin: 'Book a cabin',
    applyAtEazyChain: 'Apply at Eazy Chain',
    discussAnotherTopic: 'Discuss another topic',
    whatWouldYouLikeToDiscuss: 'What would you like to discuss?',
    
    // ShipmentCard
    trackingNumber: 'Tracking #',
    containers: 'Containers',
    unit: 'unit',
    units: 'units',
    totalAmount: 'Total Amount',
    paid: 'Paid',
    paymentPending: 'Payment Pending',
    paymentOverdue: 'Payment Overdue',
    cancelled: 'Cancelled'
  },
  fr: {
    // Navbar
    home: 'Accueil',
    book: 'Réserver',
    passengers: 'Passagers',
    track: 'Suivre',
    dashboard: 'Tableau de Bord',
    otherServices: 'Autres Services',
    payNow: 'Payer Maintenant',
    changeLanguage: 'Changer de Langue',
    english: 'Anglais',
    french: 'Français',
    spanish: 'Espagnol',
    
    // HomePage
    heroTitle: 'Expédition Fluide pour Votre Entreprise',
    heroDesc: 'Réservez des expéditions, suivez votre cargaison et gérez les paiements en un seul endroit. Rapide, fiable et transparent.',
    bookShipment: 'Réserver une Expédition',
    trackYourCargo: 'Suivre Votre Cargaison',
    trackYourShipment: 'Suivre Votre Expédition',
    ourServices: 'Nos Services',
    servicesDesc: 'Tout ce dont vous avez besoin pour gérer efficacement vos besoins d\'expédition de fret',
    vesselBooking: 'Réservation de Navire',
    vesselBookingDesc: 'Réservez de l\'espace sur nos navires avec disponibilité en temps réel et tarifs compétitifs.',
    cargoTracking: 'Suivi de Cargaison',
    cargoTrackingDesc: 'Visibilité en temps réel sur l\'emplacement et le statut de votre cargaison tout au long de son voyage.',
    logisticsSupport: 'Support Logistique',
    logisticsSupportDesc: 'Solutions logistiques complètes pour assurer des opérations fluides à chaque étape.',
    easyPayments: 'Paiements Faciles',
    easyPaymentsDesc: 'Traitement sécurisé et pratique des paiements pour vos transactions d\'expédition.',
    ourVessels: 'Nos Navires',
    vesselsDesc: 'Navires modernes et efficaces pour transporter votre cargaison en toute sécurité',
    ourDigitalPlatform: 'Notre Plateforme Numérique',
    platformDesc: 'Gérez vos expéditions facilement avec notre application mobile intuitive',
    ourTrustedPartners: 'Nos Partenaires de Confiance',
    partnersDesc: 'Nous collaborons avec des leaders de l\'industrie pour fournir les meilleures solutions d\'expédition',
    readyToShip: 'Prêt à Expédier Avec Nous?',
    joinThousands: 'Rejoignez des milliers d\'entreprises qui nous font confiance pour leurs besoins d\'expédition. Commencez dès aujourd\'hui.',
    getStarted: 'Commencer',
    
    // Tracking
    enterTrackingNumber: 'Entrez le numéro de suivi',
    searching: 'Recherche en cours...',
    trackShipment: 'Suivre l\'Expédition',
    noTrackingInfo: 'Aucune Information de Suivi Trouvée',
    verifyAndTryAgain: 'Nous n\'avons pas pu trouver d\'expédition avec le numéro de suivi fourni. Veuillez vérifier et réessayer.',
    contactSupport: 'Contacter le Support',
    shipmentProgress: 'Progression de l\'Expédition',
    origin: 'Origine',
    destination: 'Destination',
    departureDate: 'Date de Départ',
    estimatedArrival: 'Arrivée Estimée',
    vessel: 'Navire',
    lastUpdated: 'Dernière Mise à Jour',
    shipmentTimeline: 'Chronologie de l\'Expédition',
    
    // Services
    internationalShippingServices: 'Services d\'Expédition Internationale',
    customsClearance: 'Demande de Dédouanement',
    customsClearanceDesc: 'Services de dédouanement rationalisés pour accélérer vos expéditions à travers les contrôles frontaliers et les points de contrôle réglementaires.',
    airFreight: 'Fret Aérien',
    airFreightDesc: 'Services de fret aérien rapides et fiables pour les expéditions urgentes et les cargaisons sensibles au facteur temps, y compris les options de consolidation aérienne.',
    airConsolidation: 'Service de Consolidation Aérienne',
    oceanFreight: 'Fret Maritime',
    oceanFreightDesc: 'Services de fret maritime rentables pour les expéditions en conteneurs et les grands volumes de cargaison, y compris les options de consolidation.',
    oceanConsolidation: 'Service de Consolidation Maritime',
    courierServices: 'Services de Courrier',
    courierServicesDesc: 'Services de courrier rapides et fiables pour les documents et les petits colis avec livraison porte-à-porte dans tous les pays desservis par Asky Airlines.',
    droneServices: 'Services de Livraison par Drone',
    droneServicesDesc: 'Services de livraison par drone rapides et efficaces pour les colis au Togo, au Bénin, en Côte d\'Ivoire et au Sénégal avec options de livraison le jour même.',
    droneServiceRequest: 'Demande de Service de Livraison par Drone',
    maritimeSolutions: 'Solutions Maritimes',
    
    // Booking
    booking: 'Réservation',
    bookingDesc: 'Réservez de l\'espace de fret sur nos navires pour vos expéditions',
    bookYourCargo: 'Réservez Votre Cargaison',
    shippingInformation: 'Informations d\'Expédition',
    vesselDesc: 'Nos navires effectuent des voyages aller-retour entre Lomé, Togo et Praia, Cap-Vert avec plusieurs escales portuaires.',
    palletTypesAvailable: 'Types de Palettes Disponibles',
    usPallet: 'Palette US',
    euroPallet: 'Palette Euro',
    
    // Passengers
    passengerAccommodations: 'Hébergements Passagers',
    passengerDesc: 'Réservez votre cabine sur notre voilier pour un voyage océanique unique et durable',
    sailingVoyageExperience: 'Expérience de Voyage en Voilier',
    sailingDesc: 'Eazy Chain propose des hébergements pour passagers sur notre voilier de fret. Rejoignez-nous pour un voyage unique de 10 jours entre Lomé, Togo et Praia, Cap-Vert, avec des escales dans de belles villes côtières en chemin.',
    ecoFriendlyTravel: 'Voyage Écologique',
    ecoDesc: 'Notre navire est propulsé par l\'énergie éolienne et solaire, rendant votre voyage écologiquement responsable.',
    limitedCapacity: 'Capacité Limitée',
    capacityDesc: 'Avec seulement 6 cabines pour 12 passagers, profitez d\'une expérience de navigation exclusive et personnalisée.',
    tenDayVoyage: 'Voyage de 10 Jours',
    voyageDesc: 'Vivez un voyage tranquille de 10 jours entre Lomé, Togo et Praia, Cap-Vert avec des escales côtières.',
    cantFind: 'Vous ne trouvez pas ce que vous cherchez? Créez une demande de réservation personnalisée.',
    createCustomBooking: 'Créer une Réservation Personnalisée',
    availableCabins: 'Cabines Disponibles',
    customBooking: 'Réservation Personnalisée',
    moreCabinViews: 'Plus de Vues de Cabines',
    moreCabinDesc: 'Explorez plus d\'images de nos hébergements en cabines premium',
    
    // Payment
    securePayment: 'Paiement Sécurisé',
    paymentDesc: 'Complétez vos détails de paiement pour finaliser votre transaction d\'expédition',
    shipmentTotal: 'Total de l\'Expédition',
    shipmentId: 'ID d\'Expédition',
    loadingPayment: 'Chargement des informations de paiement...',
    
    // Supplier Payment
    paymentToSuppliers: 'Paiement aux Fournisseurs',
    suppliersDesc: 'Payez en toute sécurité vos fournisseurs internationaux avec notre service de paiement fiable',
    backToServices: 'Retour aux Services',
    
    // Footer
    allRightsReserved: 'Tous droits réservés.',
    
    // Status
    pending: 'En Attente de Départ',
    inTransit: 'En Transit',
    delivered: 'Livré',
    customs: 'Dédouanement',
    delayed: 'Retardé',
    
    // Drone Services Form
    personalInformation: 'Informations Personnelles',
    enterFullName: 'Entrez votre nom complet',
    enterEmail: 'Entrez votre email',
    enterPhone: 'Entrez votre numéro de téléphone',
    selectCountry: 'Sélectionnez votre pays',
    enterCity: 'Entrez votre ville',
    packageInformation: 'Informations sur le Colis',
    packageType: 'Type de Colis',
    selectPackageType: 'Sélectionnez le type de colis',
    packageWeight: 'Poids du Colis (kg)',
    enterWeight: 'Entrez le poids en kg',
    packageDimensions: 'Dimensions du Colis (cm)',
    lengthWidthHeight: 'Longueur x Largeur x Hauteur',
    pickupAddress: 'Adresse de Ramassage',
    enterPickupAddress: 'Entrez l\'adresse de ramassage',
    deliveryAddress: 'Adresse de Livraison',
    enterDeliveryAddress: 'Entrez l\'adresse de livraison',
    urgentDelivery: 'Livraison Urgente',
    selectForPriority: 'Sélectionnez pour un traitement prioritaire et une livraison plus rapide',
    additionalInformation: 'Informations Supplémentaires',
    specialInstructions: 'Instructions spéciales ou exigences particulières',
    cancel: 'Annuler',
    processing: 'Traitement en cours...',
    submitRequest: 'Soumettre la Demande',
    
    // Package types
    documents: 'Documents',
    smallPackage: 'Petit Colis',
    mediumPackage: 'Colis Moyen',
    fragileItems: 'Articles Fragiles',
    medicalSupplies: 'Fournitures Médicales',
    
    // Common
    back: 'Retour',
    loading: 'Chargement...',
    available: 'Disponible',
    soldOut: 'Épuisé',
    perNight: 'par nuit',
    bookNow: 'Réserver Maintenant',
    amenities: 'Commodités:',
    roomSelected: 'Chambre Sélectionnée',
    roomSelectedDesc: 'Vous avez sélectionné {name}. Complétez les détails de votre réservation.',
    next: 'Suivant',
    previous: 'Précédent',
    submit: 'Soumettre',
    firstName: 'Nom Complet',
    lastName: 'Nom de Famille',
    email: 'Email',
    phone: 'Numéro de Téléphone',
    country: 'Pays',
    city: 'Ville',
    specialRequests: 'Demandes Spéciales',
    processingRequest: 'Traitement en cours...',
    submitBooking: 'Soumettre la Réservation',
    bookingSuccess: 'Demande Soumise',
    bookingSuccessDesc: 'Nous vous contacterons sous peu pour confirmer votre service de livraison par drone.',
    
    // PassengerBookingForm
    roomType: 'Type de Chambre',
    selectRoomType: 'Sélectionner un type de chambre',
    standardCabin: 'Cabine Standard',
    deluxeCabin: 'Cabine Deluxe',
    premiumCabin: 'Cabine Premium',
    numberOfPassengers: 'Nombre de Passagers',
    selectNumberOfPassengers: 'Sélectionner le nombre de passagers',
    passenger: 'Passager',
    passengers: 'Passagers',
    pickDate: 'Choisir une date',
    specialRequestsPlaceholder: 'Exigences alimentaires, besoins d\'accessibilité ou autres demandes spéciales...',
    enterLastName: 'Entrez votre nom de famille',
    
    // RoomCard
    person: 'personne',
    persons: 'personnes',
    
    // ContactSection
    submitApplication: 'Soumettre la Candidature',
    applyFormDesc: 'Remplissez le formulaire ci-dessous pour postuler à un poste chez Eazy Chain. Téléchargez votre CV et votre lettre de motivation.',
    position: 'Poste',
    positionApplyingFor: 'Poste pour lequel vous postulez',
    tellUsAboutYourself: 'Parlez-nous de vous et de votre intérêt pour ce poste',
    cvResume: 'CV',
    coverLetter: 'Lettre de Motivation',
    message: 'Message',
    fullName: 'Nom Complet',
    address: 'Adresse',
    iWouldLikeTo: 'Je voudrais',
    shipMyCargo: 'Expédier ma cargaison',
    bookCabin: 'Réserver une cabine',
    applyAtEazyChain: 'Postuler chez Eazy Chain',
    discussAnotherTopic: 'Discuter d\'un autre sujet',
    whatWouldYouLikeToDiscuss: 'Que voulez-vous discuter?',
    
    // ShipmentCard
    trackingNumber: 'Numéro de suivi',
    containers: 'Conteneurs',
    unit: 'unité',
    units: 'unités',
    totalAmount: 'Montant Total',
    paid: 'Payé',
    paymentPending: 'Paiement en attente',
    paymentOverdue: 'Paiement en retard',
    cancelled: 'Annulé'
  },
  es: {
    // Navbar
    home: 'Inicio',
    book: 'Reservar',
    passengers: 'Pasajeros',
    track: 'Rastrear',
    dashboard: 'Panel',
    otherServices: 'Otros Servicios',
    payNow: 'Pagar Ahora',
    changeLanguage: 'Cambiar Idioma',
    english: 'Inglés',
    french: 'Francés',
    spanish: 'Español',
    
    // HomePage
    heroTitle: 'Envíos Sin Problemas para Su Negocio',
    heroDesc: 'Reserve envíos, rastree su carga y gestione pagos en un solo lugar. Rápido, confiable y transparente.',
    bookShipment: 'Reservar Envío',
    trackYourCargo: 'Rastrear Su Carga',
    trackYourShipment: 'Rastrear Su Envío',
    ourServices: 'Nuestros Servicios',
    servicesDesc: 'Todo lo que necesita para gestionar eficientemente sus necesidades de envío de carga',
    vesselBooking: 'Reserva de Buque',
    vesselBookingDesc: 'Reserve espacio en nuestros buques con disponibilidad en tiempo real y tarifas competitivas.',
    cargoTracking: 'Seguimiento de Carga',
    cargoTrackingDesc: 'Visibilidad en tiempo real de la ubicación y estado de su carga durante todo su viaje.',
    logisticsSupport: 'Soporte Logístico',
    logisticsSupportDesc: 'Soluciones logísticas completas para garantizar operaciones fluidas en cada etapa.',
    easyPayments: 'Pagos Fáciles',
    easyPaymentsDesc: 'Procesamiento de pagos seguro y conveniente para sus transacciones de envío.',
    ourVessels: 'Nuestros Buques',
    vesselsDesc: 'Buques modernos y eficientes para transportar su carga de manera segura',
    ourDigitalPlatform: 'Nuestra Plataforma Digital',
    platformDesc: 'Gestione sus envíos fácilmente con nuestra intuitiva aplicación móvil',
    ourTrustedPartners: 'Nuestros Socios de Confianza',
    partnersDesc: 'Colaboramos con líderes de la industria para proporcionar las mejores soluciones de envío',
    readyToShip: '¿Listo para Enviar Con Nosotros?',
    joinThousands: 'Únase a miles de empresas que confían en nosotros para sus necesidades de envío. Comience hoy.',
    getStarted: 'Comenzar',
    
    // Tracking
    enterTrackingNumber: 'Ingrese número de seguimiento',
    searching: 'Buscando...',
    trackShipment: 'Rastrear Envío',
    noTrackingInfo: 'No Se Encontró Información de Seguimiento',
    verifyAndTryAgain: 'No pudimos encontrar ningún envío con el número de seguimiento proporcionado. Por favor, verifique e intente nuevamente.',
    contactSupport: 'Contactar Soporte',
    shipmentProgress: 'Progreso del Envío',
    origin: 'Origen',
    destination: 'Destino',
    departureDate: 'Fecha de Salida',
    estimatedArrival: 'Llegada Estimada',
    vessel: 'Buque',
    lastUpdated: 'Última Actualización',
    shipmentTimeline: 'Cronología del Envío',
    
    // Services
    internationalShippingServices: 'Servicios de Envío Internacional',
    customsClearance: 'Solicitud de Despacho Aduanero',
    customsClearanceDesc: 'Servicios de despacho aduanero optimizados para agilizar sus envíos a través de controles fronterizos y puntos de control regulatorios.',
    airFreight: 'Carga Aérea',
    airFreightDesc: 'Servicios de carga aérea rápidos y confiables para envíos urgentes y carga sensible al tiempo, incluidas opciones de consolidación aérea.',
    airConsolidation: 'Servicio de Consolidación Aérea',
    oceanFreight: 'Carga Marítima',
    oceanFreightDesc: 'Servicios de carga marítima rentables para envíos en contenedores y grandes volúmenes de carga, incluidas opciones de consolidación.',
    oceanConsolidation: 'Servicio de Consolidación Marítima',
    courierServices: 'Servicios de Mensajería',
    courierServicesDesc: 'Servicios de mensajería rápidos y confiables para documentos y paquetes pequeños con entrega puerta a puerta a todos los países atendidos por Asky Airlines.',
    droneServices: 'Servicios de Entrega por Dron',
    droneServicesDesc: 'Servicios de entrega por dron rápidos y eficientes para paquetes dentro de Togo, Benín, Costa de Marfil y Senegal con opciones de entrega el mismo día.',
    droneServiceRequest: 'Solicitud de Servicio de Entrega por Dron',
    maritimeSolutions: 'Soluciones Marítimas',
    
    // Booking
    booking: 'Reserva',
    bookingDesc: 'Reserve espacio de carga en nuestros buques para sus envíos',
    bookYourCargo: 'Reserve Su Carga',
    shippingInformation: 'Información de Envío',
    vesselDesc: 'Nuestros buques operan viajes de ida y vuelta entre Lomé, Togo y Praia, Cabo Verde con múltiples paradas portuarias.',
    palletTypesAvailable: 'Tipos de Palés Disponibles',
    usPallet: 'Palé US',
    euroPallet: 'Palé Euro',
    
    // Passengers
    passengerAccommodations: 'Alojamiento de Pasajeros',
    passengerDesc: 'Reserve su camarote en nuestro velero para un viaje oceánico único y sostenible',
    sailingVoyageExperience: 'Experiencia de Viaje en Velero',
    sailingDesc: 'Eazy Chain ofrece alojamiento para pasajeros en nuestro velero de carga. Únase a nosotros para un viaje único de 10 días entre Lomé, Togo y Praia, Cabo Verde, con paradas en hermosas ciudades costeras en el camino.',
    ecoFriendlyTravel: 'Viaje Ecológico',
    ecoDesc: 'Nuestro buque es impulsado por energía eólica y solar, haciendo que su viaje sea ambientalmente responsable.',
    limitedCapacity: 'Capacidad Limitada',
    capacityDesc: 'Con solo 6 camarotes para 12 pasajeros, disfrute de una experiencia de navegación exclusiva y personalizada.',
    tenDayVoyage: 'Viaje de 10 Días',
    voyageDesc: 'Experimente un tranquilo viaje de 10 días entre Lomé, Togo y Praia, Cabo Verde con paradas costeras.',
    cantFind: '¿No encuentra lo que busca? Cree una solicitud de reserva personalizada.',
    createCustomBooking: 'Crear Reserva Personalizada',
    availableCabins: 'Camarotes Disponibles',
    customBooking: 'Reserva Personalizada',
    moreCabinViews: 'Más Vistas de Camarotes',
    moreCabinDesc: 'Explore más imágenes de nuestros alojamientos en camarotes premium',
    
    // Payment
    securePayment: 'Pago Seguro',
    paymentDesc: 'Complete sus detalles de pago para finalizar su transacción de envío',
    shipmentTotal: 'Total del Envío',
    shipmentId: 'ID de Envío',
    loadingPayment: 'Cargando información de pago...',
    
    // Supplier Payment
    paymentToSuppliers: 'Pago a Proveedores',
    suppliersDesc: 'Pague de forma segura a sus proveedores internacionales con nuestro servicio de pago confiable',
    backToServices: 'Volver a Servicios',
    
    // Footer
    allRightsReserved: 'Todos los derechos reservados.',
    
    // Status
    pending: 'Pendiente de Salida',
    inTransit: 'En Tránsito',
    delivered: 'Entregado',
    customs: 'Despacho de Aduanas',
    delayed: 'Retrasado',
    
    // Drone Services Form
    personalInformation: 'Información Personal',
    enterFullName: 'Ingrese su nombre completo',
    enterEmail: 'Ingrese su correo electrónico',
    enterPhone: 'Ingrese su número de teléfono',
    selectCountry: 'Seleccione su país',
    enterCity: 'Ingrese su ciudad',
    packageInformation: 'Información del Paquete',
    packageType: 'Tipo de Paquete',
    selectPackageType: 'Seleccione tipo de paquete',
    packageWeight: 'Peso del Paquete (kg)',
    enterWeight: 'Ingrese peso en kg',
    packageDimensions: 'Dimensiones del Paquete (cm)',
    lengthWidthHeight: 'Largo x Ancho x Alto',
    pickupAddress: 'Dirección de Recogida',
    enterPickupAddress: 'Ingrese dirección de recogida',
    deliveryAddress: 'Dirección de Entrega',
    enterDeliveryAddress: 'Ingrese dirección de entrega',
    urgentDelivery: 'Entrega Urgente',
    selectForPriority: 'Seleccione para manejo prioritario y entrega más rápida',
    additionalInformation: 'Información Adicional',
    specialInstructions: 'Cualquier instrucción especial o requisito',
    cancel: 'Cancelar',
    processing: 'Procesando...',
    submitRequest: 'Enviar Solicitud',
    
    // Package types
    documents: 'Documentos',
    smallPackage: 'Paquete Pequeño',
    mediumPackage: 'Paquete Mediano',
    fragileItems: 'Artículos Frágiles',
    medicalSupplies: 'Suministros Médicos',
    
    // Common
    back: 'Atrás',
    loading: 'Cargando...',
    available: 'Disponible',
    soldOut: 'Agotado',
    perNight: 'por noche',
    bookNow: 'Reservar Ahora',
    amenities: 'Comodidades:',
    roomSelected: 'Habitación Seleccionada',
    roomSelectedDesc: 'Ha seleccionado {name}. Complete los detalles de su reserva.',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar',
    firstName: 'Nombre Completo',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    phone: 'Número de Teléfono',
    country: 'País',
    city: 'Ciudad',
    specialRequests: 'Solicitudes Especiales',
    processingRequest: 'Procesando...',
    submitBooking: 'Enviar Reserva',
    bookingSuccess: 'Solicitud Enviada',
    bookingSuccessDesc: 'Nos pondremos en contacto con usted pronto para confirmar su servicio de entrega por dron.',
    
    // PassengerBookingForm
    roomType: 'Tipo de Habitación',
    selectRoomType: 'Seleccione un tipo de habitación',
    standardCabin: 'Camarote Estándar',
    deluxeCabin: 'Camarote Deluxe',
    premiumCabin: 'Camarote Premium',
    numberOfPassengers: 'Número de Pasajeros',
    selectNumberOfPassengers: 'Seleccione número de pasajeros',
    passenger: 'Pasajero',
    passengers: 'Pasajeros',
    pickDate: 'Elija una fecha',
    specialRequestsPlaceholder: 'Requisitos dietéticos, necesidades de accesibilidad u otras solicitudes especiales...',
    enterLastName: 'Ingrese su apellido',
    
    // RoomCard
    person: 'persona',
    persons: 'personas',
    
    // ContactSection
    submitApplication: 'Enviar Solicitud',
    applyFormDesc: 'Complete el formulario a continuación para solicitar un puesto en Eazy Chain. Suba su CV y carta de presentación.',
    position: 'Posición',
    positionApplyingFor: 'Posición a la que está aplicando',
    tellUsAboutYourself: 'Cuéntenos sobre usted y por qué está interesado en esta posición',
    cvResume: 'CV/Currículum',
    coverLetter: 'Carta de Presentación',
    message: 'Mensaje',
    fullName: 'Nombre Completo',
    address: 'Dirección',
    iWouldLikeTo: 'Me gustaría',
    shipMyCargo: 'Enviar mi carga',
    bookCabin: 'Reservar un camarote',
    applyAtEazyChain: 'Aplicar en Eazy Chain',
    discussAnotherTopic: 'Discutir otro tema',
    whatWouldYouLikeToDiscuss: '¿Qué le gustaría discutir?',
    
    // ShipmentCard
    trackingNumber: 'Número de seguimiento',
    containers: 'Contenedores',
    unit: 'unidad',
    units: 'unidades',
    totalAmount: 'Monto Total',
    paid: 'Pagado',
    paymentPending: 'Pago Pendiente',
    paymentOverdue: 'Pago Atrasado',
    cancelled: 'Cancelado'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
