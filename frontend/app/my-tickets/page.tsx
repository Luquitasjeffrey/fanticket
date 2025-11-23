import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Fixture } from "@/types";
import { ActiveReservations } from '@/components/my-tickets/ActiveReservations';
import { formatDateHelper } from '@/utils/date';

export default async function MyTicketsPage() {

  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) console.error("Error Supabase:", error);

  const formattedReservations = events?.map((event) => {
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
      homeTeam: { name: homeName, logo: "/images/barca-logo.png" }, // Placeholder
      awayTeam: { name: awayName, logo: "/images/atm-logo.png" }  // Placeholder
    };
  }) || [];

  return (
    <div className="w-full bg-black-base font-inter container-wrapper py-6 space-y-[4.8rem]">
        <section className='flex-start-col gap-[3.2rem] w-full'>
          <ActiveReservations reservations={formattedReservations}/>
        </section>
      

    </div>
  )
}