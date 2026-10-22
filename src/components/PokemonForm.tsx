import { useActionState, useContext } from 'react';
import { PokemonContext, type PokemonRole } from '../context/PokemonContext';

type FormState = {
  errors: string[];
  message: string;
};

const initialState: FormState = { errors: [], message: '' };

export default function PokemonForm() {
  const { selectedPokemon, dispatch } = useContext(PokemonContext);
  const [state, formAction, isPending] = useActionState(async (_previousState: FormState, formData: FormData) => {
    const errors: string[] = [];
    const nickname = String(formData.get('nickname') ?? '').trim();
    const role = String(formData.get('role') ?? '');

    if (!selectedPokemon) errors.push('Debes cargar un pokémon.');
    if (nickname.length < 3) errors.push('El apodo debe tener al menos 3 caracteres.');
    if (role !== 'titular' && role !== 'reserva') errors.push('Debes seleccionar un rol válido.');

    if (errors.length > 0) return { errors, message: '' };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({
      type: 'add',
      entry: {
        ...selectedPokemon!,
        entryId: crypto.randomUUID(),
        nickname,
        role: role as PokemonRole,
      },
    });

    return { errors: [], message: 'Pokémon registrado correctamente' };
  }, initialState);

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate action={formAction}>
        <div className="preview">
          {selectedPokemon?.image && <img src={selectedPokemon.image} alt="" width={72} height={72} />}
          <div>
            <p className="ticket-id">{selectedPokemon ? `Pokémon #${selectedPokemon.id}` : 'Sin selección'}</p>
            <strong>{selectedPokemon ? selectedPokemon.name : 'Ningún pokémon cargado'}</strong>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input id="pokemonId" name="pokemonId" value={selectedPokemon?.id ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input id="pokemonName" name="pokemonName" value={selectedPokemon?.name ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={selectedPokemon?.type ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role">
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
        </div>
        <div className={`feedback${state.errors.length > 0 ? ' error' : state.message ? ' success' : ''}`} aria-live="polite">
          {state.errors.length > 0 ? state.errors.map((error) => <div key={error}>{error}</div>) : state.message}
        </div>
        <button className="button primary" type="submit" disabled={isPending}>
          {isPending ? 'Registrando...' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  );
}
