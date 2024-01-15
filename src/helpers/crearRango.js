const crearRango = (inicio, fin, intervalo) => {
    const turnos = [];
    let [horaActual, minutosActual] = inicio.split(':').map(Number);
    const [horaFin, minutosFin] = fin.split(':').map(Number);
    console.log({horaActual, minutosActual, horaFin, minutosFin});
    let tiempoActual = horaActual * 60 + minutosActual;
    const tiempoFin = horaFin * 60 + minutosFin;
    console.log({tiempoActual, tiempoFin})
    while (tiempoActual < tiempoFin) {
        const horaFormateada = horaActual.toString().padStart(2, '0');
        const minutosFormateados = minutosActual.toString().padStart(2, '0');

        turnos.push(`${horaFormateada}:${minutosFormateados}`);

        tiempoActual += intervalo;

        horaActual = Math.floor(tiempoActual / 60);
        minutosActual = tiempoActual % 60;
    }
    turnos.push(fin)
    console.log(turnos)
    return turnos;
}

export default crearRango;