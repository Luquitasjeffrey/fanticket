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
  console.log('cancelReservation!');

  const { seatid, eventid } = await params;
  const body = await request.json();
  const wallet = body.userAddress;

  const supabase = await createClient();

  // 1. Buscar la reservation
  const { data: reservation, error: selectError } = await supabase
    .from('reservations')
    .select('*')
    .eq('event_id', eventid)
    .eq('seat_id', seatid)
    .single();

  if (selectError) {
    console.error('Error buscando reservation:', selectError);
    return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
  }

  // (OPCIONAL) Validar que la reserva sea del usuario
  if (wallet && reservation.user_wallet !== wallet) {
    console.error('Intento de cancelar una reserva ajena:', wallet);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // 2. Actualizar el status a cancelled
  const { error: updateError } = await supabase
    .from('reservations')
    .update({ status: 'cancelled' })
    .eq('event_id', eventid)
    .eq('seat_id', seatid);

  if (updateError) {
    console.error('Error actualizando reservation:', updateError);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  console.log('Reservation cancelled successfully!');
  return NextResponse.json({ ok: true }, { status: 200 });
}
