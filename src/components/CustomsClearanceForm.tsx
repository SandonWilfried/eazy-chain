
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, X, AlertCircle, Ship, Plane, Truck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  transportMode: z.enum(["ocean", "air", "road"], {
    required_error: "Please select a transportation mode.",
  }),
  shipmentDetails: z.string().min(10, {
    message: "Please provide more details about your shipment.",
  }),
});

type FileType = "billOfLading" | "airwayBill" | "commercialInvoice" | "packingList" | "exportDocuments" | "otherDocuments";

type FileItem = {
  id: string;
  file: File;
  type: FileType;
};

const CustomsClearanceForm = ({ onClose }: { onClose: () => void }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentErrors, setDocumentErrors] = useState<Record<FileType, boolean>>({
    billOfLading: false,
    airwayBill: false,
    commercialInvoice: false,
    packingList: false,
    exportDocuments: false,
    otherDocuments: false,
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      transportMode: "ocean",
      shipmentDetails: "",
    },
  });

  const transportMode = form.watch("transportMode");

  // Determine required documents based on transport mode
  const requiredDocumentTypes: FileType[] = transportMode === "air" 
    ? ["airwayBill", "commercialInvoice"] 
    : ["billOfLading", "commercialInvoice", "packingList"];

  // Update document errors whenever files change or transport mode changes
  useEffect(() => {
    let newErrors = { ...documentErrors };
    
    // Reset all required document error states
    requiredDocumentTypes.forEach(type => {
      newErrors[type] = false;
    });
    
    // Check which required documents are missing
    requiredDocumentTypes.forEach(type => {
      const hasDocument = files.some(file => file.type === type);
      newErrors[type] = !hasDocument;
    });
    
    setDocumentErrors(newErrors);
  }, [files, transportMode, requiredDocumentTypes]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        type
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const validateRequiredDocuments = (): boolean => {
    let newErrors = { ...documentErrors };
    let valid = true;
    
    requiredDocumentTypes.forEach(type => {
      const hasDocument = files.some(file => file.type === type);
      newErrors[type] = !hasDocument;
      if (!hasDocument) valid = false;
    });
    
    setDocumentErrors(newErrors);
    return valid;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Validate required documents before submission
    if (!validateRequiredDocuments()) {
      toast({
        title: "Missing Required Documents",
        description: "Please upload all required documents marked with (*)",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", values);
    console.log("Uploaded files:", files);
    
    toast({
      title: "Request Submitted",
      description: "Your customs clearance request has been submitted successfully.",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const hasAnyDocumentErrors = requiredDocumentTypes.some(type => documentErrors[type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corporation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="transportMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transportation Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ocean" />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1.5 font-normal cursor-pointer">
                      <Ship className="h-4 w-4" />
                      Ocean
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="air" />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1.5 font-normal cursor-pointer">
                      <Plane className="h-4 w-4" />
                      Air
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="road" />
                    </FormControl>
                    <FormLabel className="flex items-center gap-1.5 font-normal cursor-pointer">
                      <Truck className="h-4 w-4" />
                      Road
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="shipmentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipment Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide details about your shipment including origin, destination, goods description, and any special requirements." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">Required Documents</h3>
          <p className="text-sm text-muted-foreground">Please upload the following documents to process your customs clearance request.</p>
          
          {hasAnyDocumentErrors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please upload all required documents marked with (*) before submitting.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            {/* Air transportation documents */}
            {transportMode === "air" && (
              <>
                {/* Airway Bill */}
                <div>
                  <FormLabel className="mb-2 block">
                    Airway Bill <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "airwayBill")}
                        className={`cursor-pointer ${documentErrors.airwayBill ? "border-destructive" : ""}`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                    {documentErrors.airwayBill && (
                      <p className="text-sm font-medium text-destructive">
                        Airway Bill is required
                      </p>
                    )}
                    {files.filter(f => f.type === "airwayBill").map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commercial Invoice for Air */}
                <div>
                  <FormLabel className="mb-2 block">
                    Commercial Invoice <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "commercialInvoice")}
                      className={`cursor-pointer ${documentErrors.commercialInvoice ? "border-destructive" : ""}`}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {documentErrors.commercialInvoice && (
                      <p className="text-sm font-medium text-destructive">
                        Commercial Invoice is required
                      </p>
                    )}
                    {files.filter(f => f.type === "commercialInvoice").map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Ocean/Road transportation documents */}
            {transportMode !== "air" && (
              <>
                {/* Bill of Lading */}
                <div>
                  <FormLabel className="mb-2 block">
                    Bill of Lading <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "billOfLading")}
                        className={`cursor-pointer ${documentErrors.billOfLading ? "border-destructive" : ""}`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                    {documentErrors.billOfLading && (
                      <p className="text-sm font-medium text-destructive">
                        Bill of Lading is required
                      </p>
                    )}
                    {files.filter(f => f.type === "billOfLading").map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Commercial Invoice for Ocean/Road */}
                <div>
                  <FormLabel className="mb-2 block">
                    Commercial Invoice <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "commercialInvoice")}
                      className={`cursor-pointer ${documentErrors.commercialInvoice ? "border-destructive" : ""}`}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {documentErrors.commercialInvoice && (
                      <p className="text-sm font-medium text-destructive">
                        Commercial Invoice is required
                      </p>
                    )}
                    {files.filter(f => f.type === "commercialInvoice").map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Packing List */}
                <div>
                  <FormLabel className="mb-2 block">
                    Packing List <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "packingList")}
                      className={`cursor-pointer ${documentErrors.packingList ? "border-destructive" : ""}`}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {documentErrors.packingList && (
                      <p className="text-sm font-medium text-destructive">
                        Packing List is required
                      </p>
                    )}
                    {files.filter(f => f.type === "packingList").map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* Export Documents - Not required */}
            <div>
              <FormLabel className="mb-2 block">Export Documents</FormLabel>
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "exportDocuments")}
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {files.filter(f => f.type === "exportDocuments").map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                    <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Other Documents - Not required */}
            <div>
              <FormLabel className="mb-2 block">Other Documents</FormLabel>
              <FormDescription className="mt-0 mb-2">Any additional documents that might be helpful for customs clearance.</FormDescription>
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e, "otherDocuments")}
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {files.filter(f => f.type === "otherDocuments").map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                    <span className="text-sm truncate max-w-[300px]">{file.file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomsClearanceForm;
