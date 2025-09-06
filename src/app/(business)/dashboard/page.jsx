import React from "react";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardChartWidget from "@/views/layouts/widgets/DashboardChartWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <BusinessSidebar active="Home" />
            <div className="flex-1 flex flex-col p-4 md:p-10">
                <BusinessHeader title="Hello Admin" subtitle="Welcome back" />
                {/* spacer */}
                <div className="my-4" />
                <DashboardStatsWidget />
                <DashboardChartWidget />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DashboardRecentActivityWidget />
                    <DashboardUserStatsWidget />
                </div>
            </div>
        </div>
    );
}
