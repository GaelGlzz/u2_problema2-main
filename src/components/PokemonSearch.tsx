import { useContext, useState, type FormEvent } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import type { PokemonDetails } from '../types/PokemonDetails.ts';

type PokemonApiResponse = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: Array<{ type: { name: string } }>;
};

export default function PokemonSearch() {
  const { setSelectedPokemon } = useContext(PokemonContext);
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('query') ?? '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '');

    if (query.length < 3) {
      setFeedback('El nombre debe tener al menos 3 caracteres.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);

      if (response.status === 404) {
        setFeedback('Sin resultados');
        setIsError(true);
        return;
      }

      if (!response.ok) {
        throw new Error(`PokeAPI respondió con ${response.status}`);
      }

      const data = (await response.json()) as PokemonApiResponse;
      const pokemon: PokemonDetails = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default ?? '',
        type: data.types[0]?.type.name ?? '',
      };

      if (!pokemon.id || !pokemon.name || !pokemon.type) {
        throw new Error('La respuesta de PokeAPI no tiene los campos requeridos');
      }

      setSelectedPokemon(pokemon);
      setFeedback('');
      setIsError(false);
    } catch {
      setFeedback('No se pudo consultar PokeAPI');
      setIsError(true);
    }
  }

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input id="query" name="query" placeholder="Ej. pikachu" autoComplete="off" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className={`feedback${isError ? ' error' : ''}`} aria-live="polite">{feedback}</div>
        <button className="button primary" type="submit">Buscar</button>
      </form>
    </section>
  );
}
