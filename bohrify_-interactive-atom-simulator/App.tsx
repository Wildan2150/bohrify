import React, { useState } from 'react';
import Atom from './components/Atom';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';
import AITutor from './components/AITutor';
import { ELEMENTS } from './constants';
import { ElementData } from './types';
import { Dna } from 'lucide-react';

const App: React.FC = () => {
  const [currentElement, setCurrentElement] = useState<ElementData>(ELEMENTS[0]); // Default Hydrogen
  const [isExcited, setIsExcited] = useState(false);

  const handleExcite = () => {
    setIsExcited(true);
    // Simulate excitement duration
    setTimeout(() => {
        setIsExcited(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-space-900 text-white font-sans selection:bg-neon-pink selection:text-white pb-10">
      
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-space-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-neon-blue to-neon-purple p-2 rounded-lg">
                    <Dna className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Bohrify
                </h1>
            </div>
            <div className="text-sm font-medium text-gray-400 hidden sm:block">
                Interactive Atomic Playground
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Grid: Atom Visualizer & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Left: Atom Visualizer (Large) */}
            <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full bg-gradient-to-b from-space-800 to-space-900 rounded-3xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex justify-center">
                        <Atom element={currentElement} isExcited={isExcited} />
                    </div>
                </div>
                
                <div className="mt-8 w-full max-w-md">
                     <Controls 
                        currentElement={currentElement} 
                        onElementChange={setCurrentElement} 
                        onExcite={handleExcite}
                        isExcited={isExcited}
                    />
                </div>
            </div>

            {/* Right: Info & AI (Stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex-none">
                    <InfoPanel element={currentElement} />
                </div>
                <div className="flex-1 min-h-[400px]">
                    <AITutor element={currentElement} />
                </div>
            </div>

        </div>
        
        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm mt-12 border-t border-gray-800 pt-8">
            <p>Made for science lovers • Powered by React & Gemini AI</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
