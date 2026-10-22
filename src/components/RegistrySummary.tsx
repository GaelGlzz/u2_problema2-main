import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export default function RegistrySummary() {
  const { entries } = useContext(PokemonContext);
  const titularCount = entries.filter((entry) => entry.role === 'titular').length;
  const reservaCount = entries.filter((entry) => entry.role === 'reserva').length;

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat"><span>Total</span><strong>{entries.length}</strong></article>
      <article className="stat"><span>Titulares</span><strong className="text-amber">{titularCount}</strong></article>
      <article className="stat"><span>Reservas</span><strong className="text-green">{reservaCount}</strong></article>
    </section>
  );
}
