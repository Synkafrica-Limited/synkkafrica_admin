"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketsPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to support dashboard if accessed directly
        router.push('/settings/support');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-64">
            <p>Redirecting to support dashboard...</p>
        </div>
    );
}
