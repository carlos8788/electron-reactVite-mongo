import ipcConnect from "../api/ipcIndex";

// ipcConnect.createManyUsers
export const exportToDB = async (day) => {
    const result = await ipcConnect.get('excel', day)
    const promises = await result.data.map(async user => {
        console.log(user.obraSocial.toUpperCase())
        let idOSocial = await ipcConnect.getOne('get-obraSocial-byName', user.obraSocial.toUpperCase().trim())
        // if (!idOSocial) idOSocial = await ipcConnect.getOne('get-obraSocial-byName', 'PARTICULAR');
        return {
            nombre: user.nombre,
            apellido: user.apellido,
            observaciones: '',
            telefono: user.telefono,
            dni: user.dni,
            edad: user.edad,
            obraSocial: idOSocial?._id 
        }
    })
    const data = await Promise.all(promises);
    console.log(data)
    return data;
}