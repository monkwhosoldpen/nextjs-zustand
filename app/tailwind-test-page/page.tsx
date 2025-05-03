export default function TailwindTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-800">Red Card</h2>
          <p className="text-red-600">This should have red styling</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-800">Blue Card</h2>
          <p className="text-blue-600">This should have blue styling</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800">Green Card</h2>
          <p className="text-green-600">This should have green styling</p>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-yellow-800">Yellow Card</h2>
          <p className="text-yellow-600">This should have yellow styling</p>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Blue Button
        </button>
        
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Red Button
        </button>
        
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Green Button
        </button>
        
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Purple Button
        </button>
      </div>
    </div>
  )
} 