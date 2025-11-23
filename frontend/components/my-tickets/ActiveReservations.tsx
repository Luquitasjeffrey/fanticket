import { ReservationCard } from "./ReservationCard";
import { Fixture } from "@/types";


interface UpcomingReservationProps {
    reservations: Fixture[]; 
  }

export async function ActiveReservations({ reservations }: UpcomingReservationProps) {

    return (
        <div className="space-y-6 w-full">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <h2 className="subtitle-semibold text-main-white">
            Upcoming Reservations
          </h2>
        </div>
  
        {/* Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                id={reservation.id}
                date={reservation.date}
                homeTeam={reservation.homeTeam}
                awayTeam={reservation.awayTeam}
                time={reservation.time}
                venue={reservation.venue}
                price={reservation.price}
              />
            ))
          ) : (
            // Empty state
            <div className="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-text-secondary">No upcoming matches scheduled.</p>
            </div>
          )}
        </div>
      </div>
    );
}
