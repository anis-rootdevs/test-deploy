import { Label } from "@/components/ui/label";
import { BadgeAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputFieldProps {
  name?: string;
  dialCodeName?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  defaultCountry?: string;
  disabled?: boolean;
  className?: string;
  errorBadge?: boolean;
}
export default function PhoneInputField({
  name = "phone",
  dialCodeName = "dialCode",
  label = "Phone Number",
  placeholder,
  required = false,
  defaultCountry = "bd",
  disabled = false,
  className = "",
  errorBadge = true,
}: PhoneInputFieldProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={className}>
      <Label className="text-sm font-jost font-medium mb-1.5 block">
        {label}
        {/* {required && <span className="text-red-500 ml-1">*</span>} */}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={required ? { required: "Required!" } : undefined}
        render={({ field }) => (
          <PhoneInput
            country={defaultCountry}
            value={field.value}
            onChange={(value, country) => {
              field.onChange(value);
              if (country && "dialCode" in country) {
                setValue(dialCodeName, `+${country.dialCode}`);
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            containerClass="w-full"
            inputClass={`!w-full !h-11 !text-sm !rounded-md !bg-input !text-foreground !border !border-border focus:!border-primary
              ${error ? "!border-destructive" : ""}
              ${disabled ? "!opacity-50 !cursor-not-allowed" : ""}`}
            buttonClass={`!rounded-l-md !bg-muted !text-foreground !border !border-border ${
              error ? "!border-destructive" : ""
            } ${disabled ? "!opacity-50 !cursor-not-allowed" : ""}`}
            dropdownClass="!bg-popover !text-foreground !border !border-border"
          />
        )}
      />
      {error && (
        <div className="flex items-center mt-2 gap-1">
          {errorBadge && <BadgeAlert className="text-red-500 h-4 w-4" />}
          <p className="text-red-500 text-xs">{error.message as string}</p>
        </div>
      )}
    </div>
  );
}
