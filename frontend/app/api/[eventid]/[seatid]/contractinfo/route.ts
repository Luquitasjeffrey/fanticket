// @ts-nocheck
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ seatid: string, eventid: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { seatid, eventid } = await params;
  
  const SECRET_KEY = process.env.SEATS_IO_SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error: Missing Secret Key' }, { status: 500 });
  }

  const supabase = await createClient();

  let matchId;
	let reservationId;

	// Obtain contract match id
  try {
    // Get the seatsio event key
    const { data: event, error } = await supabase
      .from('events')
      .select('contract_match_id')
      .eq('id', eventid)
      .single();

    if (error || !event?.contract_match_id) {
      return NextResponse.json({ error: 'Event not found or missing Seats.io key' }, { status: 404 });
    }

		console.log(event, error);
    matchId = event.contract_match_id;
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

	/*CREATE TABLE public.seatsio_seat_id_to_contract_reservation_id(
    match_id UUID NOT NULL,
    seatsio_id TEXT NOT NULL,
    contract_reservation_id INTEGER,
    CONSTRAINT unique_match_seatsio UNIQUE (match_id, seatsio_id)
	); */

	// Get seat id
	try {
    // Get the seatsio event key
    const { data: row, error } = await supabase
      .from('seatsio_seat_id_to_contract_reservation_id')
      .select('contract_reservation_id')
      .eq('match_id', eventid)
			.eq('seatsio_id', seatid)
      .single();
		
    if (error || !row?.contract_reservation_id) {
			// No lo encontro!!
			const response = await supabase
	      .from('seatsio_seat_id_to_contract_reservation_id')
  			.select('*', { count: 'exact' }) // trae todas las columnas
  			.eq('match_id', eventid);
			
			reservationId = response.count;
			
			const { data: insertedRow, error: insertError } = await supabase
  			.from('seatsio_seat_id_to_contract_reservation_id')
  			.insert([
					{
						match_id: eventid,
						seatsio_id: seatid,
						contract_reservation_id: reservationId
					}
			  ]);

			console.log("COUNT: " + response.count);
    }
		else {
			reservationId = row.contract_reservation_id;
		}
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

	return NextResponse.json({
		matchId,
		reservationId
	});
}