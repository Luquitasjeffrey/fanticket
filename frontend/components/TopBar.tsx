"use client";

import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
    return (
        <div className="flex items-center justify-between py-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, Alex.</h1>
                <p className="text-text-secondary mt-1">Ready for the next big match?</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-[320px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                    <Input
                        placeholder="Search matches, teams, or venues..."
                        className="bg-elevate border-border text-white pl-10 h-12 rounded-xl focus-visible:ring-red-primary/50"
                    />
                </div>

                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-border bg-elevate hover:bg-elevate/80 hover:text-white relative">
                    <Bell className="h-5 w-5 text-text-secondary" />
                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-primary" />
                </Button>

                <Button className="h-12 px-6 rounded-xl bg-transparent border border-red-primary text-red-primary hover:bg-red-primary hover:text-white transition-all">
                    Add Funds
                </Button>
            </div>
        </div>
    );
}
