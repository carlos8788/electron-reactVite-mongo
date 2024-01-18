export const pacienteDTO = (paciente) => {
    const regexDNI = paciente.dni.match(/\d+/g).join('');
    return {
        nombre: paciente.nombre.trim(),
        apellido: paciente.apellido.trim(),
        dni: regexDNI,
        edad: paciente.edad.trim(),
        fechaNaciemico: paciente.fechaNaciemico,
        obraSocial: paciente.obraSocial,
        observaciones: paciente.observaciones.trim(),
        telefono: paciente.telefono
    }
}