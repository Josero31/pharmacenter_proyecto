import React, { useState } from 'react';

const videos = [
  {
    src:
      'https://cdn.pixabay.com/video/2024/01/20/197486-905015022_large.mp4',
    caption: 'Recorrido por la farmacia',
  },
  {
    src:
      'https://media.istockphoto.com/id/1798749316/video/close-up-of-a-pharmacist-grabbing-a-box-of-prescription-medicines-at-the-drugstore.mp4?s=mp4-640x640-is&k=20&c=H7lvZ65TcQx-tC9IVezYpQK8bI-w_mepQ9WTAgdsTdc=',
    caption: 'Preparación de recetas',
  },
  {
    src:
      'https://media.istockphoto.com/id/1309240845/video/beautiful-asian-pharmacist-uses-checkout-counter-computer-does-inventory-checkup-online.mp4?s=mp4-640x640-is&k=20&c=Z-YsKr506G91tiDDgaAJkTzj1JIx12Cm-kfXoTQ5BAs=',
    caption: 'Control de inventario',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moveCarousel = (dir) =>
    setCurrentIndex((prev) => (prev + dir + videos.length) % videos.length);

  return (
    <section
      className="carousel"
      style={{
        position: 'relative',
        marginTop: '10px',    
        marginBottom: '0',
      }}
    >
      <div
        className="carousel-inner"
        style={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {videos.map((vid, idx) => (
          <div
            key={idx}
            className={`carousel-item ${
              idx === currentIndex ? 'active' : ''
            }`}
            style={{
              display: idx === currentIndex ? 'block' : 'none',
              textAlign: 'center', 
              width: '100%', 
            }}
          >
            <video
              src={vid.src}
              style={{
                width: '100%',
                maxHeight: '1200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              autoPlay
              muted
              loop
              controls
            />

            
            <div
              className="caption"
              style={{
                margin: '20px auto 0',               
                display: 'inline-block',
                backgroundColor: 'rgba(92, 60, 146, 0.85)',
                color: '#fff',
                padding: '24px 48px',
                borderRadius: '8px',
                fontSize: '2.25rem',
              }}
            >
              {vid.caption}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn prev"
        onClick={() => moveCarousel(-1)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          color: '#5C3C92',
          cursor: 'pointer',
        }}
      >
        &#10094;
      </button>

      <button
        className="carousel-btn next"
        onClick={() => moveCarousel(1)}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          color: '#5C3C92',
          cursor: 'pointer',
        }}
      >
        &#10095;
      </button>
    </section>
  );
}
