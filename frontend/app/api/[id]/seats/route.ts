import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  
  const SECRET_KEY = process.env.SEATS_IO_SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error: Missing Secret Key' }, { status: 500 });
  }

  const supabase = await createClient();

  try {
    // Get the seatsio event key
    const { data: event, error } = await supabase
      .from('events')
      .select('seatsio_event_key')
      .eq('id', id)
      .single();

    if (error || !event?.seatsio_event_key) {
      return NextResponse.json({ error: 'Event not found or missing Seats.io key' }, { status: 404 });
    }

    const seatsioKey = event.seatsio_event_key;

    //  SeatsIO call
    const seatsResponse = await fetch(`https://api-na.seatsio.net/reports/events/${seatsioKey}/objects`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(SECRET_KEY + ':').toString('base64')
      },
      cache: 'no-store' 
    });

    if (!seatsResponse.ok) {
      throw new Error(`Seats.io Error: ${seatsResponse.statusText}`);
    }

    const seatsData = await seatsResponse.json();

    // Get the seats
    return NextResponse.json(seatsData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}