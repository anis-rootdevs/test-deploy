"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomButton } from "@/components/custom/custom-button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ReservationFormValues = z.infer<typeof reservationSchema>;

const reservationSchema = z.object({
  reason: z.string().min(1, "Please select a reservation reason"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  date: z.date({
    message: "Please select a date",
  }),
  time: z.string().min(1, "Please choose a time"),
  people: z.string().min(1, "Number of people is required"),
  message: z.string().optional(),
});

const ReserveFormComponents = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reason: "",
      name: "",
      email: "",
      date: undefined,
      time: "",
      people: "",
      message: "",
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    console.log(values);
  };

  return (
    <div className="w-full bg-[#FAF8F5] dark:bg-[#222831] p-8 md:p-12 xl:max-w-3xl lg:max-w-[550px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Reservation Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Reservation Reason
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full min-h-[2.8rem] border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-[#1B2A41] outline-none">
                      <SelectValue placeholder="Personal / Family / Office meeting" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="personal"
                      className="hover:bg-primary hover:text-black"
                    >
                      Personal Gathering
                    </SelectItem>
                    <SelectItem value="family">Family Gathering</SelectItem>
                    <SelectItem value="office">Office Meeting</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Afrin"
                    {...field}
                    className="h-11 border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1B2A41] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Your Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="sadia@gmail.com"
                    type="email"
                    {...field}
                    className="h-11 border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1B2A41] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date - With Calendar Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-jost text-base font-medium">
                  Reservation Date
                </FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 pl-3 text-left font-normal border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-[#1B2A41] outline-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "MM-dd-yyyy")
                          : "mm/dd/yyyy"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 dark:text-[#FEFEFF]" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Reservation Time
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    {[
                      "8:00 PM",
                      "8:30 PM",
                      "9:00 PM",
                      "9:30 PM",
                      "10:00 PM",
                      "10:30 PM",
                    ].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={time}
                          id={time}
                          className="border border-[#1B2A41] dark:border-[#FEFEFF]"
                        />
                        <Label
                          htmlFor={time}
                          className="text-base font-jost font-normal"
                        >
                          {time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of People */}
          <FormField
            control={form.control}
            name="people"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Number of People
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="07"
                    type="number"
                    min={1}
                    {...field}
                    className="h-11 border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1B2A41] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Your Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    rows={4}
                    {...field}
                    className="border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1B2A41] outline-none resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <CustomButton
            type="submit"
            variant="filled"
            className="dark:bg-primary dark:text-[#181C20]"
          >
            Reserve Table
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default ReserveFormComponents;
