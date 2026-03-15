import { cn } from "@/lib/utils";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <div className={cn("w-full max-w-sm", className)}>
        {children}
      </div>
    </div>
  );
}