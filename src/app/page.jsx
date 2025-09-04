"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/sign-in');
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-500 mb-6"></div>
        <h1 className="text-xl font-semibold text-primary-600">Loading Admin Dashboard...</h1>
      </div>
    </main>
  );
}