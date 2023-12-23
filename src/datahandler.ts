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
  
  interface ScrapedData {
    starRating: number;
    acceleration: number;
    speed: number;
    distance: number;
    hands: number[];
    fistTypes: string[];
  }
  
  export const calculateMode = (array: number[] | string[]): number | string => {
    const frequencyMap: { [key: string]: number } = {};
    let maxFreq = 0;
    let mode: number | string = array[0];

    array.forEach(item => {
      const frequency = (frequencyMap[item.toString()] || 0) + 1;
      frequencyMap[item.toString()] = frequency;

      if (frequency > maxFreq) {
        maxFreq = frequency;
        mode = item;
      }
    });

    return mode;
  };
  
  export const calculateStatistics = (punches: Punch[]): Statistics => {
    const total = punches.reduce<ScrapedData>(
      (acc, punch) => {
        acc.starRating += punch.starRating;
        acc.acceleration += punch.acceleration;
        acc.speed += punch.speed;
        acc.distance += punch.distance;
        acc.hands.push(punch.hand);
        acc.fistTypes.push(punch.fistType);
        return acc;
      },
      { starRating: 0, acceleration: 0, speed: 0, distance: 0, hands: [], fistTypes: [] }
    );

    const length = punches.length;
    return {
      avgStarRating: total.starRating / length,
      avgAcceleration: total.acceleration / length,
      avgSpeed: total.speed / length,
      avgDistance: total.distance / length,
      modeHand: calculateMode(total.hands) as number,
      modePunchType: calculateMode(total.fistTypes) as string,
    };
  };
  
  export const validateJson = (json: JsonData): json is JsonData => {
    // Check if the JSON structure matches the specified format
    const isValid = typeof json === 'object' &&
      json !== null &&
      'version' in json &&
      'punches' in json &&
      Array.isArray(json.punches) &&
      json.punches.every((punch: Punch) => (
        typeof punch === 'object' &&
        punch !== null &&
        'id' in punch &&
        'timestamp' in punch &&
        'starRating' in punch &&
        'acceleration' in punch &&
        'speed' in punch &&
        'inTime' in punch &&
        'outTime' in punch &&
        'distance' in punch &&
        'hand' in punch &&
        'fistType' in punch
      ));
  
    return isValid;
  };
  