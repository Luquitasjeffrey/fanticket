// @ts-nocheck
import { network } from "hardhat";
import { createMatchAndGetId } from "../lib/fanticket.js";
import { parseEther } from "viem";

const { viem } = await network.connect();
const publicClient = await viem.getPublicClient();
const [senderClient] = await viem.getWalletClients();

async function main() {	
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
	console.log('FanTokenAddress: ' + await fanToken.address);
	console.log('owner: ' + await fanTicket.read.owner());

	if (process.env.FUNDING_ADDRESS) {
		const fundingAddress = process.env.FUNDING_ADDRESS;
		console.log("Funding address: " + fundingAddress);
		fanToken.write.transfer([fundingAddress, 500]);
		senderClient.sendTransaction({
  		to: fundingAddress,
  		value: parseEther('1'),
		});
	}
}

main()