import React from 'react';
import { ELEMENTS } from '../constants';
import { ElementData } from '../types';
import { ChevronRight, ChevronLeft, Zap, RotateCcw } from 'lucide-react';

interface ControlsProps {
  currentElement: ElementData;
  onElementChange: (el: ElementData) => void;
  onExcite: () => void;
  isExcited: boolean;
}

const Controls: React.FC<ControlsProps> = ({ currentElement, onElementChange, onExcite, isExcited }) => {
  
  const currentIndex = ELEMENTS.findIndex(e => e.atomicNumber === currentElement.atomicNumber);
  
  const handlePrev = () => {
    if (currentIndex > 0) onElementChange(ELEMENTS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < ELEMENTS.length - 1) onElementChange(ELEMENTS[currentIndex + 1]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const el = ELEMENTS.find(el => el.atomicNumber === parseInt(e.target.value));
    if (el) onElementChange(el);
  };

  return (
    <div className="bg-space-800 p-6 rounded-2xl border border-gray-700 shadow-xl w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-neon-blue" />
        </button>

        <div className="flex flex-col items-center">
            <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Select Element</span>
            <select 
                value={currentElement.atomicNumber} 
                onChange={handleChange}
                className="bg-space-900 text-white font-display font-bold text-lg py-2 px-4 rounded-lg border border-gray-600 focus:outline-none focus:border-neon-blue transition-all"
            >
                {ELEMENTS.map(el => (
                    <option key={el.atomicNumber} value={el.atomicNumber}>
                        {el.atomicNumber}. {el.name} ({el.symbol})
                    </option>
                ))}
            </select>
        </div>

        <button 
          onClick={handleNext}
          disabled={currentIndex === ELEMENTS.length - 1}
          className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-neon-blue" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="bg-space-900 p-3 rounded-lg border border-gray-700 text-center">
              <span className="block text-gray-400 text-xs mb-1">Protons</span>
              <span className="text-xl font-bold text-white">{currentElement.atomicNumber}</span>
          </div>
          <div className="bg-space-900 p-3 rounded-lg border border-gray-700 text-center">
              <span className="block text-gray-400 text-xs mb-1">Electrons</span>
              <span className="text-xl font-bold text-neon-blue">{currentElement.atomicNumber}</span>
          </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
          <button 
            onClick={onExcite}
            disabled={isExcited}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95
                ${isExcited 
                    ? 'bg-gray-700 text-gray-400 cursor-wait' 
                    : 'bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] text-white'
                }`}
          >
            {isExcited ? (
                <>
                    <RotateCcw className="w-5 h-5 animate-spin" />
                    Resetting...
                </>
            ) : (
                <>
                    <Zap className="w-5 h-5" />
                    Excite Electrons!
                </>
            )}
          </button>
          <p className="text-xs text-center mt-2 text-gray-500">
            Adds energy to valence electrons, causing them to jump!
          </p>
      </div>
    </div>
  );
};

export default Controls;
