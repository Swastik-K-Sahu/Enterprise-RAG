import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const ChartCard = ({ title, onClick , data}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8" onClick={onClick}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="80%">
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
  );
};

export default ChartCard;
