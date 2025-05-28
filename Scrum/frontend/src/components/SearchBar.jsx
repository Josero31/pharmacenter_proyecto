import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  // Cargar medicamentos desde la API
  useEffect(() => {
    axios.get('http://localhost:3000/api/medicamentos')
      .then(res => setMedicamentos(res.data))
      .catch(err => console.error('Error al obtener medicamentos:', err));
  }, []);

  // Memoizar recomendaciones
  const sugerencias = useMemo(() => {
    if (query.trim() === '') return [];
    return medicamentos.filter(med =>
      med.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, medicamentos]);

  useEffect(() => {
    setResultados(sugerencias);
  }, [sugerencias]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar medicamentos..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query && resultados.length > 0 && (
        <ul className="search-suggestions">
           {resultados.map((med) => (
                <li
                    key={med.idMedicamento}
                    onClick={() => window.location.href = `/compra.html?id=${med.idmedicamento}`}
                    style={{ cursor: 'pointer' }}
                >
                    {med.nombre}
                </li>
         ))}

        </ul>
      )}
    </div>
  );
}

export default SearchBar;
