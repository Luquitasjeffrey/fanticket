// @ts-nocheck
"use client";

import * as fanticket from "@/lib/fanticket";
import * as utils from "@/lib/utils";
import * as walletconfig from "@/lib/walletconfig";

export function GlobalExpose() {
  // Exponés lo que vos quieras
  if (typeof window !== "undefined") {
    window.fanticket = fanticket;
    window.utils = utils;
    window.walletconfig = walletconfig;
  }
  return null;
}