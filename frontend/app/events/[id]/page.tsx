import { createClient } from '@/utils/supabase/server' // Asegúrate de tener tu cliente configurado
import { notFound } from 'next/navigation'

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = params
  
  const supabase = await createClient()

  // Search match information
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  // Error handling
  if (eventError || !event) {
    notFound()
  }

  // Look for seats with prices
  const { data: seats } = await supabase
    .from('seats')
    .select('id, row_number, seat_number, section_name, status, price_fiat, price_chiliz')
    .eq('event_id', id)
    .order('row_number', { ascending: true })

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      {/* Encabezado del Evento */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-bold text-chiliz-red">{event.title}</h1>
        <div className="flex gap-4 mt-4 text-gray-400">
          <p>📅 {new Date(event.event_date).toLocaleDateString()}</p>
          <p>🏟️ {event.stadium_id} (Aquí podrías hacer un join para traer el nombre)</p>
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
             {/* Next Image component */}
          </div>
        )}
      </section>

    </main>
  )
}