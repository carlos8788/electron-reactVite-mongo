export const agruparPorPrimeraLetra = (pacientes) => {
    return pacientes.reduce((acc, paciente) => {
      const letra = paciente.apellido.charAt(0).toUpperCase();
      if (!acc[letra]) {
        acc[letra] = [];
      }
      acc[letra].push(paciente);
      return acc;
    }, {});
  };