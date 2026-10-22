import { useReducer, useState, type ReactNode } from 'react';
import { PokemonContext, type RegistryAction, type RegistryEntry, type PokemonContextType } from './PokemonContext';

type PokemonProviderProps = {
  children: ReactNode;
};

function registryReducer(entries: RegistryEntry[], action: RegistryAction) {
  switch (action.type) {
    case 'add':
      return [...entries, action.entry];
    case 'remove':
      return entries.filter((entry) => entry.entryId !== action.entryId);
  }
}

export default function PokemonProvider({ children }: PokemonProviderProps) {
  const [entries, dispatch] = useReducer(registryReducer, []);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonContextType['selectedPokemon']>(null);

  return (
    <PokemonContext.Provider value={{ entries, dispatch, selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
}
