import Upload from '../components/Upload';

const KnowledgeBase = () => {
  console.log(window.location)
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <Upload />
    </div>
  );
};

export default KnowledgeBase;
