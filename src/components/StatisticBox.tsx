
import React from 'react';
import Statistic from "./Statistic";

type StatisticsProps = {
  stats: {
    avgStarRating: number;
    avgAcceleration: number;
    avgSpeed: number;
    avgDistance: number;
    modeHand: number;
    modePunchType: string;
  };
};

const StatisticBox: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="p-4 bg-gray-800 shadow rounded-lg mb-10">
      <div className="font-bold text-xl mb-2 text-white">Statistics</div>
      <div className="grid grid-cols-2 gap-4">
        <Statistic title="Average Star Rating ⭐️" value={stats.avgStarRating} />
        <Statistic title="Average Acceleration" value={stats.avgAcceleration.toFixed(2) +" Gs"} />
        <Statistic title="Average Speed" value={stats.avgSpeed.toFixed(2) + " km/h"} />
        <Statistic title="Average Distance" value={stats.avgDistance.toFixed(2) + " m" }/>
        <Statistic title="Most Common Hand" value={stats.modeHand === 0 ? "Left Hand" : "Right Hand"} />
        <Statistic title="Most Common Punch Type" value={stats.modePunchType} />
      </div>
    </div>
  );
};

export default StatisticBox;
