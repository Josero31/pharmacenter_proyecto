CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100)
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