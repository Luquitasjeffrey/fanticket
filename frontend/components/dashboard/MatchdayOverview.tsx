"use client";

import { CountdownCard } from "./CountdownCard";
import { WalletCard } from "./WalletCard";
import { RewardCard } from "./RewardCard";

export function MatchdayOverview() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Matchday Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CountdownCard />
                <WalletCard />
                <RewardCard />
            </div>
        </div>
    );
}
