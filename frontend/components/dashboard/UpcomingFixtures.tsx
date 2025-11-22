"use client";

import { FixtureCard } from "./FixtureCard";
import { Button } from "@/components/ui/button";

const fixtures = [
    {
        id: 1,
        date: { day: "26", month: "NOV", year: "2025" },
        homeTeam: { name: "FC Barcelona", logo: "/images/barca-logo.png" },
        awayTeam: { name: "Atlético de Madrid", logo: "/images/atm-logo.png" },
        time: "21:00",
        venue: "Camp Nou",
        price: "85"
    },
    {
        id: 2,
        date: { day: "26", month: "NOV", year: "2025" },
        homeTeam: { name: "FC Barcelona", logo: "/images/barca-logo.png" },
        awayTeam: { name: "Atlético de Madrid", logo: "/images/atm-logo.png" },
        time: "21:00",
        venue: "Camp Nou",
        price: "85"
    },
    {
        id: 3,
        date: { day: "26", month: "NOV", year: "2025" },
        homeTeam: { name: "FC Barcelona", logo: "/images/barca-logo.png" },
        awayTeam: { name: "Atlético de Madrid", logo: "/images/atm-logo.png" },
        time: "21:00",
        venue: "Camp Nou",
        price: "85"
    },
    {
        id: 4,
        date: { day: "26", month: "NOV", year: "2025" },
        homeTeam: { name: "FC Barcelona", logo: "/images/barca-logo.png" },
        awayTeam: { name: "Atlético de Madrid", logo: "/images/atm-logo.png" },
        time: "21:00",
        venue: "Camp Nou",
        price: "85"
    }
];

const filters = ["All Matches", "La Liga", "Champions League", "Near Me"];

export function UpcomingFixtures() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white uppercase tracking-wide">Upcoming Fixtures</h2>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {filters.map((filter, idx) => (
                        <Button
                            key={filter}
                            variant="ghost"
                            className={`text-sm font-medium rounded-lg px-3 py-1 h-auto hover:bg-elevate hover:text-white ${idx === 0 ? "text-white" : "text-text-secondary"
                                }`}
                        >
                            [{filter}]
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {fixtures.map((fixture) => (
                    <FixtureCard key={fixture.id} {...fixture} />
                ))}
            </div>
        </div>
    );
}
