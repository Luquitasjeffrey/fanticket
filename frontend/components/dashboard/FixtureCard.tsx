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
        <Card className="bg-surface-card border-border overflow-hidden group hover:border-red-primary/50 transition-all duration-300">
            <CardContent className="p-0 flex flex-col md:flex-row items-center h-full">
                {/* Date */}
                <div className="flex flex-col items-center justify-center w-full md:w-24 py-4 md:py-0 bg-elevate/50 h-full border-r border-border group-hover:border-red-primary/20 transition-colors">
                    <span className="text-3xl font-bold text-white">{date.day}</span>
                    <span className="text-[10px] font-bold text-red-primary uppercase">{date.month} {date.year}</span>
                </div>

                {/* Match Info */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-center gap-2 w-24">
                            <Image src={homeTeam.logo} alt={homeTeam.name} width={40} height={40} className="h-10 w-10 object-contain" />
                            <span className="text-[10px] font-medium text-text-secondary text-center">{homeTeam.name}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold text-text-secondary">VS</span>
                            <span className="text-xs text-text-secondary">{venue}</span>
                            <span className="text-xs text-text-secondary">{time}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-24">
                            <Image src={awayTeam.logo} alt={awayTeam.name} width={40} height={40} className="h-10 w-10 object-contain" />
                            <span className="text-[10px] font-medium text-text-secondary text-center">{awayTeam.name}</span>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col items-center md:items-end gap-2 min-w-[120px]">
                        <span className="text-xs text-text-secondary">From <span className="text-white font-bold">${price}</span></span>
                        <Button asChild className="bg-red-primary hover:bg-red-hover rounded-xl h-9 px-6 shadow-[0_4px_20px_-2px_rgba(230,57,70,0.25)]">
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
