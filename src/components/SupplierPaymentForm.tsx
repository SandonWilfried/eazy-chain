
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Camera, CreditCard, Upload, Send, Check, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  // Step 1: Supplier Information
  supplierName: z.string().min(2, { message: "Supplier name is required" }),
  supplierEmail: z.string().email({ message: "Invalid email address" }),
  supplierCountry: z.string().min(1, { message: "Country is required" }),
  supplierBankName: z.string().min(2, { message: "Bank name is required" }),
  supplierAccountNumber: z.string().min(5, { message: "Account number is required" }),
  supplierBankSwift: z.string().optional(),
  
  // Step 2: Payment Details
  paymentAmount: z.string().min(1, { message: "Amount is required" }),
  paymentCurrency: z.string().min(1, { message: "Currency is required" }),
  paymentPurpose: z.string().min(5, { message: "Payment purpose is required" }),
  paymentNotes: z.string().optional(),
  
  // Step 3: Verification is handled via separate state
});

const SupplierPaymentForm = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      supplierEmail: "",
      supplierCountry: "",
      supplierBankName: "",
      supplierAccountNumber: "",
      supplierBankSwift: "",
      paymentAmount: "",
      paymentCurrency: "",
      paymentPurpose: "",
      paymentNotes: "",
    },
  });

  const nextStep = () => {
    if (currentStep === 1) {
      form.trigger(["supplierName", "supplierEmail", "supplierCountry", "supplierBankName", "supplierAccountNumber"]);
      
      const supplierInfoValid = form.getValues("supplierName") && 
                               form.getValues("supplierEmail") && 
                               form.getValues("supplierCountry") && 
                               form.getValues("supplierBankName") && 
                               form.getValues("supplierAccountNumber");
      
      if (!supplierInfoValid) {
        return;
      }
    }
    
    if (currentStep === 2) {
      form.trigger(["paymentAmount", "paymentCurrency", "paymentPurpose"]);
      
      const paymentDetailsValid = form.getValues("paymentAmount") && 
                                 form.getValues("paymentCurrency") && 
                                 form.getValues("paymentPurpose");
      
      if (!paymentDetailsValid) {
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!idDocument) {
        toast({
          title: "ID Document Required",
          description: "Please upload your identification document",
          variant: "destructive",
        });
        return;
      }
      
      if (!selfieImage) {
        toast({
          title: "Verification Photo Required",
          description: "Please take a selfie for identity verification",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setIsCameraOpen(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Access Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setIsCameraOpen(false);
    }
  };

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setSelfieImage(dataUrl);
        stopCamera();
      }
    }
  };

  const generatePaymentReference = async () => {
    setIsSubmitting(true);
    
    // Simulate API call for generating payment reference
    try {
      // This would be replaced with an actual API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reference = "PAY-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setPaymentReference(reference);
      
      toast({
        title: "Payment Reference Generated",
        description: `Your payment reference is: ${reference}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate payment reference. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // This would send all the form data to your backend
    console.log("Form submitted:", data);
    console.log("ID Document:", idDocument);
    console.log("Selfie Image:", selfieImage);
    
    await generatePaymentReference();
  };

  // Common currency options
  const currencies = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "CNY", label: "Chinese Yuan (CNY)" },
    { value: "HKD", label: "Hong Kong Dollar (HKD)" },
    { value: "SGD", label: "Singapore Dollar (SGD)" },
    { value: "XOF", label: "West African CFA Franc (XOF)" },
  ];

  // Render appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 1: Supplier Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplierName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter supplier name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supplierEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter supplier email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="supplierCountry"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Supplier Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter supplier country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="supplierBankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supplierAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="supplierBankSwift"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>SWIFT/BIC Code (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SWIFT/BIC code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 2: Payment Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="paymentPurpose"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Payment Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter payment purpose" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentNotes"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional information about this payment"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 3: Identity Verification</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Upload ID Document</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload a clear image of your passport, ID card, or driver's license.
                </p>
                
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('id-upload')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Select Document
                  </Button>
                  <input
                    id="id-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  
                  {idDocument && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{idDocument.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Take a Verification Photo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We need a clear photo of your face to verify your identity.
                </p>
                
                {!selfieImage ? (
                  <div className="mb-4">
                    {!isCameraOpen ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={startCamera}
                        className="flex items-center gap-2"
                      >
                        <Camera size={16} />
                        Open Camera
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative rounded-lg overflow-hidden border bg-black">
                          <video 
                            ref={videoRef}
                            autoPlay 
                            playsInline
                            className="w-full max-h-[300px] object-contain"
                          />
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button 
                            type="button" 
                            onClick={takeSelfie}
                            className="flex items-center gap-2"
                          >
                            <Camera size={16} />
                            Take Photo
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={stopCamera}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden border">
                      <img 
                        src={selfieImage} 
                        alt="Verification selfie" 
                        className="w-full max-h-[300px] object-contain"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setSelfieImage(null)}
                      className="flex items-center gap-2"
                    >
                      Retake Photo
                    </Button>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>
          </>
        );
        
      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 4: Review & Confirm</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div>{form.getValues("supplierName")}</div>
                    
                    <div className="font-medium">Email:</div>
                    <div>{form.getValues("supplierEmail")}</div>
                    
                    <div className="font-medium">Country:</div>
                    <div>{form.getValues("supplierCountry")}</div>
                    
                    <div className="font-medium">Bank Name:</div>
                    <div>{form.getValues("supplierBankName")}</div>
                    
                    <div className="font-medium">Account Number:</div>
                    <div>{form.getValues("supplierAccountNumber")}</div>
                    
                    {form.getValues("supplierBankSwift") && (
                      <>
                        <div className="font-medium">SWIFT/BIC:</div>
                        <div>{form.getValues("supplierBankSwift")}</div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Amount:</div>
                    <div>
                      {form.getValues("paymentAmount")} {form.getValues("paymentCurrency")}
                    </div>
                    
                    <div className="font-medium">Purpose:</div>
                    <div>{form.getValues("paymentPurpose")}</div>
                    
                    {form.getValues("paymentNotes") && (
                      <>
                        <div className="font-medium">Notes:</div>
                        <div>{form.getValues("paymentNotes")}</div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">ID Document:</div>
                    <div>{idDocument?.name}</div>
                    
                    <div className="font-medium">Verification Photo:</div>
                    <div>Provided</div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  By clicking "Generate Payment Reference", you agree to our terms of service and 
                  privacy policy. Your information will be securely processed to facilitate this payment.
                </p>
                
                {!paymentReference ? (
                  <Button 
                    onClick={form.handleSubmit(onSubmit)} 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate Payment Reference
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 bg-primary/5">
                      <h3 className="font-semibold mb-1">Your Payment Reference</h3>
                      <div className="text-lg font-bold text-primary">{paymentReference}</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use this reference when making your payment through our payment gateway or bank transfer.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/payment" className="w-full">
                        <Button variant="default" className="w-full flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Proceed to Payment
                        </Button>
                      </Link>
                      <Link to="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full">
                          View in Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <Form {...form}>
        <form className="space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step 
                      ? "bg-primary text-primary-foreground" 
                      : currentStep > step 
                      ? "bg-primary/80 text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {step === 1 && "Supplier"}
                  {step === 2 && "Payment"}
                  {step === 3 && "Verify"}
                  {step === 4 && "Confirm"}
                </div>
              </div>
            ))}
          </div>
          
          {renderStepContent()}
          
          {/* Navigation buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          )}
          
          {currentStep === 4 && !paymentReference && (
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Previous
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SupplierPaymentForm;
