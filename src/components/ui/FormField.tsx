import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  onKeyDown,
  placeholder,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-xs font-medium text-primary">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full border rounded-lg px-4 py-3 text-sm font-light text-primary bg-background outline-none transition-all placeholder:text-muted/50 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]",
          error ? "border-error" : "border-border"
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}