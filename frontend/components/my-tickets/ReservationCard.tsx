"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
import { ArrowRight } from "lucide-react";

interface ReservationCardProps {
    id: string;
    date: { day: string; month: string; year: string };
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    time: string;
    venue: string;
    price: string | number;
}

export function ReservationCard({ id, date, homeTeam, awayTeam, time, venue, price }: ReservationCardProps) {
    return (
        <Card className="bg-lelevate border-border overflow-hidden group hover:border-red-primary/50 transition-all duration-300 max-w-[80rem]">
            <CardContent className="p-0 flex flex-col md:flex-row items-center h-full px-[2.4rem]">
                {/* Date */}
                <div className="flex flex-col items-center justify-center rounded-xl w-fit md:py-0 px-[2.4rem] bg-surface-card h-full  group-hover:border-red-primary/20 transition-colors whitespace-nowrap">
                    <span className="h2-medium font-bold text-main-white">{date.day}</span>
                    <span className="paragraph-14 font-bold text-red-primary uppercase">{date.month} {date.year}</span>
                    <span className="paragraph-14 font-bold text-main-white">{time}</span>
                </div>

                <div className="w-full flex-start-col gap-[1.2rem]">
                    {/* Teams */}
                    <div className="flex items-center justify-center w-full h-fit">
                        <div className="w-fit flex-center gap-[2.4rem]">
                            <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit h-auto">
                                <div className="w-full flex-center">

                                    <Image src="/images/barca-logo.png" alt="FC Barcelona" width={44} height={44} className="size-[4.4rem] object-contain" />
                                </div>
                                <span className="paragraph-18-medium text-main-white text-center">FC Barcelona</span>
                            </div>
                            <span className="paragraph-24-semibold text-secondary-white">vs</span>
                            <div className="flex flex-col items-center justify-cente gap-3 w-fit h-auto">
                                <div className="w-full flex-center">

                                    <Image src="/images/atm-logo.png" alt="Atlético de Madrid" width={44} height={44} className="size-[4.4rem] object-contain" />
                                </div>
                                <span className="paragraph-18-medium text-main-white text-center">Atlético de Madrid</span>
                            </div>
                        </div>
                    </div>

                    {/* Match Info */}
                        <div className="w-full flex items-center justify-center gap-[2.4rem]">                        
                            <div className="flex items-center justify-between max-w-[75%] gap-[3.2rem] w-full border-solid border-main-white h-full">
                                <span className="paragraph-18-semibold text-secondary-white whitespace-nowrap">Section: {''}<span className="text-main-white">StallB</span></span>
                                <span className="paragraph-18-semibold text-main-white">Row A</span>
                                <span className="paragraph-18-semibold text-main-white">Seat 4</span>
                                
                            </div>
                        </div>

                        {/* CTA */}
              <div className="gap-4 mt-4 w-full flex-center">
                <button 
                  className="px-4 py-3 rounded-xl bg-light-gray hover:cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <span className="paragraph-18-medium text-main-white/70">
                    Cancel Reservation
                  </span>
                </button>
                <button
                  className="px-4 py-3 rounded-xl  bg-red-primary hover:bg-red-hover transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:cursor-pointer justify-center gap-2"
                >
                  <span className="paragraph-18-medium text-main-white">

                    Finish Purchase
                  </span>
                </button>
              </div>
                </div>

            </CardContent>
        </Card>
    );
}
