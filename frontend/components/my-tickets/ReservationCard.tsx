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

                <div className="w-full flex-start-col gap-[0.4rem]">
                    {/* Teams */}
                    <div className="flex items-center justify-center w-full h-fit">
                        <div className="w-fit flex-center gap-[2.4rem]">
                            <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit h-auto">
                                <div className="w-full flex-center">

                                    <Image src="/images/barca-logo.png" alt="FC Barcelona" width={44} height={44} className="size-[4.4rem] object-contain" />
                                </div>
                                <span className="paragraph-18-medium text-main-white">FC Barcelona</span>
                            </div>
                            <span className="paragraph-24-semibold text-secondary-white">vs</span>
                            <div className="flex flex-col items-center justify-cente gap-3 w-fit h-auto">
                                <div className="w-full flex-center">

                                    <Image src="/images/atm-logo.png" alt="Atlético de Madrid" width={44} height={44} className="size-[4.4rem] object-contain" />
                                </div>
                                <span className="paragraph-18-medium text-main-white">Atlético de Madrid</span>
                            </div>
                        </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex-1 flex  items-end h-full justify-between pl-6 py-2 gap-[3.2rem]">
                        <div className="w-full flex items-center justify-between gap-[2.4rem]">                        
                            <div className="flex items-center justify-center gap-[3.2rem] w-full border-solid border-main-white h-full">
                                <span className="paragraph-18-semibold text-secondary-white whitespace-nowrap">Section: {''}<span className="text-main-white">StallB</span></span>
                                <span className="paragraph-18-semibold text-main-white">Row A</span>
                                <span className="paragraph-18-semibold text-main-white">Seat 4</span>
                                
                            </div>
                        {/* CTA */}
                            <Link href="/" className="px-[2.4rem] py-[6px] rounded-[500px] hover:bg-red-hover bg-red-primary hover:shadow-redGlow text-main-white paragraph-18-semibold gap-[0.8rem] flex-center hover:border-main-white  transition-all duration-500 ease-in-out border-black broder-solid border whitespace-nowrap">
                                <span>

                                    Finish Purchase 
                                </span>
                                <ArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
