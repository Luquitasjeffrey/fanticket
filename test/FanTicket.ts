import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { createMatchAndGetId } from "../lib/fanticket.js";

describe("FanTicket", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("Should be able to create a match", async function () {
    const supply = 1000n;
    const fanToken = await viem.deployContract("FanTokenTest", [supply]);
    const fanTicket = await viem.deployContract("FanTicket");

    const reservationDeadline = BigInt(Math.round(7 * 60 * 60 * 24 + Date.now()/1000)); //1 week
    const duration = BigInt(Math.round(60 * 60 + Date.now()/1000)); // 1 hour
    const numReservations = 10n;
    const minStake = 100n;

		const matchId = await createMatchAndGetId({
			fanTicket,
			fanToken,
			requiredStake: minStake,
			reservationDeadline,
			reservationDuration: duration,
			numReservations,
			publicClient
		});

		console.log('MatchId: ' + matchId);
    console.log('FanTicket address: ' + fanTicket.address);
    console.log('owner: ' + await fanTicket.read.owner());
		assert.ok(matchId, 'Match id should be truthy and should be not 0');
  });
});
