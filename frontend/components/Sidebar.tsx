"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Compass,
    Ticket,
    Wallet,
    Gift,
    Settings,
    HelpCircle,
    LogOut,
    type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logoFanticket from "@/public/icons/fanticket-logo.svg"

interface MenuItem {
    icon: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
    badge?: number;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

const menuItems: MenuSection[] = [
    {
        title: "MAIN MENU",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
            // { icon: Compass, label: "Discover Matches", href: "/discover" },
            // { icon: Ticket, label: "Season Passes", href: "/season-passes" },
        ]
    },
    {
        title: "MY FAN ZONE",
        items: [
            { icon: Ticket, label: "My Tickets", href: "/my-tickets", badge: 1 },
            { icon: Wallet, label: "Wallet & Credits", href: "/wallet" },
            { icon: Gift, label: "Rewards Program", href: "/rewards" },
        ]
    }
];

const bottomItems: MenuItem[] = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help Center", href: "/help" },
];

export function Sidebar() {
    return (
        <div className="flex h-screen w-[280px] flex-col bg-surface-card text-white border-r border-border p-6 fixed left-0 top-0">
            {/* Logo */}
            <div className="mb-10 flex items-end justify-center gap-2 px-2">
                <Image src={logoFanticket} alt="logo fanticket" width={48} height={48} />
                <h1 className="text-32 font-semibold text-main-white tracking-tight">Fan<span className="text-red-primary">Ticket</span></h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-8">
                {menuItems.map((section, idx) => (
                    <div key={idx}>
                        {section.title && (
                            <h3 className="mb-4 px-4 text-14 font-semibold text-secondary-white/65 uppercase tracking-wider">
                                {section.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between rounded-xl px-4 py-3 text-18 font-medium transition-colors",
                                        item.active
                                            ? "bg-red-primary/10 text-red-primary"
                                            : "text-secondary-white hover:bg-elevate hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("h-5 w-5", item.active ? "text-red-primary" : "text-secondary-white")} />
                                        <span className="text-18 font-medium">{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-primary text-10 font-bold text-main-white">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-6">
                <div className="space-y-1">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-18 font-medium text-secondary-white transition-colors hover:bg-elevate hover:text-white"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="h-px w-full bg-border" />

                {/* User Profile or Wallet */}
                {/* <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src="/avatar.png" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">Alex Johnson</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
