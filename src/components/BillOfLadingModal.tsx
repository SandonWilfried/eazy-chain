
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Mail, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillOfLadingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId: string;
  origin: string;
  destination: string;
  containerCount: number;
}

const BillOfLadingModal = ({
  open,
  onOpenChange,
  shipmentId,
  origin,
  destination,
  containerCount
}: BillOfLadingModalProps) => {
  const { toast } = useToast();
  const [emailSent, setEmailSent] = useState(false);
  
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Bill of Lading Downloaded",
      description: "Document has been downloaded to your device.",
      duration: 3000,
    });
  };
  
  const handleEmailDelivery = () => {
    // In a real app, this would send the document via email
    setEmailSent(true);
    toast({
      title: "Bill of Lading Sent",
      description: "Document has been sent to your email address.",
      duration: 3000,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Bill of Lading
          </DialogTitle>
          <DialogDescription>
            Your payment was successful. Here's your bill of lading for shipment {shipmentId}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 border rounded-md bg-muted/30 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Document Type</h4>
            <p className="font-medium">Bill of Lading</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Shipment ID</h4>
            <p className="font-medium">{shipmentId}</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Origin</h4>
              <p className="font-medium">{origin}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Destination</h4>
              <p className="font-medium">{destination}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Container Count</h4>
            <p className="font-medium">{containerCount} unit(s)</p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          
          <Button 
            variant={emailSent ? "outline" : "default"}
            className="w-full sm:w-auto" 
            onClick={handleEmailDelivery}
            disabled={emailSent}
          >
            {emailSent ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Email Sent
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Email to Me
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BillOfLadingModal;
