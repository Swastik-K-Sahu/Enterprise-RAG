import Cards from '../components/Cards';
import ChartCard from '../components/ChartCard';
import Chatbot from '../components/Chatbot';
import { useState } from 'react';
import ChartAnalysis from '../components/ChartAnalysis';
import { BsGraphUp, BsCurrencyDollar, BsPeople, BsCursor } from 'react-icons/bs';

// Data for Visualization
const revenueData = [
  { name: '2018', uv: 265595 },
  { name: '2019', uv: 260174 },
  { name: '2020', uv: 274515 },
  { name: '2021', uv: 365817 },
  { name: '2022', uv: 394328 },
];
const epsData = [
  { name: '2013', uv: 1.42 },
  { name: '2014', uv: 1.61 },
  { name: '2015', uv: 2.30 },
  { name: '2016', uv: 2.07 },
  { name: '2017', uv: 2.30 },
];
const netIncomeData = [
  { name: '2016', uv: 37037.0 },
  { name: '2017', uv: 39510.0 },
  { name: '2018', uv: 53394.0 },
  { name: '2019', uv: 45687.0 },
  { name: '2020', uv: 48351.0 },
];
const roeData = [
  { name: '2012', uv: 35.3041 },
  { name: '2013', uv: 29.9776 },
  { name: '2014', uv: 35.4201 },
  { name: '2015', uv: 44.7355 },
  { name: '2016', uv: 35.6237 },
];
const Dashboard = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [chartMessage, setChartMessage] = useState('');  
  const [isLoading,setIsLoading] = useState(false);

  const openPopup = async (title) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:5000/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: `Analyze the ${title} of AAPL and suggest insights` }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setIsLoading(false)
      setChartMessage(result.response);  
      setPopupOpen(true);  
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setIsLoading(false)
      setChartMessage('Failed to load data');  
      setPopupOpen(true);
    }
  };

  const closePopup = () => setPopupOpen(false);
  console.log(window.location)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6">Company Analytics Dashboard</h1> */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        <Cards title="Total Customers" count="10,234" Icon={BsPeople} />
        <Cards title="Revenue" count="$1,234,567" Icon={BsCurrencyDollar} />
        <Cards title="Active Sessions" count="567" Icon={BsCursor} />
        <Cards title="Monthly Growth" count="$9674" Icon={BsGraphUp} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
        <ChartCard title="Revenue" data={revenueData} onClick={() => openPopup('Revenue')} />
        <ChartCard title="Earning Per Share" data={epsData} onClick={() => openPopup('Earning Per Share')} />
        <ChartCard title="Net Income" data={netIncomeData} onClick={() => openPopup('Net Income')} />
        <ChartCard title="Return on Equity" data={roeData} onClick={() => openPopup('ROE')} />
      </div>

      {isPopupOpen && <ChartAnalysis onClose={closePopup} message={chartMessage} />}

      <div className="fixed bottom-5 right-5">
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
