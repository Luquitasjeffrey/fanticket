"use client";

import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export function TopBar() {
    const pathname = usePathname()

    if (pathname.includes("/settings")){
        return null
    }

    const isHome = pathname === "/";

    return (
        <div className="flex items-center justify-between py-6">
            <div className="flex-start-col gap-1">
                {isHome ? (
                    <>
                        <h1 className="h2-medium text-white">Welcome back, Alex.</h1>
                        <p className="text-secondary-white mt-1 text-18">Ready for the next big match?</p>
                    </>
                ) : (
                    <div />
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-[32rem] text-14">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-white hover:cursor-pointer" />
                    <Input
                        placeholder="Search matches, teams, or venues..."
                        className="bg-elevate border-border !text-main-white pl-10 placeholder:text-secondary-white h-12 text-14 rounded-xl focus-visible:ring-red-primary/50"
                    />
                </div>

                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-border bg-elevate hover:bg-elevate/80 hover:text-white relative group hover:cursor-pointer">
                    <Bell className="h-5 w-5 text-secondary-white group-hover:fill-secondary-white" />
                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-primary" />
                </Button>

                <Button className="h-12 px-6 rounded-xl bg-transparent border hover:cursor-pointer border-red-primary  hover:bg-red-primary  transition-all" asChild>
                    <span className="hover:text-main-white  text-18 font-medium text-red-primary">
                    Get Fan Tokens
                        </span>
                </Button>
            </div>
        </div>
    );
}
