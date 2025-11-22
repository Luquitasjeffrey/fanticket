export interface Team {
    name: string;
    logo: string;
  }
export interface FixtureDate {
    day: string;
    month: string;
    year: string;
  }

export interface Fixture {
    id: string;
    date: FixtureDate;
    homeTeam: Team;
    awayTeam: Team;
    time: string;
    venue: string;
    price: string | number;
  }