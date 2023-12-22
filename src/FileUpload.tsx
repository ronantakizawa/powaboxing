import React, { useState } from 'react';
import { Statistics, calculateStatistics, validateJson, Punch } from './datahandler';

const FileUpload: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isValidJson, setIsValidJson] = useState<boolean>(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      let allPunches: Punch[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const text = e.target?.result;
            const json = JSON.parse(text as string);
            if (validateJson(json)) {
              allPunches = allPunches.concat(json.punches);
              filesProcessed++;
              if (filesProcessed === files.length) {
                const statistics = calculateStatistics(allPunches);
                setStats(statistics);
                setIsValidJson(true);
              }
            } else {
              setIsValidJson(false);
            }
          } catch (error) {
            setIsValidJson(false);
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const handleExampleClick = async () => {
    try {
      const response = await fetch('/example.json');
      const json = await response.json();
      if (validateJson(json)) {
        const statistics = calculateStatistics(json.punches);
        setStats(statistics);
        setIsValidJson(true);
      } else {
        setIsValidJson(false);
      }
    } catch (error) {
      setIsValidJson(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-black text-white">
      <div className="flex items-center mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border file:border-gray-700
              file:text-white file:bg-gray-800 hover:file:bg-gray-700"
        />
        <button
          onClick={handleExampleClick}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
          See Example
        </button>
      </div>

      {isValidJson ? (
        stats && (
          <div className="p-4 bg-gray-800 shadow rounded-lg">
            <div className="font-bold text-xl mb-2 text-white">Statistics</div>
            <div className="grid grid-cols-2 gap-4">
              <Statistic title="Average Star Rating ⭐️" value={stats.avgStarRating} />
              <Statistic title="Average Acceleration" value={stats.avgAcceleration} />
              <Statistic title="Average Speed" value={stats.avgSpeed} />
              <Statistic title="Average Distance" value={stats.avgDistance} />
              <Statistic title="Most Common Hand" value={stats.modeHand === 0 ? "Left Hand" : "Right Hand"} />
              <Statistic title="Most Common Punch Type" value={stats.modePunchType} />
            </div>
          </div>
        )
      ) : (
        <div className="text-red-500 mt-2">Invalid POWA Boxing Data</div>
      )}
    </div>
  );
};

interface StatisticProps {
    title: string;
    value: number | string;
  }
  
  const Statistic: React.FC<StatisticProps> = ({ title, value }) => {
    // Function to render the value
    const renderValue = () => {
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
      return value;
    };
  
    return (
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="text-gray-400 text-sm font-medium">{title}</div>
          <div className="text-lg font-bold text-white">{renderValue()}</div>
        </div>
      );
    };

export default FileUpload;
