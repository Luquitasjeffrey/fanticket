"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"

interface FixtureCardProps {
    id: string;
    date: { day: string; month: string; year: string };
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    time: string;
    venue: string;
    price: string | number;
}

export function FixtureCard({ id, date, homeTeam, awayTeam, time, venue, price }: FixtureCardProps) {
    return (
        <Card className="bg-lelevate border-border overflow-hidden group hover:border-red-primary/50 hover:shadow-redGlow transition-all duration-300 max-w-[80rem]">
            <CardContent className="p-0 flex flex-col md:flex-row items-center h-full px-[1.6rem]">
                {/* Date */}
                <div className="flex flex-col items-center justify-center rounded-xl w-fit md:py-0 px-[2.4rem] bg-surface-card h-full  group-hover:border-red-primary/20 transition-colors">
                    <span className="h2-medium font-bold text-main-white">{date.day}</span>
                    <span className="paragraph-14 font-bold text-red-primary uppercase">{date.month} {date.year}</span>
                    <span className="paragraph-14 font-bold text-main-white">{time}</span>
                </div>

                {/* Match Info */}
                <div className="flex-1 flex flex-col md:flex-row items-center h-full justify-between pl-6 py-4 gap-[2.4rem]">
                    <div className="flex items-center justify-between w-full h-fit">
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


                    {/* Action */}
                    <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit border-l border-solid border-main-white h-full px-[2.4rem]">
                        <span className="paragraph-18-semibold text-secondary-white">From <span className="text-main-white subtitle-medium">${price}</span></span>
                        <Button asChild className="bg-red-primary hover:bg-red-hover rounded-xl h-9 px-6 shadow-redGlow">
                            <Link href={`/events/${id}`} className="text-white font-semibold  text-18">
                            Reserve Seat
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
