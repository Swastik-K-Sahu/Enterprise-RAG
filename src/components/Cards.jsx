
const Cards = ({ title, count, Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out">

      <div className="text-left">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-1">{count}</p>
      </div>

      <div className="text-blue-700 hover:text-white">
        <Icon size={40} /> 
      </div>
    </div>
  );
};

export default Cards;

