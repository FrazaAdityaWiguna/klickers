import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Home() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      console.log("Service Workers:", registrations);
    });
  }

  return (
    <main className="container py-5 text-center">
      <h1 className="mb-4">Next.js + PWA + Redux + Bootstrap</h1>
      <p>This page works offline and supports theme switching.</p>
      <ThemeToggle />
    </main>
  );
}
