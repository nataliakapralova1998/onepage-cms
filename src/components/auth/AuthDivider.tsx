type AuthDividerProps = {
    label?: string;
  };
  
  export default function AuthDivider({ label = "or" }: AuthDividerProps) {
    return (
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[0.68rem] text-muted">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }