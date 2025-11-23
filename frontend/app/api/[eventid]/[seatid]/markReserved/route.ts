// @ts-nocheck
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ seatid: string, eventid: string }>;
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
	console.log('markReserved!');
	const body = await request.json();
  const { seatid, eventid } = await params;
  
  const SECRET_KEY = process.env.SEATS_IO_SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error: Missing Secret Key' }, { status: 500 });
  }

  const supabase = await createClient();

	const { data: insertedRow, error: insertError } = await supabase
  	.from('reservation')
  	.insert([
			{
				match_id: eventid,
				seatsio_id: seatid,
				user_wallet: body.userAddress,
				status: 'staked_waiting_payment'
			}
		]);

	console.log('Seat reserved successfully!');
	return NextResponse.json({}, {status: 200});
}