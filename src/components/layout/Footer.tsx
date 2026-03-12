export default function Footer() {
    const links = ["Privacy", "Terms", "Contact"];
  
    return (
      <footer className="border-t border-border px-12 py-8 flex items-center justify-between">
        <span className="font-serif text-base tracking-tight">SlugPage</span>
        <div className="flex gap-6">
          {links.map((link) => (
            <a key={link} href="/" className="text-sm text-muted hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
        <span className="text-xs text-muted">© 2025 SlugPage</span>
      </footer>
    );
  }