class PacienteObject {
    constructor(nombre, apellido, hora, observaciones = null, telefono, obraSocial = 'particular', dni, edad, fechaNac, numAfiliado = null) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.hora = hora;
        this.observaciones = observaciones;
        this.telefono = telefono;
        this.obraSocial = obraSocial;
        this.dni = dni;
        this.edad = edad;
        this.fechaNac = fechaNac;
        this.numAfiliado = numAfiliado;
    }
}
