// @ts-nocheck
'use client'
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { reserve } from '@/lib/fanticket';
import { getConnectedWallet } from '@/lib/walletconfig';

interface SeatsioObject {
  id?: string;
  labels: { own: string };
  category?: { label: string };
  pricing?: { price: number };
  deselect: () => void;
}

interface StadiumMapProps {
  eventKey: string;
  minStake: number;
}

function getEventId() {
  const parts = window.location.href.split('/');
  return parts[parts.length - 1];
}

export default function StadiumMap({ eventKey, minStake }: StadiumMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<SeatsioObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStaking, setIsStaking] = useState(false);

  const pricingConfig = [
    { category: 1, price: 50 }, 
    { category: 2, price: 100 }   
  ];

  async function getMatchIdAndReservationId() {
    const eventId = getEventId();
    const seatsioId = selectedSeat.id;
    const response = await fetch(`/api/${eventId}/${seatsioId}/contractinfo`);
    const contractData = await response.json();
    const matchId = BigInt(contractData.matchId);
    const reservationId = BigInt(contractData.reservationId);
    return {
      matchId,
      reservationId
    };
  }

  // Select a Seat and Modal open
  const handleSeatSelected = (object: unknown) => {
    const seat = object as SeatsioObject;
    setSelectedSeat(seat);
    setIsModalOpen(true);
    console.log(seat);
  };

//   Deselect the seat
  const handleSeatDeselected = () => {
    setSelectedSeat(null);
    setIsModalOpen(false);
  };

  // Stake is confirmed
  const handleConfirmStake = async () => {
    if (!selectedSeat) return;
    
    setIsStaking(true);

    try {
      // --- AQUÍ VA TU LÓGICA DE BACKEND ---
      // 1. Llamada a Supabase para crear la reserva
      // 2. Llamada a la Wallet para firmar la transacción      alert('S')
      const eventId = getEventId();
      const seatsioId = selectedSeat.id;
      const response = await fetch(`/api/${eventId}/${seatsioId}/contractinfo`);
      const contractData = await response.json();
      const matchId = BigInt(contractData.matchId);
      const reservationId = BigInt(contractData.reservationId)
      const walletClient = await getConnectedWallet();
      await reserve(walletClient, matchId, reservationId);

      console.log("Staking your tokens", minStake, "CHZ for this spot", selectedSeat.labels.own);
      

      alert(`Congratulations! Your stake was sucessful: The ${selectedSeat.labels.own} seat is reserved!`);
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Staking error:", error);
      alert("There was an error while loading the stake");
    } finally {
      setIsStaking(false);
    }
  };

  // Close modal
  const handleCancel = () => {
    // Deselect seat if the user didn't click to reserve it
    if (selectedSeat) {
      selectedSeat.deselect(); 
    }
    setIsModalOpen(false);
    setSelectedSeat(null);
  };

  return (
    <div className="relative flex flex-col gap-4">
      {/* Stadium map */}
      <div className="h-[600px] w-full border border-slate-800 rounded-xl overflow-hidden bg-slate-50 relative z-0">
        <SeatsioSeatingChart
          workspaceKey={process.env.NEXT_PUBLIC_SEATS_IO_KEY!}
          event={eventKey}
          region="na"
          language="es"
          pricing={pricingConfig}
          onObjectSelected={handleSeatSelected}
          onObjectDeselected={handleSeatDeselected}
        />
      </div>

      {/* Modal for staking */}
      {isModalOpen && selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-xl font-bold text-white">Reserve your spot</h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="h-12 w-12 rounded-full bg-chiliz-red/20 flex items-center justify-center text-chiliz-red font-bold text-xl">
                  {selectedSeat.labels.own}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Categories</p>
                  <p className="font-semibold text-white">{selectedSeat.category?.label || 'General'}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-400">Cost of the ticket</p>
                  <p className="font-semibold text-white">${selectedSeat.pricing?.price || 0}</p>
                </div>
              </div>

              {/* Staking */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Stake required:</span>
                  <span className="font-bold text-white">{minStake} Fan Tokens</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-chiliz-red w-full animate-pulse"></div>
                </div>
                <p className="text-xs text-gray-500">
                  * These tokens will get temporarily blocked to ensure your spot in this event.
                </p>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-3 rounded-xl font-semibold text-gray-300 hover:bg-slate-800 transition-colors"
                  disabled={isStaking}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmStake}
                  disabled={isStaking}
                  className="px-4 py-3 rounded-xl font-bold text-white bg-chiliz-red hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isStaking ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Stake tokens and save your Spot"
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}