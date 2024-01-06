class PacienteObject {
    constructor(nombre, apellido, observaciones = null, telefono, obraSocial = 'particular', dni, edad, fechaNac, numAfiliado = null) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.observaciones = observaciones;
        this.telefono = telefono;
        this.obraSocial = obraSocial;
        this.dni = dni;
        this.edad = edad;
        this.fechaNac = fechaNac;
        this.numAfiliado = numAfiliado;
    }
}
