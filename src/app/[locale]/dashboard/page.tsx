import Link from "next/link";

export default async function AppHome() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your pages</h1>
        <Link className="underline" href="/p/demo" prefetch={false}>
          View public example
        </Link>
      </div>
      
    </div>
  );
}
