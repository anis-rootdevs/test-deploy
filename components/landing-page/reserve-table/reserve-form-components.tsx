"use client";

import { CustomButton } from "@/components/custom/custom-button";
import DatePickerField from "@/components/custom/DatePickerFiled";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reservationSchema = z.object({
  outletName: z.string().min(1, "Please select an outlet"),
  reason: z.string().min(1, "Please select a reservation reason"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  date: z.string().min(1, "Please select a date"),
  people: z.string().min(1, "Number of people is required"),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const ReserveFormComponents = () => {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      outletName: "",
      reason: "",
      name: "",
      email: "",
      date: "",
      people: "",
      message: "",
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    console.log("Form Values:", values);
    // Handle form submission here
  };

  return (
    <div className="w-full bg-[#FAF8F5] dark:bg-[#222831] p-8 md:p-12 xl:max-w-3xl lg:max-w-[550px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Outlet Name */}
          <FormField
            control={form.control}
            name="outletName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-jost text-base font-medium">
                  Outlets Name
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full min-h-[2.8rem] border border-[#E2E2E2] dark:border-[#0F141B] bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-[#1B2A41] outline-none">
                      <SelectValue placeholder="Select Outlet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="outlet1"
                      className="hover:bg-primary hover:text-black"
                    >
                      Outlet 1 - Dhaka
                    </SelectItem>
                    <SelectItem value="outlet2">
                      Outlet 2 - Chittagong
                    </SelectItem>
                    <SelectItem value="outlet3">Outlet 3 - Sylhet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <DatePickerField
                  name="date"
                  control={form.control}
                  label="Reservation Date & Time"
                  placeholder="Select reservation date and time"
                  required
                  enableTime
                  time_24hr={false}
                  minuteIncrement={15}
                  dateFormat="Y-m-d h:i K"
                  minDate="today"
                  rules={{ required: "Required!" }}
                  error={form.formState.errors.date}
                  containerClassName="w-full "
                />
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
            className="dark:bg-primary dark:text-[#181C20] w-full"
          >
            Reserve Table
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default ReserveFormComponents;
