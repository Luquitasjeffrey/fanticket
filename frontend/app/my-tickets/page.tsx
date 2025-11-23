import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ActiveReservations } from '@/components/my-tickets/ActiveReservations';
import { formatDateHelper } from '@/utils/date';

function parseSeatString(seatString: string | undefined | null) {
  if (!seatString) return { section: "TBA", row: "-", number: "-" };
  const parts = seatString.split('-');
  if (parts.length >= 3) return { section: parts[0].trim(), row: parts[1].trim(), number: parts[2].trim() };
  if (parts.length === 2) return { section: parts[0].trim(), row: "-", number: parts[1].trim() };
  return { section: seatString, row: "-", number: "-" };
}

export default async function MyTicketsPage() {

  const supabase = await createClient();
  const userAddress = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E"

  const { data: reservationsData, error } = await supabase
    .from('reservations')
    .select(`
      id,
      seat_id,   
      purchase_amount,
      status,
      events ( 
        id,
        title,
        event_date,
        stadium_name,
        min_stake_required
      )
    `)
    .eq('user_wallet', userAddress)
    .order('created_at', { ascending: false });

  if (error) console.error("Error Supabase:", error);

  const formattedReservations = reservationsData?.map((res: any) => {
    const event = res.events;
    if (!event) return null; 

    const { day, month, year, time } = formatDateHelper(event.event_date);
    
    // Separar nombres
    const parts = event.title.split(' VS. '); 
    const homeName = parts[0] || "Home";
    const awayName = parts[1] || "Away";

   
    const seatDetails = parseSeatString(res.seat_id);

    return {
      id: res.id,
      date: { day, month, year },
      time,
      venue: event.stadium_name || "FanTicket Arena",
      price: event.min_stake_required,
      homeTeam: { name: homeName, logo: "/images/barca-logo.png" },
      awayTeam: { name: awayName, logo: "/images/atm-logo.png" },
      seat: seatDetails,
      userAddress: userAddress
    };
  }).filter(Boolean) || []; // Filtramos nulos

  return (
    <div className="w-full bg-black-base font-inter container-wrapper py-6 space-y-[4.8rem]">
        <section className='flex-start-col gap-[3.2rem] w-full'>
          <ActiveReservations reservations={formattedReservations as any}/>
        </section>
    </div>
  )
}