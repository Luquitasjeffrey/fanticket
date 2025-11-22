// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FanTicket is Ownable {
    enum ReservationStatus {
        Available,
        Reserved,
        Paid
    }

    struct Reservation {
        uint256 reservationId; 
        address reservedBy;
        // Stores the timestamp at which the reservation was reserved
        uint256 reservedAt;
        ReservationStatus status;
    }

    struct MatchData {
        uint256 matchId;
        uint256 requiredStake;
        bool finished;
        IERC20 fanToken;
        // You can only attempt to reserve a reservation for a match until a certain date, after that the reservation will be reverted
        uint256 reservationDeadline;
        uint256 reservationDuration;
        Reservation[] reservations;
    }

    event MatchCreated(uint256 matchId);
    event ReservationReserved(uint256 matchId, uint256 reservationId);
    event ReservationCanceled(uint256 matchId, uint256 reservationId);
    event ReservationExpired(uint256 matchId, uint256 reservationId);
    event ReservationConfirmed(uint256 matchId, uint256 reservationId);

    uint256 public nextMatchId = 1;
    mapping(uint256 => MatchData) public matchs;

    // user → array de (matchId,reservationId) packed
    mapping(address => uint256[]) public userReservations;

    // user → matchId → total stake bloqueado por partido (no solo por reservation)
    mapping(address => mapping(uint256 => uint256)) public userStakeForMatch;

    constructor() Ownable(msg.sender) {
    }

    // --- Match creation ---
    function createMatch(address fanToken, uint256 numReservations, uint256 requiredStake, uint256 reservationDeadline, uint256 reservationDuration) external onlyOwner {
        require(numReservations > 0, "numReservations must > 0");

        uint256 matchId = nextMatchId;
        MatchData storage ev = matchs[matchId];
        ev.matchId = nextMatchId;
        ev.requiredStake = requiredStake;
        ev.reservationDeadline = reservationDeadline;
        ev.reservationDuration = reservationDuration;
        ev.fanToken = IERC20(fanToken);

        for (uint256 i = 0; i < numReservations; i++) {
            ev.reservations.push(
                Reservation({
                    reservationId: i,
                    reservedBy: address(0),
                    status: ReservationStatus.Available,
                    reservedAt: block.timestamp
                })
            );
        }

        nextMatchId++;

        emit MatchCreated(matchId);
    }

    // --- Reserve a seat for the match ---
    function reserve(uint256 matchId, uint256 reservationId) external {
        MatchData storage ev = matchs[matchId];
        require(!ev.finished, "match finished");
        require(reservationId < ev.reservations.length, "invalid reservationId");

        Reservation storage t = ev.reservations[reservationId];
        require(t.status == ReservationStatus.Available, "not available");

        // Stake fan tokens
        ev.fanToken.transferFrom(msg.sender, address(this), ev.requiredStake);
        userStakeForMatch[msg.sender][matchId] += ev.requiredStake;

        t.status = ReservationStatus.Reserved;
        t.reservedBy = msg.sender;

        // pack matchId and reservationId in one uint256
        uint256 packed = (matchId << 128) | reservationId;
        userReservations[msg.sender].push(packed);
    }

    function cancelIfExpired(uint256 matchId, uint256 reservationId) external {
        MatchData storage ev = matchs[matchId];
        require(reservationId < ev.reservations.length, "invalid reservationId");

        Reservation storage r = ev.reservations[reservationId];
        require(r.status == ReservationStatus.Reserved, "not reserved");
        require(r.reservedAt + ev.reservationDuration > block.timestamp, "You can only cancel a reservation if it is expired");
        
        // Refund stake
        ev.fanToken.transfer(msg.sender, ev.requiredStake);
        userStakeForMatch[msg.sender][matchId] -= ev.requiredStake;

        r.status = ReservationStatus.Available;
        r.reservedBy = address(0);

        emit ReservationExpired(matchId, reservationId);
    }

    // TODO: Penalizar cancelacion
    // --- Cancel reservation before payment ---
    function cancel(uint256 matchId, uint256 reservationId) external {
        MatchData storage ev = matchs[matchId];
        require(reservationId < ev.reservations.length, "invalid reservationId");

        Reservation storage t = ev.reservations[reservationId];
        require(t.status == ReservationStatus.Reserved, "not reserved");
        require(t.reservedBy == msg.sender, "not yours");

        // Refund stake
        ev.fanToken.transfer(msg.sender, ev.requiredStake);
        userStakeForMatch[msg.sender][matchId] -= ev.requiredStake;

        t.status = ReservationStatus.Available;
        t.reservedBy = address(0);

        emit ReservationCanceled(matchId, reservationId);
    }

    // --- Mark reservation as paid (admin/DAO) ---
    function markPaid(uint256 matchId, uint256 reservationId) external onlyOwner {
        MatchData storage ev = matchs[matchId];
        require(reservationId < ev.reservations.length, "invalid reservationId");

        Reservation storage t = ev.reservations[reservationId];
        require(t.status == ReservationStatus.Reserved, "must be reserved first");

        t.status = ReservationStatus.Paid;

        emit ReservationConfirmed(matchId, reservationId);
    }

    // --- Finish match and allow stake withdrawal ---
    function finishMatch(uint256 matchId) external onlyOwner {
        matchs[matchId].finished = true;
    }

    // --- User withdraws stake after match ends ---
    function withdrawStake(uint256 matchId) external {
        MatchData storage ev = matchs[matchId];
        require(ev.finished, "match not finished");

        uint256 amount = userStakeForMatch[msg.sender][matchId];
        require(amount > 0, "nothing to withdraw");

        userStakeForMatch[msg.sender][matchId] = 0;
        ev.fanToken.transfer(msg.sender, amount);
    }

    // Anyone can call this function, when it is called the stake is returned to the user
    function withdrawStakeOf(address user, uint256 matchId) external {
        MatchData storage ev = matchs[matchId];
        require(ev.finished, "match not finished");

        uint256 amount = userStakeForMatch[user][matchId];
        require(amount > 0, "nothing to withdraw");

        userStakeForMatch[user][matchId] = 0;
        ev.fanToken.transfer(user, amount);
    }

    // --- View Helpers ---
    function hasReserved(address user, uint256 matchId, uint256 reservationId) external view returns (bool) {
        MatchData storage ev = matchs[matchId];
        require(reservationId < ev.reservations.length, "invalid reservationId");
        return ev.reservations[reservationId].reservedBy == user;
    }

    function myReservations(address user) external view returns (uint256[] memory) {
        return userReservations[user];
    }
}
