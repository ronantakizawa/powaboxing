import React, { useState,useCallback } from 'react';
import { Statistics, StatisticProps,calculateStatistics, validateJson, Punch } from './datahandler';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FileUpload: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [timestamps, setTimestamps] = useState<Array<{ speed: number, distance: number, acceleration: number, timestamp: string, fistType:string }>>([]);

  const processJsonData = (json: any) => {
    if (validateJson(json)) {
      const statistics = calculateStatistics(json.punches);
      setStats(statistics);
      setIsValidJson(true);
      const timestampData = json.punches.map((punch: Punch) => ({
        speed: punch.speed,
        distance:punch.distance,
        acceleration:punch.acceleration,
        timestamp: punch.timestamp.toString(),
        fistType: punch.fistType.toString()
    }));
    setTimestamps(timestampData)
    console.log(timestamps)
    } else {
      setIsValidJson(false);
    }
  };

  const handleExampleClick = useCallback(async () => {
    try {
      const response = await fetch('/example.json');
      const json = await response.json();
      processJsonData(json);
    } catch (error) {
      console.error('Error fetching example:', error);
      setIsValidJson(false);
    }
  }, []);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          processJsonData(json);
        } catch (error) {
          console.error('Error processing file:', error);
          setIsValidJson(false);
        }
      }
    }
  }, []);

  const data = timestamps.map(item => ({
    name: item.timestamp,
    speed: item.speed,
    acceleration: item.acceleration,
    distance:item.distance,
    fistType:item.fistType

  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-gray-700 p-2 rounded text-white">
          <p className="intro">{`Speed: ${payload[0].payload.speed}`}</p>
          <p className="intro">{`Acceleration: ${payload[0].payload.acceleration}`}</p>
          <p className="intro">{`Distance: ${payload[0].payload.distance}`}</p>
          <p className="intro">{`Fist Type: ${payload[0].payload.fistType}`}</p>
        </div>
      );
    }
  
    return null;
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
          <><div className="p-4 bg-gray-800 shadow rounded-lg mb-10">
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
                  <div className="chart-container space-y-4">
                    <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold text-white mb-2 text-center">Speed Performance </h2>
                    <LineChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                    <Legend />
                    <Line type="monotone" dataKey="speed" stroke="#FFA500" />
                    </LineChart>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold text-white mb-2 text-center">Acceleration Performance </h2>
                    <LineChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                    <Legend />
                    <Line type="monotone" dataKey="acceleration" stroke="#FFA500" />
                    </LineChart>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold text-white mb-2 text-center">Distance Performance </h2>
                    <LineChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                    <Legend />
                    <Line type="monotone" dataKey="distance" stroke="#FFA500" />
                    </LineChart>
                    </div>
                </div>
                  
                  
                  
                  
                  
            </>
        )
      ) : (
        <div className="text-red-500 mt-2">Invalid POWA Boxing Data</div>
      )}
    </div>
  );
};

  
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
