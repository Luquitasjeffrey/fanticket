"use client";

import { CountdownCard } from "./CountdownCard";
import { WalletCard } from "./WalletCard";
import { RewardCard } from "./RewardCard";

export function MatchdayOverview() {
    return (
        <div className="space-y-4 w-full">
            <h2 className="subtitle-semibold text-main-white">Matchday Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <CountdownCard />
                <WalletCard />
                <RewardCard />
            </div>
        </div>
    );
}
