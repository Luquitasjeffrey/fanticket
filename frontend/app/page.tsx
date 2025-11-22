"use client";

import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black-base font-inter">
      <Sidebar />

      <main className="pl-[28rem]">
        <div className="container-wrapper py-6 space-y-[4.8rem] px-[6.4rem]">
          <TopBar />
        </div>
      </main>
    </div>
  );
}
