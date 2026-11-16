import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Local admin panel. Exists only under `npm run dev`; the live site returns 404 here. */
export default function AdminPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <AdminPanel />;
}
