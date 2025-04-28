CREATE TABLE Usuario (
  idUsuario    SERIAL        PRIMARY KEY,
  nombre       VARCHAR(100)  NOT NULL,
  correo       VARCHAR(100)  NOT NULL,
  contrasena   VARCHAR(255)  NOT NULL  -- Falta agregar seguridad
);

CREATE TABLE Medicamento (
  idMedicamento       SERIAL        PRIMARY KEY,
  nombre              VARCHAR(100)  NOT NULL,
  cantidadInventario  INT           NOT NULL,
  fechaVencimiento    DATE          NOT NULL,
  precio              DECIMAL(10,2) NOT NULL,
  proveedor           VARCHAR(100)  NOT NULL
);

CREATE TABLE Venta (
  idVenta    SERIAL        PRIMARY KEY,
  idUsuario  INT           NOT NULL,
  total      DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Reporte (
  idReporte  SERIAL        PRIMARY KEY,
  idUsuario  INT           NOT NULL,
  fecha      DATE          NOT NULL,
  tipo       VARCHAR(50)   NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Notificacion (
  idNotificacion  SERIAL      PRIMARY KEY,
  mensaje         TEXT        NOT NULL,
  fecha           DATE        NOT NULL,
  tipo            VARCHAR(50) NOT NULL
);

CREATE TABLE Venta_Medicamento (
  idVenta       INT NOT NULL,
  idMedicamento INT NOT NULL,
  cantidad      INT NOT NULL,
  PRIMARY KEY (idVenta, idMedicamento),
  FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
  FOREIGN KEY (idMedicamento) REFERENCES Medicamento(idMedicamento) ON DELETE CASCADE
);

ALTER TABLE Medicamento ADD COLUMN IF NOT EXISTS umbral_minimo INTEGER DEFAULT 10;

INSERT INTO Usuario (nombre, correo, contrasena) VALUES
  ('Ana Torres',      'ana.torres@email.com',    'ana123'),
  ('Luis Martínez',   'luis.martinez@email.com', 'luis123'),
  ('María Gómez',     'maria.gomez@email.com',   'maria123'),
  ('Carlos Ruiz',     'carlos.ruiz@email.com',   'carlos123'),
  ('Laura López',     'laura.lopez@email.com',   'laura123'),
  ('Pedro Sánchez',   'pedro.sanchez@email.com', 'pedro123'),
  ('Lucía Fernández', 'lucia.fernandez@email.com','lucia123'),
  ('Miguel Díaz',     'miguel.diaz@email.com',   'miguel123'),
  ('Sandra Romero',   'sandra.romero@email.com', 'sandra123'),
  ('Jorge Herrera',   'jorge.herrera@email.com', 'jorge123');


INSERT INTO Medicamento (nombre, cantidadInventario, fechaVencimiento, precio, proveedor) VALUES
  ('Paracetamol', 100, '2025-12-31', 3.50, 'Farfasa'),
  ('Ibuprofeno',   80, '2024-11-15', 5.00, 'Laboratorios Laprin'),
  ('Amoxicilina',  1, '2026-01-10', 8.25, 'Farmacéutica LANCO'),
  ('Omeprazol',    90, '2025-07-01', 4.75, 'Distribuidora Almacén Farmacéutico S.A'),
  ('Cetirizina',  120, '2026-05-30', 2.95, 'Laboratorios Vijosa'),
  ('Loratadina',  110, '2025-09-20', 3.10, 'Farfas'),
  ('Norgestrel',   70, '2026-03-15', 6.00, 'Farmacéutica LANCO'),
  ('Simvastatina', 65, '2025-04-01', 7.40, 'Farmacéutica LANCO'),
  ('Buscapina',   130, '2024-12-05', 4.20, 'Laboratorios Laprin'),
  ('Salbutamol',   95, '2026-02-22', 9.80, 'Distribuidora Almacén Farmacéutico S.A');


INSERT INTO Venta (idUsuario, total) VALUES
  (1,  15.00),
  (2,   9.50),
  (3,  22.75),
  (4,   5.00),
  (5,  13.25),
  (6,  10.10),
  (7,   8.20),
  (8,  12.60),
  (9,   7.40),
  (10, 18.00);


INSERT INTO Reporte (idUsuario, fecha, tipo) VALUES
  (1,  '2025-03-01', 'Stock Bajo'),
  (2,  '2025-03-02', 'Venta Alta'),
  (3,  '2025-03-03', 'Medicamento Vencido'),
  (4,  '2025-03-04', 'Revisión'),
  (5,  '2025-03-05', 'Alerta'),
  (6,  '2025-03-06', 'Inventario'),
  (7,  '2025-03-07', 'Devolución'),
  (8,  '2025-03-08', 'Consulta'),
  (9,  '2025-03-09', 'Reposición'),
  (10, '2025-03-10', 'Sugerencia');


INSERT INTO Notificacion (mensaje, fecha, tipo) VALUES
  ('Medicamento Paracetamol por agotarse',     '2025-03-01', 'Stock'),
  ('Venta récord registrada hoy',               '2025-03-02', 'Venta'),
  ('Medicamento vencido detectado',             '2025-03-03', 'Alerta'),
  ('Se requiere revisión de inventario',        '2025-03-04', 'Sistema'),
  ('Nuevo lote recibido',                       '2025-03-05', 'Recepción'),
  ('Falla en el sistema de notificaciones',     '2025-03-06', 'Error'),
  ('Medicamento en promoción',                  '2025-03-07', 'Promoción'),
  ('Cambio de proveedor registrado',            '2025-03-08', 'Actualización'),
  ('Reporte disponible para revisión',          '2025-03-09', 'Reporte'),
  ('Sistema actualizado correctamente',         '2025-03-10', 'Sistema');


INSERT INTO Venta_Medicamento (idVenta, idMedicamento, cantidad) VALUES
  (1,  1, 2),
  (1,  2, 1),
  (2,  3, 1),
  (3,  4, 3),
  (4,  5, 1),
  (5,  6, 2),
  (6,  7, 1),
  (7,  8, 1),
  (8,  9, 2),
  (9, 10, 1),
  (10, 1, 3);