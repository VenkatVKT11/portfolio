import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-semibold tracking-tight text-blue">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">This page does not exist</h1>
      <p className="mt-3 max-w-[40ch] text-lg text-mute">The link may be old or mistyped. The portfolio is one page, so everything is on the home page.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the portfolio
      </Link>
    </main>
  );
}
