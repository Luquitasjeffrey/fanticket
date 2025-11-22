import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { formatDateHelper } from "@/utils/date";

interface EventPageProps {
    params: Promise<{ id: string }>
  }

const MOCK_EVENT = {
    id: '123-mock-id',
    title: 'FC Barcelona vs Atlético de Madrid',
    event_date: '2025-05-20T21:00:00Z',
    stadium_name: 'Spotify Camp Nou',
    real_event_photo_url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop',
    min_stake_required: 150,
    status: 'scheduled'
  }

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = MOCK_EVENT

  const { usDate, time, weekday } = formatDateHelper(event.event_date);

//   Descomentar para usar con supabase
//   const supabase = await createClient()

//   // Search match information
//   const { data: event, error: eventError } = await supabase
//     .from('events')
//     .select('*')
//     .eq('id', id)
//     .single()

//   // Error handling
//   if (eventError || !event) {
//     notFound()
//   }

  // Look for seats with prices
//   const { data: seats } = await supabase
//     .from('seats')
//     .select('id, row_number, seat_number, section_name, status, price_fiat, price_chiliz')
//     .eq('event_id', id)
//     .order('row_number', { ascending: true })

  return (
    <div className="min-h-screen bg-black-base font-inter container-wrapper py-6 space-y-[4.8rem] px-[6.4rem]">
      {/* Encabezado del Evento */}
      <div className="mb-8 border-b border-slate-800 pb-6 flex-center justify-between w-full">
        <div className='flex-start-col gap-2'>

        <h1 className="h1-small text-main-white max-w-[101rem]">{event.title}</h1>
        <p className='text-secondary-white paragraph-18-medium'>Stadium: {event.stadium_name}</p>
        </div>

        <div className='flex-start-col gap-2'>
        <p className="text-secondary-white paragraph-18-medium">Date: {weekday}, {usDate}</p>
        <p className="text-secondary-white paragraph-18-medium">Start of the match: {time}</p>

        </div>
        
        
      </div>

      {/* Seat map*/}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Selecciona tu Asiento VIP</h2>
        {/* seatmap component */}
      </section>
      <section>
        {/* Stadium real picture*/}
        {event.real_event_photo_url && (
          <div className="mt-6 relative h-64 w-full rounded-xl overflow-hidden">
             {/* Next Image component with picture of the stadium */}
          </div>
        )}
      </section>

    </div>
  )
}