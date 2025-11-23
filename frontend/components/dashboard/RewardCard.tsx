"use client";

import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RewardCard() {
    return (
        <Card className="bg-surface-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="paragraph-18-semibold text-secondary-white uppercase tracking-wider">
                    Reward Status
                </CardTitle>
                <Award className="h-8 w-8 text-red-primary" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="text-3xl font-bold text-white mb-2">Gold Member</div>
                    <div className="h-2 w-20 bg-red-primary rounded-full" />
                </div>

                <div className="space-y-2">
                    <Progress value={62.5} className="h-2 bg-elevate" indicatorClassName="bg-red-primary" />
                    <div className="text-xs text-secondary-white">
                        <span className="text-white font-medium">1,250</span> / 2,000 Points to Platinum
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
