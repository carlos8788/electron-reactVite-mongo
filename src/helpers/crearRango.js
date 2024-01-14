const crearRango = (inicio, fin, intervalo) => {
    const turnos = [];
    let [horaActual, minutosActual] = inicio.split(':').map(Number);
    const [horaFin, minutosFin] = fin.split(':').map(Number);

    let tiempoActual = horaActual * 60 + minutosActual;
    const tiempoFin = horaFin * 60 + minutosFin;

    while (tiempoActual < tiempoFin) {
        turnos.push(`${horaActual}:${minutosActual.toString().padStart(2, '0')}`);

        tiempoActual += intervalo;

        horaActual = Math.floor(tiempoActual / 60);
        minutosActual = tiempoActual % 60;
    }
    turnos.push(fin)

    return turnos;
}

export default crearRango;