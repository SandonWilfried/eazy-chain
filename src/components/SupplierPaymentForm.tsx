
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Upload, 
  Camera, 
  Check, 
  Clock, 
  Loader2, 
  ChevronDown, 
  Send 
} from "lucide-react";

import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form validation schema
const formSchema = z.object({
  paymentAmount: z.string().min(1, "Amount is required"),
  currency: z.string().min(1, "Currency is required"),
  supplierName: z.string().min(3, "Supplier name must be at least 3 characters"),
  supplierCountry: z.string().min(1, "Supplier country is required"),
  supplierBankDetails: z.string().min(10, "Bank details must be at least 10 characters"),
  paymentPurpose: z.string().min(5, "Payment purpose must be at least 5 characters"),
  paymentMethod: z.enum(["card", "mobile_money"]),
  phoneNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SupplierPaymentForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [identitySelfie, setIdentitySelfie] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentAmount: "",
      currency: "USD",
      supplierName: "",
      supplierCountry: "",
      supplierBankDetails: "",
      paymentPurpose: "",
      paymentMethod: "card",
      phoneNumber: "",
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIdentityDoc(files[0]);
      toast({
        title: "Document uploaded",
        description: `File "${files[0].name}" has been uploaded successfully.`,
      });
    }
  };
  
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setIdentitySelfie(dataUrl);
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
        setCameraActive(false);
      }
      
      toast({
        title: "Selfie captured",
        description: "Your verification photo has been captured successfully.",
      });
    }
  };
  
  const resetSelfie = () => {
    setIdentitySelfie(null);
  };
  
  const nextStep = () => {
    if (currentStep === 1 && !identityDoc) {
      toast({
        title: "Document required",
        description: "Please upload your identity document before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && !identitySelfie) {
      toast({
        title: "Selfie required",
        description: "Please take a verification photo before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3) {
      const formIsValid = form.formState.isValid;
      if (!formIsValid) {
        form.trigger();
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const verifyIdentity = () => {
    setIsLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      setVerificationComplete(true);
      toast({
        title: "Verification complete",
        description: "Your identity has been verified successfully.",
      });
    }, 3000);
  };
  
  const generatePaymentReference = () => {
    setIsLoading(true);
    
    // Simulate payment reference generation
    setTimeout(() => {
      const reference = `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setPaymentReference(reference);
      setIsLoading(false);
      
      toast({
        title: "Payment Reference Generated",
        description: `Your payment reference is ${reference}. Please use this to complete your payment.`,
      });
    }, 2000);
  };
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // In real app, this would be sent to backend
    nextStep();
  };
  
  const selectedPaymentMethod = form.watch("paymentMethod");
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={`relative z-10 flex flex-col items-center ${
                step < currentStep 
                  ? "text-green-600" 
                  : step === currentStep 
                  ? "text-primary" 
                  : "text-gray-400"
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step < currentStep 
                    ? "bg-green-100 text-green-600 border border-green-600" 
                    : step === currentStep 
                    ? "bg-primary/10 text-primary border border-primary" 
                    : "bg-gray-100 text-gray-400 border border-gray-300"
                }`}
              >
                {step < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span className="text-xs font-medium">
                {step === 1 && "Upload ID"}
                {step === 2 && "Take Selfie"}
                {step === 3 && "Payment Details"}
                {step === 4 && "Verify Identity"}
                {step === 5 && "Complete"}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            {currentStep === 1 && "Upload Identity Document"}
            {currentStep === 2 && "Take Verification Photo"}
            {currentStep === 3 && "Payment Details"}
            {currentStep === 4 && "Identity Verification"}
            {currentStep === 5 && "Payment Reference"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Please upload a valid government-issued ID document (passport, driver's license or national ID card)"}
            {currentStep === 2 && "Now take a photo of yourself for verification purposes"}
            {currentStep === 3 && "Enter the details of your supplier payment"}
            {currentStep === 4 && "We need to verify your identity before processing the payment"}
            {currentStep === 5 && "Use this reference to complete your payment"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Step 1: Upload ID */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="mb-4 text-sm text-muted-foreground">
                  Upload your identity document (ID card, passport, or driver's license)
                </p>
                <input
                  type="file"
                  id="identity-document"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("identity-document")?.click()}
                  className="mb-2"
                >
                  Select Document
                </Button>
                {identityDoc && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-md">
                    <p className="text-sm">
                      <Check className="inline-block w-4 h-4 text-green-600 mr-1" />
                      {identityDoc.name}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" disabled type="button">
                  Back
                </Button>
                <Button onClick={nextStep} type="button">
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Take Selfie */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                {!identitySelfie && !cameraActive && (
                  <div>
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="mb-4 text-sm text-muted-foreground">
                      Take a photo of yourself for verification
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={startCamera}
                    >
                      Start Camera
                    </Button>
                  </div>
                )}
                
                {cameraActive && (
                  <div className="space-y-4">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="mx-auto border rounded-md max-w-full"
                    ></video>
                    <Button onClick={takeSelfie}>
                      Capture Photo
                    </Button>
                  </div>
                )}
                
                {identitySelfie && (
                  <div className="space-y-4">
                    <div className="relative mx-auto max-w-[300px]">
                      <img 
                        src={identitySelfie} 
                        alt="Verification selfie" 
                        className="mx-auto border rounded-md max-w-full" 
                      />
                      <Check className="absolute top-2 right-2 bg-green-100 p-1 rounded-full text-green-600 w-6 h-6" />
                    </div>
                    <Button variant="outline" onClick={resetSelfie} className="mt-2">
                      Retake Photo
                    </Button>
                  </div>
                )}
                
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} type="button">
                  Back
                </Button>
                <Button onClick={nextStep} type="button">
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment Details Form */}
          {currentStep === 3 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paymentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Amount*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            <SelectItem value="XOF">XOF - West African CFA</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="supplierName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter supplier name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="supplierCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Country*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="CHN">China</SelectItem>
                            <SelectItem value="GBR">United Kingdom</SelectItem>
                            <SelectItem value="FRA">France</SelectItem>
                            <SelectItem value="DEU">Germany</SelectItem>
                            <SelectItem value="JPN">Japan</SelectItem>
                            <SelectItem value="TGO">Togo</SelectItem>
                            <SelectItem value="TUR">Turkey</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="supplierBankDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Bank Details*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter bank details (account number, bank name, branch, etc.)" 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include all necessary details for international wire transfer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Purpose*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter payment purpose or description" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center gap-2">
                              <CreditCard size={18} />
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mobile_money" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Mobile Money
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {selectedPaymentMethod === "mobile_money" && (
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter mobile money number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include country code (e.g., +1 for US)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} type="button">
                    Back
                  </Button>
                  <Button type="submit">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          {/* Step 4: Identity Verification */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <div className="flex items-center justify-center flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-2">
                      <Upload className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-sm font-medium">ID Document</p>
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <Check className="h-3 w-3 mr-1" /> Uploaded
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <ChevronDown className="rotate-90 text-gray-400" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-2">
                      <Camera className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Selfie</p>
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <Check className="h-3 w-3 mr-1" /> Captured
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <ChevronDown className="rotate-90 text-gray-400" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-2">
                      {verificationComplete ? (
                        <Check className="h-12 w-12 text-green-600" />
                      ) : (
                        <Clock className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <p className="text-sm font-medium">Verification</p>
                    <div className={`text-xs ${verificationComplete ? 'text-green-600' : 'text-amber-500'} flex items-center mt-1`}>
                      {verificationComplete ? (
                        <>
                          <Check className="h-3 w-3 mr-1" /> Verified
                        </>
                      ) : (
                        'Pending'
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  {!verificationComplete ? (
                    <Button 
                      onClick={verifyIdentity} 
                      disabled={isLoading} 
                      className="w-full max-w-sm"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Identity"
                      )}
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-green-800 dark:text-green-300">
                      <div className="flex items-center justify-center mb-2">
                        <Check className="h-6 w-6 mr-2" />
                        <span className="font-semibold">Identity Verified Successfully</span>
                      </div>
                      <p className="text-sm">You can now proceed to request a payment reference</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} type="button">
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  type="button" 
                  disabled={!verificationComplete}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 5: Payment Reference */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="p-6 border rounded-lg text-center">
                {!paymentReference ? (
                  <div className="space-y-4">
                    <Send className="h-16 w-16 mx-auto text-primary mb-2" />
                    <h3 className="text-lg font-semibold">Generate Payment Reference</h3>
                    <p className="text-muted-foreground max-w-md mx-auto text-sm">
                      A payment reference will be generated for your supplier payment. 
                      You will need to use this reference to complete your payment.
                    </p>
                    
                    <Button 
                      onClick={generatePaymentReference} 
                      disabled={isLoading}
                      className="mt-4 w-full max-w-sm"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Payment Reference"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                      <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <h3 className="text-lg font-semibold">Payment Reference Generated</h3>
                    
                    <div className="p-4 bg-primary/5 rounded-md inline-block mx-auto">
                      <p className="text-2xl font-mono font-semibold tracking-wide">
                        {paymentReference}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground max-w-md mx-auto text-sm">
                      Please use this reference when making your payment. 
                      The reference is valid for 24 hours.
                    </p>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(paymentReference);
                        toast({
                          title: "Copied to clipboard",
                          description: "Payment reference has been copied to clipboard",
                        });
                      }}
                      className="mt-2"
                    >
                      Copy Reference
                    </Button>
                    
                    <div className="pt-4">
                      <Link to="/payment" className="text-primary hover:underline text-sm">
                        Proceed to payment
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} type="button">
                  Back
                </Button>
                <Button
                  variant="ghost" 
                  onClick={() => {
                    setCurrentStep(1);
                    setIdentityDoc(null);
                    setIdentitySelfie(null);
                    setVerificationComplete(false);
                    setPaymentReference(null);
                    form.reset();
                  }} 
                  type="button"
                >
                  Start New Payment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierPaymentForm;
