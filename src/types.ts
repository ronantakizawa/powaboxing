export interface Punch {
    id: string;
    timestamp: number;
    starRating: number;
    acceleration: number;
    speed: number;
    inTime: number;
    outTime: number;
    distance: number;
    hand: number;
    fistType: string;
  }
  
export interface JsonData {
    version: number;
    punches: Punch[];
  }
  
  export interface Statistics {
    avgStarRating: number;
    avgAcceleration: number;
    avgSpeed: number;
    avgDistance: number;
    modeHand: number;
    modePunchType: string;
  }
  export interface StatisticProps {
    title: string;
    value: number | string;
  }
  
  export interface ScrapedData {
    starRating: number;
    acceleration: number;
    speed: number;
    distance: number;
    hands: number[];
    fistTypes: string[];
  }

  export interface AggregateStatistics {
    aggregatedStats: Statistics;
    starArray: number[];
    speedArray: number[];
    accelerationArray: number[];
    distanceArray: number[];
    handArray: number[];
    fistTypeArray: string[];
  }