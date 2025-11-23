"use client";

import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RewardCard() {
    return (
        <Card className="bg-surface-card border-border flex-start-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 w-full">
                <CardTitle className="paragraph-18-semibold text-secondary-white uppercase tracking-wider">
                    Reward Status
                </CardTitle>
                <Award className="h-8 w-8 text-red-primary" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="h2-medium text-main-white mb-3">Gold Member</div>
                </div>

                <div className="space-y-2">
                    <Progress value={62.5} className="h-2 bg-elevate" indicatorClassName="bg-red-primary" />
                    <div className=" paragraph-14 font-medium text-secondary-white">
                        <span className="text-white paragraph-14 font-medium">1,250</span> / 2,000 Points to Platinum
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
