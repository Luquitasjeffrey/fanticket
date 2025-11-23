import { MatchdayOverview } from "@/components/dashboard/MatchdayOverview";
import  {UpcomingFixtures}  from "@/components/dashboard/UpcomingFixtures";
import { TopBar } from "@/components/TopBar";
import { createClient } from '@/utils/supabase/server';
import { formatDateHelper } from '@/utils/date';

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) console.error("Error Supabase:", error);

  const formattedFixtures = events?.map((event) => {
    const { day, month, year, time } = formatDateHelper(event.event_date);
    // Lógica simple para separar nombres (ajusta según tu DB real)
    const parts = event.title.split(' vs '); 
    const homeName = parts[0] || "Home";
    const awayName = parts[1] || "Away";

    return {
      id: event.id,
      date: { day, month, year },
      time,
      venue: event.stadium_id ? "Spotify Camp Nou" : "TBC",
      price: event.min_stake_required,
      homeTeam: { name: homeName, logo: "/images/generic-shield.png" }, // Placeholder
      awayTeam: { name: awayName, logo: "/images/generic-shield.png" }  // Placeholder
    };
  }) || [];

  return (
    <div className="min-h-screen bg-black-base font-inter">
        <div className="container-wrapper py-6 space-y-12 px-[6.4rem]">
          <TopBar />
          <div className="flex-start-col gap-14">
            <MatchdayOverview />
            <UpcomingFixtures fixtures={formattedFixtures}/>
          </div>
        </div>
    </div>
  );
}
