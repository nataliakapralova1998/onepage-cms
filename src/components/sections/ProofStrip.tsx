const stats = [
    { val: "$1", label: "one-time cost" },
    { val: "< 1 min", label: "to go live" },
    { val: "∞", label: "free to edit" },
    { val: "0", label: "technical skills needed" },
  ];
  
  export default function ProofStrip() {
    return (
      <>
        <hr className="border-border" />
        <div className="flex items-center justify-center flex-wrap gap-y-6 gap-x-0 py-8 px-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1 px-8">
                <span className="font-serif text-2xl font-light tracking-tight text-primary">
                  {stat.val}
                </span>
                <span className="text-xs text-muted text-center">{stat.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-8 bg-border" />
              )}
            </div>
          ))}
        </div>
        <hr className="border-border" />
      </>
    );
  }