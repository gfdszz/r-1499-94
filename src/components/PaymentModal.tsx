
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, CreditCard } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
  price: string;
  isRental?: boolean;
}

const PaymentModal = ({ open, onOpenChange, propertyTitle, price, isRental = false }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));
  const monthlyRent = Math.round(numericPrice * 0.004); // Approximate monthly rent (0.4% of purchase price)
  const displayPrice = isRental ? `$${monthlyRent.toLocaleString()}/month` : price;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate a payment processing delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Show success message after a short delay
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        
        toast({
          title: isRental ? "Rental Payment Successful" : "Property Reserved Successfully",
          description: isRental 
            ? `Your monthly payment of ${displayPrice} has been processed.`
            : `You've successfully reserved ${propertyTitle}. Our agent will contact you shortly.`,
        });
      }, 1500);
    }, 2000);
  };
  
  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <DialogTitle className="text-xl text-center">
              {isRental ? "Payment Successful!" : "Property Reserved!"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isRental 
                ? `Your monthly payment of ${displayPrice} has been processed.`
                : `You've successfully reserved ${propertyTitle}. Our agent will contact you shortly.`}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isRental ? "Make Rental Payment" : "Reserve This Property"}
          </DialogTitle>
          <DialogDescription>
            {isRental 
              ? `Monthly rent payment for ${propertyTitle}`
              : `Secure ${propertyTitle} with a reservation payment`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="property" className="text-sm text-muted-foreground">Property</Label>
            <div id="property" className="font-medium">{propertyTitle}</div>
          </div>
          
          <div>
            <Label htmlFor="amount" className="text-sm text-muted-foreground">Amount</Label>
            <div id="amount" className="font-medium text-lg">{displayPrice}</div>
            {isRental && (
              <div className="text-sm text-muted-foreground mt-1">Security deposit: ${Math.round(monthlyRent * 2).toLocaleString()}</div>
            )}
            {!isRental && (
              <div className="text-sm text-muted-foreground mt-1">Reservation fee: $1,000 (applied to down payment)</div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <RadioGroup 
              defaultValue="card" 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="cursor-pointer">Bank Transfer (ACH)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {paymentMethod === "card" && (
            <>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Smith" required />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </>
          )}
          
          {paymentMethod === "bank" && (
            <>
              <div>
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input id="accountName" placeholder="John Smith" required />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input id="routingNumber" placeholder="021000021" required />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" placeholder="123456789" required />
              </div>
            </>
          )}
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : (isRental ? "Pay Now" : "Reserve Property")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
