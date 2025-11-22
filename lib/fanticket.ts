// @ts-nocheck
import { decodeEventLog } from 'viem';

type CreateMatchArgs = {
  fanTicket: any;
  fanToken: any;
  numReservations: bigint;
  requiredStake: bigint;
  reservationDeadline: bigint;
  reservationDuration: bigint;
  publicClient: any;     // tipalo bien si querés
};

export async function createMatchAndGetId({
  fanTicket,
  fanToken,
  numReservations,
  requiredStake,
  reservationDeadline,
  reservationDuration,
	publicClient,
}: CreateMatchArgs): Promise<BigInt> {
  // 1. Ejecutar la transacción
  const txHash = await fanTicket.write.createMatch([fanToken.address, numReservations, requiredStake, reservationDeadline, reservationDuration]);

  // 2. Esperar a que mine la transacción
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  // 3. Buscar y decodificar el evento MatchCreated
  for (const log of receipt.logs) {
		console.log(log);
    try {
      const parsed = decodeEventLog({
        abi: fanTicket.abi,
        data: log.data,
        topics: log.topics,
      });

			console.log(parsed);
      if (parsed.eventName === "MatchCreated") {
        const matchId = parsed.args.matchId; // args.matchId también sirve
        return matchId; // bigint
      }
    } catch {}
  }

  throw new Error("MatchCreated event not found");
}