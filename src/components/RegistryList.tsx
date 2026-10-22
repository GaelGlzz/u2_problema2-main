import { useContext } from 'react';
import EmptyState from './EmptyState.tsx';
import RegistryItem from './RegistryItem.tsx';
import { PokemonContext } from '../context/PokemonContext';

export default function RegistryList() {
  const { entries } = useContext(PokemonContext);

  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className="ticket-list">
        {entries.length === 0 ? <EmptyState /> : entries.map((entry) => <RegistryItem key={entry.entryId} entry={entry} />)}
      </div>
    </section>
  );
}
