// @ts-nocheck
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ useraddress: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  console.log('myReservations!');
  const { useraddress } = await params;
  
  const SECRET_KEY = process.env.SEATS_IO_SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error: Missing Secret Key' }, { status: 500 });
  }

  const supabase = await createClient();

	const {data, error} = await supabase
		.from('reservations')
		.select('event_id, seat_id')
		.eq('user_wallet', useraddress)
		.eq('status', 'staked_waiting_payment')

  console.log('Seat reserved successfully!');
	if (error) {
    console.log("ERROR: ");
    console.log(error);
		throw error;
	}
  return NextResponse.json(data, {status: 200});
}