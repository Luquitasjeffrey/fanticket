"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface ReservationCardProps {
    id: string;
    date: { day: string; month: string; year: string };
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    time: string;
    venue: string;
    price: string | number;
    seat?: {
        section: string;
        row: string;
        number: string;
    };
}

export function ReservationCard({ 
    id, 
    date, 
    homeTeam, 
    awayTeam, 
    time, 
    venue, 
    price, 
    seat 
}: ReservationCardProps) {
    return (
        <Card className="bg-lelevate border-border overflow-hidden group hover:border-red-primary/50 hover:shadow-redGlow transition-all duration-300">
            <CardContent className="p-0 flex flex-col md:flex-row items-center h-full px-[1.6rem]">
                
                {/* Date */}
                <div className="flex flex-col items-center justify-center rounded-xl w-fit min-w-[15.6rem] md:py-0 px-[2.4rem] bg-surface-card h-full  group-hover:border-red-primary/20 transition-colors">
                    <span className="h2-medium font-bold text-main-white">{date.day}</span>
                    <span className="paragraph-14 font-bold text-red-primary uppercase">{date.month} {date.year}</span>
                    <span className="paragraph-14 font-bold text-main-white">{time}</span>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-[0.4rem]">
                    
                    {/* Teams & Logos */}
                    <div className="flex items-center justify-center w-full h-fit">
                        <div className="w-fit flex items-center gap-[2.4rem]">
                            {/* Home Team */}
                            <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit h-auto">
                                <div className="w-full flex justify-center relative h-[4.4rem]">
                                    <Image 
                                        src={homeTeam.logo} 
                                        alt={homeTeam.name} 
                                        width={44} 
                                        height={44} 
                                        className="object-contain size-[4.4rem]" 
                                    />
                                </div>
                                <span className="paragraph-18-medium text-main-white text-center whitespace-nowrap leading-tight">{homeTeam.name}</span>
                            </div>

                            <span className="paragraph-24-semibold text-secondary-white ">VS.</span>

                            {/* Away Team */}
                            <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit h-auto">
                                <div className="w-full flex justify-center relative h-[4.4rem]">
                                    <Image 
                                        src={awayTeam.logo} 
                                        alt={awayTeam.name} 
                                        width={44} 
                                        height={44} 
                                        className="object-contain size-[4.4rem]" 
                                    />
                                </div>
                                <span className="paragraph-18-medium text-main-white text-center whitespace-nowrap leading-tight">{awayTeam.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Match Info (Seat Details) */}
                    <div className="w-full flex items-center justify-center">                        
                        <div className="flex items-center justify-between w-full max-w-[90%] md:max-w-[75%] gap-[1rem] md:gap-[3.2rem] border-t border-white/10 pt-4 mt-2">
                            <span className="paragraph-18-semibold text-secondary-white whitespace-nowrap  ">
                                Section: <span className="text-main-white">{seat?.section || "TBA"}</span>
                            </span>
                            <span className="paragraph-18-semibold text-secondary-white whitespace-nowrap  ">
                                Row: <span className="text-main-white">{seat?.row || "-"}</span>
                            </span>
                            <span className="paragraph-18-semibold text-secondary-white whitespace-nowrap  ">
                                Seat: <span className="text-main-white">{seat?.number || "-"}</span>
                            </span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="gap-4 mt-4 w-full max-w-[65%] flex justify-center">
                        <button 
                            onClick={() => console.log(id, seat)}
                            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
                        >
                            <span className="paragraph-18-medium text-main-white/70  font-medium">
                                Cancel
                            </span>
                        </button>
                        
                        {/* Link to checkout using the reservation ID */}
                        <Link href={`/checkout/${id}`} className="w-fit hover:cursor-pointer">
                            <button
                                className="px-6 py-3 rounded-xl bg-red-primary w-full whitespace-nowrap  hover:bg-red-hover transition-colors shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 hover:cursor-pointer"
                            >
                                <span className="paragraph-18-medium text-white font-bold whitespace-nowrap">
                                    Pay ${price} & Finish
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}