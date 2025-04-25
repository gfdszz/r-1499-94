
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export const BookingCalendar = () => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();

  const handleBooking = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked!",
      description: `Your appointment is scheduled for ${format(date, 'PPP')} at ${timeSlot}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
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

      <div className="space-y-2">
        <Label>Select Time</Label>
        <Select onValueChange={setTimeSlot}>
          <SelectTrigger>
            <SelectValue placeholder="Pick a time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleBooking} className="w-full">
        Book Appointment
      </Button>
    </div>
  );
};

export default BookingCalendar;
