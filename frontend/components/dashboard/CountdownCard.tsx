"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CountdownCard() {
    return (
        <Card className="bg-surface-card border-border overflow-hidden relative group">

            <CardHeader>
                <CardTitle className="paragraph-18-semibold text-secondary-white uppercase tracking-wider">
                    Next Match Countdown
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between w-full h-fit">
                    <div className="flex flex-col items-center justify-center gap-[1.2rem] w-fit h-auto">
                        <div className="w-full flex-center">

                            <Image src="/images/barca-logo.png" alt="FC Barcelona" width={32} height={32} className="h-8 w-8 object-contain" />
                        </div>
                        <span className="paragraph-18-medium text-main-white">FC Barcelona</span>
                    </div>
                    <span className="paragraph-24-semibold text-secondary-white">vs</span>
                    <div className="flex flex-col items-center justify-cente gap-3 w-fit h-auto">
                        <div className="w-full flex-center">

                            <Image src="/images/atm-logo.png" alt="Atlético de Madrid" width={32} height={32} className="h-8 w-8 object-contain" />
                        </div>
                        <span className="paragraph-18-medium text-main-white">Atlético de Madrid</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-center">
                    <div className="flex flex-col items-center">
                        <span className="paragraph-24-semibold font-bold text-red-primary tabular-nums">04</span>
                        <span className="paragraph-10 text-secondary-white uppercase">d</span>
                    </div>
                    <span className="text-xl font-bold text-secondary-white pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="paragraph-24-semibold font-bold text-red-primary tabular-nums">12</span>
                        <span className="paragraph-10 text-secondary-white uppercase">h</span>
                    </div>
                    <span className="text-xl font-bold text-secondary-white pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="paragraph-24-semibold font-bold text-red-primary tabular-nums">45</span>
                        <span className="paragraph-10 text-secondary-white uppercase">m</span>
                    </div>
                    <span className="text-xl font-bold text-secondary-white pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="paragraph-24-semibold font-bold text-red-primary tabular-nums">18</span>
                        <span className="paragraph-10 text-secondary-white uppercase">s</span>
                    </div>
                </div>

                <Button className="w-full bg-red-primary hover:bg-red-hover text-main-white border-[0.5px] border-solid border-secondary-white paragraph-24-semibold rounded-lg py-[0.8rem] hover:cursor-pointer shadow-[0_4px_20px_-2px_rgba(230,57,70,0.25)]">
                    View Ticket
                </Button>
            </CardContent>
        </Card>
    );
}
