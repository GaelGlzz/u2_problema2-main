import { useContext } from 'react';
import { PokemonContext, type RegistryEntry } from '../context/PokemonContext';

export default function RegistryItem({ entry }: { entry: RegistryEntry }) {
  const { dispatch } = useContext(PokemonContext);

  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">Registro {entry.entryId.slice(0, 8)}</span>
        <div className="badges">
          <span className="badge">{entry.type}</span>
          <span className={`badge role-${entry.role}`}>{entry.role === 'titular' ? 'Titular' : 'Reserva'}</span>
        </div>
      </div>
      <div className="preview">
        {entry.image && <img src={entry.image} alt="" width={72} height={72} />}
        <div>
          <h3>{entry.nickname}</h3>
          <p className="requester">#{entry.id} {entry.name}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="button danger" type="button" onClick={() => dispatch({ type: 'remove', entryId: entry.entryId })}>Eliminar</button>
      </div>
    </article>
  );
}
