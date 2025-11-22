"use client";

import { MatchdayOverview } from "@/components/dashboard/MatchdayOverview";
import { UpcomingFixtures } from "@/components/dashboard/UpcomingFixtures";
import { TopBar } from "@/components/TopBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black-base font-inter">
        <div className="container-wrapper py-6 space-y-[4.8rem] px-[6.4rem]">
          <TopBar />
          <div>
            <MatchdayOverview />
            <UpcomingFixtures />
          </div>
        </div>
    </div>
  );
}
