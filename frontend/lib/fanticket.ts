// @ts-nocheck
// fanticket.ts
import {
  createPublicClient,
  custom,
  http
} from "viem";

import {config, network, getConnectedWallet, FAN_TICKET_ADDRESS} from "@/lib/walletconfig";

export const publicClient = createPublicClient({
  chain: network,
  transport: http("http://127.0.0.1:8545")  // RPC local
});

// ===============================
// TYPES
// ===============================
export enum ReservationStatus {
  Available = 0,
  Reserved = 1,
  Paid = 2,
}

export interface Reservation {
  reservationId: bigint;
  reservedBy: Address;
  reservedAt: bigint;
  status: ReservationStatus;
}

export interface MatchData {
  matchId: bigint;
  requiredStake: bigint;
  finished: boolean;
  fanToken: Address;
  reservationDeadline: bigint;
  reservationDuration: bigint;
  reservations: Reservation[];
}

// ===============================
// ABI COMPLETO
// ===============================
export const FanTicketAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"matchId","type":"uint256"}],"name":"MatchCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"matchId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"ReservationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"matchId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"ReservationConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"matchId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"ReservationExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"matchId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"ReservationReserved","type":"event"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"cancel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"cancelIfExpired","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"fanToken","type":"address"},{"internalType":"uint256","name":"numReservations","type":"uint256"},{"internalType":"uint256","name":"requiredStake","type":"uint256"},{"internalType":"uint256","name":"reservationDeadline","type":"uint256"},{"internalType":"uint256","name":"reservationDuration","type":"uint256"}],"name":"createMatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"}],"name":"finishMatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"hasReserved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"markPaid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"matchs","outputs":[{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"requiredStake","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"},{"internalType":"contract IERC20","name":"fanToken","type":"address"},{"internalType":"uint256","name":"reservationDeadline","type":"uint256"},{"internalType":"uint256","name":"reservationDuration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"myReservations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextMatchId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"},{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"reserve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userReservations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userStakeForMatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"matchId","type":"uint256"}],"name":"withdrawStake","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;

// ===============================
// READ FUNCTIONS
// ===============================

export async function getOwner(): Promise<Address> {
  return await publicClient.readContract({
    address: FAN_TICKET_ADDRESS,
    abi: FanTicketAbi,
    functionName: "owner",
  });
}

export async function hasReserved(
  user: Address,
  matchId: bigint,
  reservationId: bigint
): Promise<boolean> {
  return await publicClient.readContract({
    address: FAN_TICKET_ADDRESS,
    abi: FanTicketAbi,
    functionName: "hasReserved",
    args: [user, matchId, reservationId],
  });
}

export async function myReservations(user: Address): Promise<bigint[]> {
  const ret = await publicClient.readContract({
    address: FAN_TICKET_ADDRESS,
    abi: FanTicketAbi,
    functionName: "myReservations",
    args: [user],
  });
  return [...ret];
}

// ===============================
// WRITE FUNCTIONS
// ===============================
async function writeTx(
  walletClient: ReturnType<typeof getConnectedWallet>,
  fn: string,
  args: any[]
) {
  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    account,
    address: FAN_TICKET_ADDRESS,
    abi: FanTicketAbi,
    functionName: fn,
    args: args
  });
}

export async function createMatch(
  walletClient: ReturnType<typeof getConnectedWallet>,
  token: Address,
  num: bigint,
  stake: bigint,
  deadline: bigint,
  duration: bigint
) {
  return await writeTx(walletClient, "createMatch", [
    token,
    num,
    stake,
    deadline,
    duration,
  ]);
}

export async function reserve(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint,
  reservationId: bigint
) {
  return await writeTx(walletClient, "reserve", [matchId, reservationId]);
}

export async function cancel(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint,
  reservationId: bigint
) {
  return await writeTx(walletClient, "cancel", [matchId, reservationId]);
}

export async function cancelIfExpired(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint,
  reservationId: bigint
) {
  return await writeTx(walletClient, "cancelIfExpired", [matchId, reservationId]);
}

export async function markPaid(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint,
  reservationId: bigint
) {
  return await writeTx(walletClient, "markPaid", [matchId, reservationId]);
}

export async function finishMatch(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint
) {
  return await writeTx(walletClient, "finishMatch", [matchId]);
}

export async function withdrawStake(
  walletClient: ReturnType<typeof getConnectedWallet>,
  matchId: bigint
) {
  return await writeTx(walletClient, "withdrawStake", [matchId]);
}

// ===============================
// UTILS
// ===============================

// pack = (matchId << 128) | reservationId
export function unpackReservation(packed: bigint) {
  return {
    matchId: packed >> 128n,
    reservationId: packed & ((1n << 128n) - 1n),
  };
}

// ===============================
// CHECK IF CURRENT USER IS OWNER
// ===============================
export async function isOwner(
  walletClient: ReturnType<typeof getConnectedWallet>
): Promise<boolean> {
  const [user] = await walletClient.getAddresses();
  const owner = await getOwner();
  return user.toLowerCase() === owner.toLowerCase();
}
