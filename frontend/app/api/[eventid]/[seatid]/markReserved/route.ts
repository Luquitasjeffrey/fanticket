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

  const { seatid, eventid } = await params;
  const body = await request.json();
  const wallet = body.userAddress;

  const SECRET_KEY = process.env.SEATS_IO_SECRET_KEY;
  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Missing Secret Key' }, { status: 500 });
  }

  const supabase = await createClient();

  // 1. Buscar si el user existe
  const { data: existingUser, error: userSelectError } = await supabase
    .from('users')
    .select('wallet_address')
    .eq('wallet_address', wallet)
    .single();

  if (userSelectError && userSelectError.code !== 'PGRST116') {
    console.error('Error buscando user:', userSelectError);
    return NextResponse.json({ error: 'User lookup failed' }, { status: 500 });
  }

  // 2. Si NO existe → crearlo
  if (!existingUser) {
    console.log('User no existe, creando uno nuevo con boilerplate…');

    const { error: userInsertError } = await supabase
      .from('users')
      .insert([
        {
          wallet_address: wallet,
          username: null,
          avatar_url: null,
          xp_points: 0,
          chiliz_level: 'Fan'
        }
      ]);

    if (userInsertError) {
      console.error('Error creando user:', userInsertError);
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }
  }

  // 3. Insertar en reservations (ahora sí)
  const { error: insertError } = await supabase
    .from('reservations')
    .insert([
      {
        event_id: eventid,
        seat_id: seatid,
        user_wallet: wallet,
        status: 'staked_waiting_payment'
      }
    ]);

  if (insertError) {
    console.error('Error insertando reservation:', insertError);
    return NextResponse.json({ error: 'Reservation creation failed' }, { status: 500 });
  }

  console.log('Seat reserved successfully!');
  return NextResponse.json({ ok: true }, { status: 200 });
}
