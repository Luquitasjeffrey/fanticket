import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image';
import { formatDateHelper } from "@/utils/date";
import StadiumMap from "@/components/stadium/StadiumMap";

interface EventPageProps {
  params: Promise<{ id: string }>
}

// Mock data
const MOCK_EVENT = {
  id: '123-mock-id',
  title: 'FC Barcelona vs Atlético de Madrid',
  event_date: '2025-05-20T21:00:00Z',
  stadium_name: 'Spotify Camp Nou',
  real_event_photo_url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop',
  min_stake_required: 100,
  status: 'scheduled',
  seatsio_event_key: '12b4c8f8-7a9f-4272-8209-0750aeb60ff8' 
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  
  const event = MOCK_EVENT

  // Supabase
  /*
  const supabase = await createClient()

  // Fetch event details including the seats.io key and min stake
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*, seatsio_event_key, min_stake_required')
    .eq('id', id)
    .single()

  if (eventError || !event) {
    notFound()
  }
  */

// Date format
  const { usDate, time, weekday } = formatDateHelper(event.event_date);

  return (
    <div className="min-h-screen bg-black-base font-inter container-wrapper py-6 space-y-[4.8rem] px-[6.4rem]">

      <div className="mb-8 border-b border-slate-800 pb-6 flex items-center justify-between w-full">
        
        <div className='flex flex-col gap-2'>
          <h1 className="h1-small text-main-white max-w-[101rem]">{event.title}</h1>
          <div className="flex items-center gap-2 text-secondary-white paragraph-18-medium">
             <span>🏟️</span>
             <p>Stadium: {event.stadium_name}</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 text-right'>
          <p className="text-secondary-white paragraph-18-medium capitalize">
             📅 {weekday}, {usDate}
          </p>
          <p className="text-secondary-white paragraph-18-medium">
             ⚽ Kick-off: <span className="text-white font-bold">{time}</span>
          </p>
        </div>
      </div>

      {/* Interactive Seat Map */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-main-white">Select your VIP Seat</h2>
        
        {/* We check if the key exists to prevent crashing if data is missing */}
        {event.seatsio_event_key ? (
          <StadiumMap 
            eventKey={event.seatsio_event_key} 
            minStake={event.min_stake_required || 0}
          />
        ) : (
          <div className="h-64 w-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-gray-500">
             <p>Seating chart not available for this event.</p>
          </div>
        )}
      </section>

      {/* Section: Real Stadium Visual */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-secondary-white">About the Venue</h3>
        {event.real_event_photo_url && (
          <div className="mt-6 relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-800">
             <Image 
               src={event.real_event_photo_url} 
               alt={`${event.stadium_name} view`}
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
               priority
             />
             
             <div className="absolute inset-0 bg-gradient-to-t from-black-base/80 to-transparent pointer-events-none" />
          </div>
        )}
      </section>

    </div>
  )
}