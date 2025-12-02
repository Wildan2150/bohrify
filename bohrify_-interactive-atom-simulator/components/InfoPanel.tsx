import React from 'react';
import { ElementData } from '../types';
import { SHELL_LABELS } from '../constants';
import { Atom } from 'lucide-react';

interface InfoPanelProps {
  element: ElementData;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ element }) => {
  return (
    <div className="bg-space-800 p-6 rounded-2xl border border-gray-700 shadow-xl h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-space-700 rounded-lg">
             <Atom className="w-6 h-6 text-neon-green" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white">Data Deck</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-space-900 p-4 rounded-xl border border-gray-700">
            <h3 className="text-neon-yellow text-sm font-bold uppercase tracking-wider mb-2">Configuration</h3>
            <div className="flex gap-2 flex-wrap">
                {element.shells.map((count, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border-2 border-neon-blue flex items-center justify-center text-white font-bold mb-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                            {count}
                        </div>
                        <span className="text-xs text-gray-400">{SHELL_LABELS[i]} Shell</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-space-900 p-3 rounded-xl border border-gray-700">
                <span className="text-gray-400 text-xs">Atomic Mass</span>
                <div className="text-lg font-bold">{element.atomicMass} u</div>
            </div>
            <div className="bg-space-900 p-3 rounded-xl border border-gray-700">
                <span className="text-gray-400 text-xs">Category</span>
                <div className="text-lg font-bold text-neon-green">{element.category}</div>
            </div>
        </div>

        <div className="bg-space-900 p-4 rounded-xl border border-gray-700">
             <h3 className="text-gray-400 text-xs uppercase mb-2">Quick Summary</h3>
             <p className="text-gray-200 leading-relaxed text-sm">
                 {element.summary}
             </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;