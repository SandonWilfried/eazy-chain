
import { useState } from "react";
import Navbar from "@/components/Navbar";
import RoomCard, { RoomProps } from "@/components/RoomCard";
import PassengerBookingForm from "@/components/PassengerBookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Ship, Users, ShipWheel, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

// Room data with images - updated to only include premium cabins
const getRoomData = (t: (key: string) => string) => [
  {
    id: "premium-1",
    name: "Timbuktu",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-2",
    name: "Lalibela",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  },
  {
    id: "premium-3",
    name: "Ouidah",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-4",
    name: "Abidjan",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  },
  {
    id: "premium-5",
    name: "Zanzibar",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-6",
    name: "Nosy Be",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: [
      t('luxuriousBathroom'), 
      t('kingSizeBed'), 
      t('panoramicView'), 
      t('sittingArea'), 
      t('roomService'), 
      t('premiumAmenities'), 
      t('freeWiFi'), 
      t('breakfastIncluded'), 
      t('lunchIncluded'), 
      t('dinnerIncluded')
    ],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  }
];

// Get additional room images with translations
const getAdditionalRoomImages = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('diningHall'),
    description: t('diningHallDesc'),
    imageUrl: "/lovable-uploads/446a165f-ea4b-4987-8046-9239e77b97d3.png"
  },
  {
    id: 2,
    title: t('commonLounge'),
    description: t('commonLoungeDesc'),
    imageUrl: "/lovable-uploads/442bc872-147f-4c60-8391-775238e3487c.png"
  },
  {
    id: 3,
    title: t('socialSpace'),
    description: t('socialSpaceDesc'),
    imageUrl: "/lovable-uploads/da599504-e72a-4f32-a42d-b7428e612fbc.png"
  },
  {
    id: 4,
    title: t('premiumLounge'),
    description: t('premiumLoungeDesc'),
    imageUrl: "/lovable-uploads/f078f7e9-23fe-429b-9be4-96e4a7a5cf23.png"
  },
  {
    id: 5,
    title: t('readingCorner'),
    description: t('readingCornerDesc'),
    imageUrl: "/lovable-uploads/94de7d15-c25c-4cae-8c72-1b856127f12c.png"
  }
];

const Passengers = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { t, language } = useLanguage();
  
  // Get translated data
  const availableRooms = getRoomData(t);
  const additionalRoomImages = getAdditionalRoomImages(t);

  const handleCustomBookingClick = () => {
    setShowCustomForm(true);
    setActiveTab("custom");
  };

  // Vessel features with translations
  const vesselFeatures = [
    {
      icon: <ShipWheel className="h-12 w-12 text-primary" />,
      title: t('ecoFriendlyTravel'),
      description: t('ecoDesc')
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: t('limitedCapacity'),
      description: t('capacityDesc')
    },
    {
      icon: <Ship className="h-12 w-12 text-primary" />,
      title: t('tenDayVoyage'),
      description: t('voyageDesc')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('passengerAccommodations')}</h1>
                <p className="text-muted-foreground">
                  {t('passengerDesc')}
                </p>
              </div>
            </div>
            
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">{t('sailingVoyageExperience')}</h2>
              <p className="mb-4">
                {t('sailingDesc')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {vesselFeatures.map((feature, index) => (
                  <div key={index} className="text-center p-4 glass-panel">
                    <div className="mx-auto flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6 mb-2">
                <p className="text-muted-foreground mb-3">
                  {t('cantFind')}
                </p>
                <Button 
                  onClick={handleCustomBookingClick}
                  className="px-6"
                >
                  {t('createCustomBooking')}
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="rooms" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rooms" className="text-base py-3">
                  <Ship className="mr-2 h-4 w-4" />
                  {t('availableCabins')}
                </TabsTrigger>
                <TabsTrigger value="custom" className="text-base py-3">
                  <User className="mr-2 h-4 w-4" />
                  {t('customBooking')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="rooms" className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
                
                {/* Room Image Gallery Section */}
                <div className="mt-12 mb-8">
                  <h2 className="text-2xl font-semibold mb-6 text-center">{t('moreCabinViews')}</h2>
                  <p className="text-muted-foreground text-center mb-8">{t('moreCabinDesc')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {additionalRoomImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9 relative h-64">
                          <img 
                            src={image.imageUrl} 
                            alt={image.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                          <p className="text-muted-foreground text-sm">{image.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="animate-fade-in">
                <div className="glass-panel px-4 py-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-6">{t('customBooking')}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t('passengerDesc')}
                  </p>
                  <PassengerBookingForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eazy Chain. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
};

export default Passengers;
