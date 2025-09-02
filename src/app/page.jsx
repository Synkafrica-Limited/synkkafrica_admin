import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src="/globe.svg" alt="SynkkAfrica Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SynkkAfrica Admin</h1>
      <p className="text-gray-600 mb-6">Your admin dashboard is ready. Please sign in to continue.</p>
      <a href="/auth/sign-in" className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold py-2 px-6 rounded-lg shadow hover:from-orange-500 hover:to-pink-500 transition">Go to Sign In</a>
    </main>
  );
}
