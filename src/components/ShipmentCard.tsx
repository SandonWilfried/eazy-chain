
import { Package, MapPin, Calendar, ArrowRight, CreditCard } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ShipmentProps {
  id: string;
  trackingNumber: string;
  status: "pending" | "in-transit" | "delivered" | "cancelled";
  origin: string;
  destination: string;
  departureDate: string;
  estimatedArrival: string;
  containerCount: number;
  paymentStatus: "paid" | "pending" | "overdue";
  totalAmount: number;
}

const ShipmentCard = ({ shipment }: { shipment: ShipmentProps }) => {
  const { t } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const statusConfig = {
    "pending": { color: "bg-amber-100 text-amber-700", label: t('pending') },
    "in-transit": { color: "bg-blue-100 text-blue-700", label: t('inTransit') },
    "delivered": { color: "bg-green-100 text-green-700", label: t('delivered') },
    "cancelled": { color: "bg-red-100 text-red-700", label: t('cancelled') }
  };

  const paymentStatusConfig = {
    "paid": { color: "bg-green-100 text-green-700", label: t('paid') },
    "pending": { color: "bg-amber-100 text-amber-700", label: t('paymentPending') },
    "overdue": { color: "bg-red-100 text-red-700", label: t('paymentOverdue') }
  };

  const { color: statusColor, label: statusLabel } = statusConfig[shipment.status];
  const { color: paymentColor, label: paymentLabel } = paymentStatusConfig[shipment.paymentStatus];

  return (
    <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-muted-foreground mb-1">{t('trackingNumber')}</div>
            <CardTitle className="text-lg">{shipment.trackingNumber}</CardTitle>
          </div>
          <Badge className={statusColor}>
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">{t('origin')}</span>
            <div className="flex items-center font-medium">
              <MapPin size={14} className="mr-1 text-muted-foreground" />
              {shipment.origin}
            </div>
          </div>
          
          <ArrowRight size={16} className="text-muted-foreground mx-2" />
          
          <div className="flex flex-col gap-1 items-end">
            <span className="text-muted-foreground">{t('destination')}</span>
            <div className="flex items-center font-medium">
              <MapPin size={14} className="mr-1 text-muted-foreground" />
              {shipment.destination}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs text-muted-foreground">{t('departureDate')}</div>
            <div className="flex items-center mt-1">
              <Calendar size={14} className="mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{formatDate(shipment.departureDate)}</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-muted-foreground">{t('estimatedArrival')}</div>
            <div className="flex items-center mt-1">
              <Calendar size={14} className="mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{formatDate(shipment.estimatedArrival)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-xs text-muted-foreground">{t('containers')}</div>
            <div className="flex items-center mt-1">
              <Package size={14} className="mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{shipment.containerCount} {shipment.containerCount === 1 ? t('unit') : t('units')}</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-xs text-muted-foreground">{t('totalAmount')}</div>
            <div className="text-sm font-semibold mt-1">${shipment.totalAmount.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Badge variant="outline" className={paymentColor}>
          <CreditCard size={14} className="mr-1" />
          {paymentLabel}
        </Badge>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/tracking?id=${shipment.trackingNumber}`}>
              {t('track')}
            </Link>
          </Button>
          {shipment.paymentStatus !== "paid" && (
            <Button size="sm" asChild>
              <Link to={`/payment?id=${shipment.trackingNumber}`}>
                {t('payNow')}
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShipmentCard;
