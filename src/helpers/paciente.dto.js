import { toCapitalize } from "./capitalizeStr";

export const prepareDNI = (dni) => dni?.match(/\d+/g)?.join('')

export const pacienteDTO = (paciente) => {
    const regexDNI = prepareDNI(paciente.dni);
    return {
        
        nombre: toCapitalize(paciente.nombre.trim()),
        apellido: toCapitalize(paciente.apellido.trim()),
        dni: regexDNI,
        edad: paciente.edad.trim(),
        fechaNaciemico: paciente.fechaNaciemico,
        obraSocial: paciente.obraSocial,
        observaciones: paciente.observaciones.trim(),
        telefono: paciente.telefono
    }
}