import { JsonData, Statistics, AggregateStatistics, Punch, ScrapedData } from "./types";

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
  
  export const calculateStatistics = (jsonData: JsonData): Statistics | undefined => {
    if (validateJson(jsonData)){
    const total = jsonData.punches.reduce<ScrapedData>(
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

    const length = jsonData.punches.length;
    return {
      avgStarRating: total.starRating / length,
      avgAcceleration: total.acceleration / length,
      avgSpeed: total.speed / length,
      avgDistance: total.distance / length,
      modeHand: calculateMode(total.hands) as number,
      modePunchType: calculateMode(total.fistTypes) as string,
    };
  }
  else{
    return undefined;
  }
  };

  export const calculateAggregateStatistics = (jsonDataArray: JsonData[]): AggregateStatistics => {
    const starArray = [];
    const speedArray = [];
    const accelerationArray = [];
    const distanceArray = [];
    const handArray = [];
    const fistTypeArray = [];
  
    for (const jsonData of jsonDataArray) {
      if (validateJson(jsonData)) {
        const statistics = calculateStatistics(jsonData);
        if (statistics){
          starArray.push(statistics.avgStarRating);
          speedArray.push(statistics.avgSpeed);
          accelerationArray.push(statistics.avgAcceleration);
          distanceArray.push(statistics.avgDistance);
          handArray.push(statistics.modeHand);
          fistTypeArray.push(statistics.modePunchType);
        }
      }
    }
  
    // Calculate averages and modes
    const starAverage = starArray.reduce((a, b) => a + b, 0) / starArray.length;
    const speedAverage = speedArray.reduce((a, b) => a + b, 0) / speedArray.length;
    const accelerationAverage = accelerationArray.reduce((a, b) => a + b, 0) / accelerationArray.length;
    const distanceAverage = distanceArray.reduce((a, b) => a + b, 0) / distanceArray.length;
    const handMode = calculateMode(handArray);
    const punchMode = calculateMode(fistTypeArray);
  
    return {
      aggregatedStats: {
        avgStarRating: starAverage,
        avgAcceleration: accelerationAverage,
        avgSpeed: speedAverage,
        avgDistance: distanceAverage,
        modeHand: handMode as number,
        modePunchType: punchMode as string,
      },
      starArray,
      speedArray,
      accelerationArray,
      distanceArray,
      handArray,
      fistTypeArray
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

  export const formatTime = (milliseconds:number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    let hours : string | number = Math.floor(totalSeconds / 3600);
    let minutes : string | number = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds : string | number = totalSeconds - (hours * 3600) - (minutes * 60);
  
    // Padding each value with leading zero if needed
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
  