import React from 'react';

function Contacto() {
  const linkTreeUrl = 'https://linktr.ee/dra.gabrielaarguello';

  return (
    <section
      className="catalog"
      style={{
        marginTop: '50px',
        fontFamily: 'Montserrat, sans-serif',
        color: '#5C3C92',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '30px',
        }}
      >
        Contáctanos
      </h2>

      <div
        className="catalog-container"
        style={{
          justifyContent: 'center',
        }}
      >
        <div
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '40px',
            width: '90%',
            maxWidth: '900px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <a
            href={linkTreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 30px',
              backgroundColor: '#5C3C92',
              color: '#FFFFFF',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}
          >
            Visítanos en Linktree
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
