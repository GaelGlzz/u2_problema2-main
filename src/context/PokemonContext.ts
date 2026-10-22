import { createContext, type Dispatch } from 'react';
import type { PokemonDetails } from '../types/PokemonDetails';

export type PokemonRole = 'titular' | 'reserva';

export type RegistryEntry = PokemonDetails & {
  entryId: string;
  nickname: string;
  role: PokemonRole;
};

export type RegistryAction =
  | { type: 'add'; entry: RegistryEntry }
  | { type: 'remove'; entryId: string };

export type PokemonContextType = {
  entries: RegistryEntry[];
  dispatch: Dispatch<RegistryAction>;
  selectedPokemon: PokemonDetails | null;
  setSelectedPokemon: (pokemon: PokemonDetails | null) => void;
};

export const PokemonContext = createContext<PokemonContextType>({
  entries: [],
  dispatch: () => undefined,
  selectedPokemon: null,
  setSelectedPokemon: () => undefined,
});
