import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Loader2, CheckCircle } from "lucide-react";

interface AuthFlowProps {
  onComplete?: (userData: any) => void;
  onSkip?: () => void;
}

const AuthFlow = ({
  onComplete = () => {},
  onSkip = () => {},
}: AuthFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState<string>("");
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Skip OTP verification for Google login
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleNameDobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Complete the auth flow
      onComplete({
        mobileNumber,
        name,
        dob: date,
        address,
      });
    }, 1500);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    // Simulate getting location
    setTimeout(() => {
      setAddress("123 Main St, New York, NY 10001");
      setIsGettingLocation(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-background p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1 && "Welcome to Rental Marketplace"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Complete Your Profile"}
            {step === 4 && "Add Your Address"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Login or create an account to continue"}
            {step === 2 && "Enter the OTP sent to your mobile number"}
            {step === 3 && "Tell us a bit about yourself"}
            {step === 4 && "Where are you located?"}
          </CardDescription>
          {step === 1 && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Skip Login & Browse Products
              </Button>
            </div>
          )}
          <Progress value={progress} className="mt-2" />
          <div className="text-xs text-muted-foreground text-center mt-1">
            Step {step} of {totalSteps}
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
              </TabsList>
              <TabsContent value="mobile">
                <form onSubmit={handleMobileSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="google">
                <div className="space-y-4 mt-4">
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  OTP sent to {mobileNumber}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNameDobSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={"w-full justify-start text-left font-normal"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !date}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={handleAddressSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting location
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      Use current location
                    </>
                  )}
                </Button>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={loading}
              className="w-full"
            >
              Back
            </Button>
          )}
          <div className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthFlow;
