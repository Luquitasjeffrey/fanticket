"use client";

import { Wallet } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Tu data original
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

const chartConfig = {
  value: {
    label: "Balance",
    color: "#E63946",
  },
} satisfies ChartConfig;

export function WalletCard() {
  return (
    <Card className="bg-surface-card border-border relative overflow-hidden shadow-md">
      <div className="absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-red-primary/10 to-transparent blur-2xl pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="paragraph-18-semibold text-secondary-white uppercase tracking-wider">
          Fan Wallet
        </CardTitle>
        <Wallet className="h-8 w-8 text-[#E63946]" />
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="subtitle-semibold text-main-white">
            $250.00
          </div>
          <div className="paragraph-18-medium text-secondary-white  opacity-80">
            Available
          </div>
        </div>

        {/* Line graph */}
        <div className="h-[13.6rem] w-full -ml-2">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{
                left: 0,
                right: 0,
                top: 5,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>
              
              <XAxis dataKey="value" hide /> 
              
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="!text-14 font-medium text-main-whitepx-[0.8rem] py-[0.2rem] gap-[0.4rem]" hideLabel />}
              />
              
              <Area
                dataKey="value"
                type="monotone"
                fill="url(#fillValue)"
                stroke="var(--color-value)"
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}