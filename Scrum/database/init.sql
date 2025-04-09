CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    contrasena VARCHAR(255) -- Falta agregar seguridad
);

CREATE TABLE Medicamento (
    idMedicamento INT PRIMARY KEY,
    nombre VARCHAR(100),
    cantidadInventario INT,
    fechaVencimiento DATE,
    precio DECIMAL(10,2),
    proveedor VARCHAR(100)
);

CREATE TABLE Venta (
    idVenta INT PRIMARY KEY,
    idUsuario INT,
    total DECIMAL(10,2),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Reporte (
    idReporte INT PRIMARY KEY,
    idUsuario INT,
    fecha DATE,
    tipo VARCHAR(50),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Notificacion (
    idNotificacion INT PRIMARY KEY,
    mensaje TEXT,
    fecha DATE,
    tipo VARCHAR(50)
);

CREATE TABLE Venta_Medicamento (
    idVenta INT,
    idMedicamento INT,
    cantidad INT,
    PRIMARY KEY (idVenta, idMedicamento),
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idMedicamento) REFERENCES Medicamento(idMedicamento)
);



INSERT INTO Usuario (idUsuario, nombre, correo, contrasena) VALUES
(1, 'Ana Torres', 'ana.torres@email.com', 'ana123'),
(2, 'Luis Martínez', 'luis.martinez@email.com', 'luis123'),
(3, 'María Gómez', 'maria.gomez@email.com', 'maria123'),
(4, 'Carlos Ruiz', 'carlos.ruiz@email.com', 'carlos123'),
(5, 'Laura López', 'laura.lopez@email.com', 'laura123'),
(6, 'Pedro Sánchez', 'pedro.sanchez@email.com', 'pedro123'),
(7, 'Lucía Fernández', 'lucia.fernandez@email.com', 'lucia123'),
(8, 'Miguel Díaz', 'miguel.diaz@email.com', 'miguel123'),
(9, 'Sandra Romero', 'sandra.romero@email.com', 'sandra123'),
(10, 'Jorge Herrera', 'jorge.herrera@email.com', 'jorge123');




INSERT INTO Medicamento (idMedicamento, nombre, cantidadInventario, fechaVencimiento, precio, proveedor) VALUES
(1, 'Paracetamol', 100, '2025-12-31', 3.50, 'Farfasa'),
(2, 'Ibuprofeno', 80, '2024-11-15', 5.00, 'Laboratorios Laprin'),
(3, 'Amoxicilina', 60, '2026-01-10', 8.25, 'Farmacéutica LANCO'),
(4, 'Omeprazol', 90, '2025-07-01', 4.75, 'Distribuidora Almacén Farmacéutico S.A'),
(5, 'Cetirizina', 120, '2026-05-30', 2.95, 'Laboratorios Vijosa'),
(6, 'Loratadina', 110, '2025-09-20', 3.10, 'Farfas'),
(7, 'Norgestrel', 70, '2026-03-15', 6.00, 'Farmacéutica LANCO'),
(8, 'Simvastatina', 65, '2025-04-01', 7.40, 'Farmacéutica LANCO'),
(9, 'Buscapina ', 130, '2024-12-05', 4.20, 'Laboratorios Laprin'),
(10, 'Salbutamol', 95, '2026-02-22', 9.80, 'Distribuidora Almacén Farmacéutico S.A');

INSERT INTO Venta (idVenta, idUsuario, total) VALUES
(1, 1, 15.00),
(2, 2, 9.50),
(3, 3, 22.75),
(4, 4, 5.00),
(5, 5, 13.25),
(6, 6, 10.10),
(7, 7, 8.20),
(8, 8, 12.60),
(9, 9, 7.40),
(10, 10, 18.00);

INSERT INTO Reporte (idReporte, idUsuario, fecha, tipo) VALUES
(1, 1, '2025-03-01', 'Stock Bajo'),
(2, 2, '2025-03-02', 'Venta Alta'),
(3, 3, '2025-03-03', 'Medicamento Vencido'),
(4, 4, '2025-03-04', 'Revisión'),
(5, 5, '2025-03-05', 'Alerta'),
(6, 6, '2025-03-06', 'Inventario'),
(7, 7, '2025-03-07', 'Devolución'),
(8, 8, '2025-03-08', 'Consulta'),
(9, 9, '2025-03-09', 'Reposición'),
(10, 10, '2025-03-10', 'Sugerencia');

INSERT INTO Notificacion (idNotificacion, mensaje, fecha, tipo) VALUES
(1, 'Medicamento Paracetamol por agotarse', '2025-03-01', 'Stock'),
(2, 'Venta récord registrada hoy', '2025-03-02', 'Venta'),
(3, 'Medicamento vencido detectado', '2025-03-03', 'Alerta'),
(4, 'Se requiere revisión de inventario', '2025-03-04', 'Sistema'),
(5, 'Nuevo lote recibido', '2025-03-05', 'Recepción'),
(6, 'Falla en el sistema de notificaciones', '2025-03-06', 'Error'),
(7, 'Medicamento en promoción', '2025-03-07', 'Promoción'),
(8, 'Cambio de proveedor registrado', '2025-03-08', 'Actualización'),
(9, 'Reporte disponible para revisión', '2025-03-09', 'Reporte'),
(10, 'Sistema actualizado correctamente', '2025-03-10', 'Sistema');

INSERT INTO Venta_Medicamento (idVenta, idMedicamento, cantidad) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 1),
(3, 4, 3),
(4, 5, 1),
(5, 6, 2),
(6, 7, 1),
(7, 8, 1),
(8, 9, 2),
(9, 10, 1),
(10, 1, 3);