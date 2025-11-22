"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CountdownCard() {
    return (
        <Card className="bg-surface-card border-border overflow-hidden relative group">
            {/* Glow effect */}
            <div className="absolute -left-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-red-primary/10 blur-[50px] group-hover:bg-red-primary/20 transition-all" />

            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Next Match Countdown
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/images/barca-logo.png" alt="FC Barcelona" width={24} height={24} className="h-6 w-6 object-contain" />
                        <span className="text-sm font-medium text-white">FC Barcelona</span>
                    </div>
                    <span className="text-xs text-text-secondary">vs</span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white">Atlético de Madrid</span>
                        <Image src="/images/atm-logo.png" alt="Atlético de Madrid" width={24} height={24} className="h-6 w-6 object-contain" />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-red-primary tabular-nums">04</span>
                        <span className="text-[10px] text-text-secondary uppercase">d</span>
                    </div>
                    <span className="text-xl font-bold text-text-secondary pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-red-primary tabular-nums">12</span>
                        <span className="text-[10px] text-text-secondary uppercase">h</span>
                    </div>
                    <span className="text-xl font-bold text-text-secondary pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-red-primary tabular-nums">45</span>
                        <span className="text-[10px] text-text-secondary uppercase">m</span>
                    </div>
                    <span className="text-xl font-bold text-text-secondary pb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-red-primary tabular-nums">18</span>
                        <span className="text-[10px] text-text-secondary uppercase">s</span>
                    </div>
                </div>

                <Button className="w-full bg-red-primary hover:bg-red-hover text-white font-semibold rounded-xl h-10 shadow-[0_4px_20px_-2px_rgba(230,57,70,0.25)]">
                    View Ticket
                </Button>
            </CardContent>
        </Card>
    );
}
