export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: string;
  summary: string;
  shells: number[]; // e.g. [2, 8, 1] for Sodium
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SimulationMode {
  ORBIT = 'ORBIT',
  EXCITATION = 'EXCITATION' // Showing energy absorption/emission
}
