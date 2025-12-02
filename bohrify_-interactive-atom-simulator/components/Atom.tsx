import React, { useMemo } from 'react';
import { ElementData } from '../types';
import { motion } from 'framer-motion';

interface AtomProps {
  element: ElementData;
  isExcited: boolean;
}

const Atom: React.FC<AtomProps> = ({ element, isExcited }) => {
  const { shells, symbol, color } = element;
  
  // Calculate shell radii. Base radius + increment
  const shellRadii = useMemo(() => {
    return shells.map((_, i) => 60 + (i * 40));
  }, [shells]);

  // Max viewbox size depends on max shells (approx 200px radius -> 400px box)
  const viewBoxSize = 480;
  const center = viewBoxSize / 2;

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      <svg 
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} 
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Nucleus Glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Nucleus */}
        <g filter="url(#glow)">
          <circle 
            cx={center} 
            cy={center} 
            r={25} 
            fill={color} 
            className="opacity-90 transition-colors duration-500"
          />
          <text 
            x={center} 
            y={center} 
            dy="0.35em" 
            textAnchor="middle" 
            fill="white" 
            className="text-2xl font-bold font-display"
          >
            {symbol}
          </text>
        </g>

        {/* Shells & Electrons */}
        {shells.map((electronCount, shellIndex) => {
          const radius = shellRadii[shellIndex];
          const electrons = Array.from({ length: electronCount });
          
          // Animation duration increases with radius (Kepler-ish)
          const duration = 3 + shellIndex * 2; 
          const direction = shellIndex % 2 === 0 ? 1 : -1; // Alternate directions

          return (
            <g key={`shell-${shellIndex}`}>
              {/* Orbital Ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Electrons Group - Rotates */}
              <motion.g
                animate={{ rotate: 360 * direction }}
                transition={{ 
                  repeat: Infinity, 
                  duration: duration, 
                  ease: "linear" 
                }}
                style={{ originX: "50%", originY: "50%", x: center, y: center }} // Center origin for rotation
              >
                {/* We render electrons at fixed positions on the circle, then rotate the whole group */}
                {electrons.map((_, eleIndex) => {
                  const angle = (eleIndex / electronCount) * 2 * Math.PI;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <g key={`ele-${shellIndex}-${eleIndex}`}>
                       <circle
                        cx={x}
                        cy={y}
                        r={6}
                        fill="#00f3ff"
                        filter="url(#glow)"
                        className="transition-all duration-300"
                      />
                      {/* Valence Electron Highlight if it's the last shell */}
                      {shellIndex === shells.length - 1 && isExcited && (
                         <circle
                         cx={x}
                         cy={y}
                         r={12}
                         fill="rgba(255, 0, 255, 0.4)"
                         className="animate-ping"
                       />
                      )}
                    </g>
                  );
                })}
              </motion.g>
            </g>
          );
        })}
      </svg>
      
      {/* Excited State Overlay Text */}
      {isExcited && (
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-neon-pink font-bold text-xl animate-pulse bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
               ENERGY ABSORBED!
            </div>
         </div>
      )}
    </div>
  );
};

export default Atom;
