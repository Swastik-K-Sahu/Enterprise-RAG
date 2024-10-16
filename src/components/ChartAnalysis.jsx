import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

// Data for Visualization
const data = [
  { name: '2018', uv: 265595 },
  { name: '2019', uv: 260174 },
  { name: '2020', uv: 274515 },
  { name: '2021', uv: 365817 },
  { name: '2022', uv: 394328 },
];

const ChartAnalysis = ({ onClose, message}) => {
  const [isLoading, setIsLoading] = useState(true);  
  const [insightMessage, setInsightMessage] = useState('');  

  useEffect(() => {
    if (message) {
      setInsightMessage(message);
      setIsLoading(false);  
    }
  }, [message]);

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex relative">
        
        <div className="w-2/3">
          <ResponsiveContainer width="90%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
   
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
    </defs>
    
    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />

    <XAxis 
      dataKey="name" 
      tick={{ fill: '#555', fontSize: 12 }} 
      axisLine={{ stroke: '#cccccc' }} 
      tickLine={false} 
    />
    <YAxis 
      tick={{ fill: '#555', fontSize: 12 }} 
      axisLine={{ stroke: '#cccccc' }} 
      tickLine={false} 
    />

    <Tooltip
      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #d3d3d3', borderRadius: '5px' }}
      labelStyle={{ color: '#666', fontWeight: 'bold' }}
      itemStyle={{ color: '#8884d8' }}
      cursor={{ stroke: 'rgba(136, 132, 216, 0.5)', strokeWidth: 2 }}
    />

    <Line
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      strokeWidth={2}
      dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
      activeDot={{ r: 8 }}
      animationBegin={0}
      animationDuration={1500}
    />
  </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-2/3 p-4">
          <h2 className="text-xl font-bold">AI Insights</h2>
          <p className="text-gray-600">
            {isLoading ? 'Loading insights...' : insightMessage}  
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-white bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center focus:outline-none hover:bg-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ChartAnalysis;
