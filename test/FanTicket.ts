import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("FanTicket", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("Should be able to create a match", async function () {
    const supply = 1000n;
    const fanToken = await viem.deployContract("FanTokenTest", [supply]);
    const fanTicket = await viem.deployContract("FanTicket");

    const reservationDeadline = BigInt(Math.round(7 * 60 * 60 * 24 + Date.now()/1000)); //1 week
    const duration = BigInt(Math.round(60 * 60 + Date.now()/1000)); // 1 hour
    const numSeats = 10n;
    const minStake = 100n;

    //uint256 numReservations, uint256 requiredStake, uint256 reservationDeadline, uint256 reservationDuration
    const matchId = await fanTicket.write.createMatch([fanToken.address, numSeats, minStake, reservationDeadline, duration]);
    console.log('MatchId: ' + matchId);
  });
});
