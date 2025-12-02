import { ElementData } from './types';

export const ELEMENTS: ElementData[] = [
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', atomicMass: '1.008', category: 'Nonmetal', shells: [1], summary: 'The lightest element.', color: '#ef4444' },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', atomicMass: '4.0026', category: 'Noble Gas', shells: [2], summary: 'Inert gas, used in balloons.', color: '#3b82f6' },
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', atomicMass: '6.94', category: 'Alkali Metal', shells: [2, 1], summary: 'Used in batteries.', color: '#a855f7' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', atomicMass: '9.0122', category: 'Alkaline Earth Metal', shells: [2, 2], summary: 'Strong, lightweight metal.', color: '#22c55e' },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', atomicMass: '10.81', category: 'Metalloid', shells: [2, 3], summary: 'Essential nutrient for plants.', color: '#eab308' },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', atomicMass: '12.011', category: 'Nonmetal', shells: [2, 4], summary: 'The basis of life.', color: '#64748b' },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', atomicMass: '14.007', category: 'Nonmetal', shells: [2, 5], summary: 'Makes up 78% of air.', color: '#0ea5e9' },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', atomicMass: '15.999', category: 'Nonmetal', shells: [2, 6], summary: 'Essential for respiration.', color: '#f43f5e' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', atomicMass: '18.998', category: 'Halogen', shells: [2, 7], summary: 'Most reactive element.', color: '#d946ef' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', atomicMass: '20.180', category: 'Noble Gas', shells: [2, 8], summary: 'Glows red in vacuum tubes.', color: '#f97316' },
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', atomicMass: '22.990', category: 'Alkali Metal', shells: [2, 8, 1], summary: 'Salt component.', color: '#8b5cf6' },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: '24.305', category: 'Alkaline Earth Metal', shells: [2, 8, 2], summary: 'Burns with bright white light.', color: '#10b981' },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminium', atomicMass: '26.982', category: 'Post-transition Metal', shells: [2, 8, 3], summary: 'Used in foil and cans.', color: '#94a3b8' },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', atomicMass: '28.085', category: 'Metalloid', shells: [2, 8, 4], summary: 'Semiconductor basis.', color: '#06b6d4' },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', atomicMass: '30.974', category: 'Nonmetal', shells: [2, 8, 5], summary: 'Glows in the dark.', color: '#f59e0b' },
  { atomicNumber: 16, symbol: 'S', name: 'Sulfur', atomicMass: '32.06', category: 'Nonmetal', shells: [2, 8, 6], summary: 'Yellow solid, smells like eggs.', color: '#fbbf24' },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: '35.45', category: 'Halogen', shells: [2, 8, 7], summary: 'Pool disinfectant.', color: '#a3e635' },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', atomicMass: '39.948', category: 'Noble Gas', shells: [2, 8, 8], summary: 'Inert gas in lightbulbs.', color: '#60a5fa' },
  // Adding Potassium and Calcium for 4 shells visualization
  { atomicNumber: 19, symbol: 'K', name: 'Potassium', atomicMass: '39.098', category: 'Alkali Metal', shells: [2, 8, 8, 1], summary: 'Important for nerve function.', color: '#c084fc' },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', atomicMass: '40.078', category: 'Alkaline Earth Metal', shells: [2, 8, 8, 2], summary: 'Good for bones.', color: '#cbd5e1' },
];

export const SHELL_LABELS = ['K', 'L', 'M', 'N'];
export const MAX_SHELLS = 4;
