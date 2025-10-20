"use client";

import MainLayout from "@/components/Layout/MainLayout";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Home() {
  return (
    <MainLayout>
      <main className="container py-5 text-center">
        <h1 className="mb-4">Next.js + PWA + Redux + Bootstrap</h1>
        <p>This page works offline and supports theme switching.</p>
        <ThemeToggle />
      </main>
    </MainLayout>
  );
}
