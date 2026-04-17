import { useState } from 'react'
// import StaticQuizCard from './components/StaticQuizCard';

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Quiz Master</h1>
      </nav>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">

        {/* <StaticQuizCard /> // Quiz card with Static Data */}

      </div>
    </div>
  )
}

export default App
