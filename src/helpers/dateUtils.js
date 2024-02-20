export const getDays = (fechas, selectDay) => {
    const date = new Date();
    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(date);
        futureDate.setDate(date.getDate() + i);
        const formattedDate = futureDate.toISOString().split('T')[0];
        const fechaIndex = fechas.findIndex(item => item === formattedDate);

        if (fechaIndex !== -1) return selectDay(fechaIndex); 
    }
};