"use client";

export default function TailwindTest() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-8">
      <div>
        <div className="text-xl font-medium text-black">Tailwind Test</div>
        <p className="text-gray-500">This should have Tailwind styles applied</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md">
          Test Button
        </button>
      </div>
    </div>
  );
} 