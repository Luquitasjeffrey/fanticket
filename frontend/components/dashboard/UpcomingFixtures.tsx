"use client"
import { FixtureCard } from "./FixtureCard";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/server';
import { formatDateHelper } from '@/utils/date';
import { Fixture } from "@/types";


interface UpcomingFixturesProps {
    fixtures: Fixture[]; 
  }

const filters = ["All Matches", "La Liga", "Champions League", "Near Me"];

export function UpcomingFixtures({ fixtures }: UpcomingFixturesProps) {

    return (
        <div className="space-y-6 w-full">
        {/* Header y Filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <h2 className="subtitle-semibold text-main-white">
            Upcoming Fixtures
          </h2>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {filters.map((filter, idx) => (
              <Button
                key={filter}
                variant="ghost"
                className={`paragraph-14 hover:cursor-pointer font-medium rounded-md px-6 py-2 h-auto hover:bg-elevate hover:text-main-white transition-colors ${
                  idx === 0 ? "text-main-white bg-white/10" : "text-secondary-white bg-elevate"
                }`}
              >
                [{filter}]
              </Button>
            ))}
          </div>
        </div>
  
        {/* Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {fixtures && fixtures.length > 0 ? (
            fixtures.map((fixture) => (
              <FixtureCard
                key={fixture.id}
                id={fixture.id}
                date={fixture.date}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                time={fixture.time}
                venue={fixture.venue}
                price={fixture.price}
              />
            ))
          ) : (
            // Empty state
            <div className="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-text-secondary">No upcoming matches scheduled.</p>
            </div>
          )}
        </div>
      </div>
    );
}
