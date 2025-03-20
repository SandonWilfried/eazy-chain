
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TrackingForm from "@/components/TrackingForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ship, MapPin, Calendar, Package, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TrackingEvent {
  id: string;
  date: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingData {
  trackingNumber: string;
  currentStatus: "pending" | "in-transit" | "delivered" | "customs" | "delayed";
  origin: string;
  destination: string;
  departureDate: string;
  estimatedArrival: string;
  vessel: string;
  progress: number;
  lastUpdated: string;
  events: TrackingEvent[];
}

const mockTrackingData: TrackingData = {
  trackingNumber: "CARGO12345678",
  currentStatus: "in-transit",
  origin: "Shanghai Port, China",
  destination: "Rotterdam Port, Netherlands",
  departureDate: "2023-10-25",
  estimatedArrival: "2023-11-20",
  vessel: "Nordic Navigator",
  progress: 58,
  lastUpdated: "2023-11-07T14:30:00Z",
  events: [
    {
      id: "evt1",
      date: "2023-10-25T08:15:00Z",
      location: "Shanghai Port, China",
      status: "Departed",
      description: "Vessel has departed from origin port",
    },
    {
      id: "evt2",
      date: "2023-10-28T10:30:00Z",
      location: "East China Sea",
      status: "In Transit",
      description: "Vessel is navigating through East China Sea",
    },
    {
      id: "evt3",
      date: "2023-11-02T16:45:00Z",
      location: "Strait of Malacca",
      status: "In Transit",
      description: "Vessel is passing through the Strait of Malacca",
    },
    {
      id: "evt4",
      date: "2023-11-07T14:30:00Z",
      location: "Indian Ocean",
      status: "In Transit",
      description: "Vessel is crossing the Indian Ocean",
    },
  ],
};

const statusConfig = {
  "pending": { 
    icon: Clock, 
    color: "bg-amber-100 text-amber-700", 
    label: "Pending Departure" 
  },
  "in-transit": { 
    icon: Ship, 
    color: "bg-blue-100 text-blue-700", 
    label: "In Transit" 
  },
  "delivered": { 
    icon: CheckCircle, 
    color: "bg-green-100 text-green-700", 
    label: "Delivered" 
  },
  "customs": { 
    icon: AlertCircle, 
    color: "bg-purple-100 text-purple-700", 
    label: "Customs Clearance" 
  },
  "delayed": { 
    icon: AlertCircle, 
    color: "bg-red-100 text-red-700", 
    label: "Delayed" 
  },
};

const Tracking = () => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const trackingId = new URLSearchParams(location.search).get("id");
    
    if (trackingId) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setTrackingData({
          ...mockTrackingData,
          trackingNumber: trackingId,
        });
        setLoading(false);
      }, 1500);
    }
  }, [location.search]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };

  const StatusIcon = trackingData ? statusConfig[trackingData.currentStatus].icon : Clock;
  const statusColor = trackingData ? statusConfig[trackingData.currentStatus].color : "";
  const statusLabel = trackingData ? statusConfig[trackingData.currentStatus].label : "";

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-6 md:p-8 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Track Your Shipment</h1>
              <TrackingForm />
            </div>
            
            {loading && (
              <div className="glass-panel p-8 text-center animate-pulse">
                <p className="text-lg">Loading tracking information...</p>
              </div>
            )}
            
            {!loading && trackingData && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-panel p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Tracking Number</div>
                      <h2 className="text-xl font-semibold">{trackingData.trackingNumber}</h2>
                    </div>
                    <Badge className={`${statusColor} mt-2 md:mt-0 text-sm px-3 py-1`}>
                      <StatusIcon className="mr-1 h-4 w-4" />
                      {statusLabel}
                    </Badge>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex justify-between items-end">
                        <div className="text-sm text-muted-foreground">Shipment Progress</div>
                        <div className="text-sm font-medium">{trackingData.progress}%</div>
                      </div>
                      <Progress value={trackingData.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Origin</div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trackingData.origin}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Destination</div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trackingData.destination}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Departure Date</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{formatDate(trackingData.departureDate)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Estimated Arrival</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{formatDate(trackingData.estimatedArrival)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Vessel</div>
                        <div className="flex items-center">
                          <Ship className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trackingData.vessel}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{formatDateTime(trackingData.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-6">Shipment Timeline</h3>
                  
                  <div className="space-y-6">
                    {trackingData.events.map((event, index) => (
                      <div key={event.id} className="relative">
                        {index !== trackingData.events.length - 1 && (
                          <div className="absolute top-7 left-3 w-0.5 h-full bg-border" />
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex-shrink-0 flex items-center justify-center mt-1">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <h4 className="font-medium">{event.status}</h4>
                              <time className="text-sm text-muted-foreground">
                                {formatDateTime(event.date)}
                              </time>
                            </div>
                            <p className="text-muted-foreground mt-1">{event.description}</p>
                            <div className="flex items-center mt-1 text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {!loading && !trackingData && location.search && (
              <div className="glass-panel p-8 text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Tracking Information Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any shipment with the provided tracking number. 
                  Please verify and try again.
                </p>
                <Button variant="outline">Contact Support</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CargoCaravan. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Tracking;
