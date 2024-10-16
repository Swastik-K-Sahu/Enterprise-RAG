import { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  const pathName = window.location.pathname;
  return (
    <header className="header bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold text-gray-800">{pathName==="/upload" ? "KnowlegdeBase" : "Dashboard"}</div>

      <div className="flex items-center space-x-6">
        <div className="text-lg text-gray-600">
          <div>{formatDate(currentTime)}</div>
          <div>{formatTime(currentTime)}</div>
        </div>

        <div className="avatar">
          <img
            src="/avatar.webp"
            alt="SKS"
            className="rounded-full w-10 h-10 border border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
