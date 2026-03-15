export default function PageThumbnail() {
  return (
    <div className="w-12 h-9 rounded-md bg-secondary border border-border flex-shrink-0 overflow-hidden flex flex-col p-1 gap-0.5">
      <div className="h-0.5 rounded-full bg-border/80 w-4/5" />
      <div className="h-0.5 rounded-full bg-border w-3/5" />
      <div className="h-0.5 rounded-full bg-border/80 w-4/5" />
      <div className="h-0.5 rounded-full bg-border w-3/5" />
    </div>
  );
}