"use client";

import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { value: 100 },
    { value: 120 },
    { value: 110 },
    { value: 140 },
    { value: 130 },
    { value: 160 },
    { value: 150 },
    { value: 180 },
    { value: 170 },
    { value: 190 },
    { value: 210 },
    { value: 200 },
    { value: 230 },
];

export function WalletCard() {
    return (
        <Card className="bg-surface-card border-border relative overflow-hidden">
            <div className="absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-red-primary/10 to-transparent blur-2xl" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Fan Wallet
                </CardTitle>
                <Wallet className="h-4 w-4 text-red-primary" />
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <div className="text-3xl font-bold text-white">$150.00</div>
                    <div className="text-sm text-text-secondary">Available</div>
                </div>

                <div className="h-[60px] w-full -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F1F1F', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#2E2E2E' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#E63946"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
