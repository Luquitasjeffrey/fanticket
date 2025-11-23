import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Fixture } from "@/types";
import { ActiveReservations } from '@/components/my-tickets/ActiveReservations';
import { formatDateHelper } from '@/utils/date';

function parseSeatString(seatString: string | undefined | null) {
  if (!seatString) return { section: "TBA", row: "-", number: "-" };

  // Logic: Split "Stall C-G-9" by the "-" character
  const parts = seatString.split('-');

  // If we successfully found 3 parts (Section-Row-Number)
  if (parts.length >= 3) {
    return {
      section: parts[0].trim(),
      row: parts[1].trim(),
      number: parts[2].trim()
    };
  }
  
  if (parts.length === 2) {
    return {
      section: parts[0].trim(),
      row: "-", 
      number: parts[1].trim()
    };
  }

  // just text
  return { section: seatString, row: "-", number: "-" };
}

export default async function MyTicketsPage() {

  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) console.error("Error Supabase:", error);

  const formattedReservations = events?.map((event) => {
    const { day, month, year, time } = formatDateHelper(event.event_date);
    // Split names from vars in the DB
    const parts = event.title.split(' VS. '); 
    const homeName = parts[0] || "Home";
    const awayName = parts[1] || "Away";

    const seatDetails = parseSeatString(event.seat_id);

    return {
      id: event.id,
      date: { day, month, year },
      time,
      venue: event.stadium_id ? "Spotify Camp Nou" : "TBC",
      price: event.min_stake_required,
      homeTeam: { name: homeName, logo: "/images/barca-logo.png" },
      awayTeam: { name: awayName, logo: "/images/atm-logo.png" },
      seat: seatDetails
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