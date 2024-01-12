const XLSX = require('xlsx')
const dotenv = require('dotenv');
dotenv.config();


const readExcel = (page = 0) => {
    try {
        const workbook = XLSX.readFile(process.env.DOC);
        if (!workbook.SheetNames[page]) page = 0;
        const sheetName = workbook.SheetNames[page];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet).map(data => {
            if(data.obraSocial === 'ips') data.obraSocial = 'IPS'
            data.dni = (data.dni?.toString().match(/\d+/g) || []).join('');         

            return {
                nombre: data.nombre || 'null',
                apellido: data.apellido || 'null',
                hora: data.hora || 'null',
                observaciones: data.observaciones || 'null',
                telefono: data.telefono || 'null',
                obraSocial: data.obraSocial || 'null',
                dni: data.dni || 'null',
                edad: data.edad || 'null'
            }
        })
        return {
            data: parseData,
            pages: workbook.SheetNames
        };
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }


}


const writeBook = () => {

    // Leer el libro de trabajo existente
    const workbook = XLSX.readFile(process.env.DOC);

    // Crear una nueva hoja de trabajo
    const ws_data = [['Columna1', 'Columna2'], [1, 2], [3, 4]]; // Un array de arrays con los datos
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    // Agregar la nueva hoja de trabajo al libro con un nombre de hoja
    const newSheetName = 'NuevaHoja';
    XLSX.utils.book_append_sheet(workbook, worksheet, newSheetName);

    // Escribir el libro de trabajo modificado de nuevo en el archivo XLSX
    XLSX.writeFile(workbook, process.env.DOC);

}

const newRow = () => {
    // Leer el libro de trabajo existente
    const workbook = XLSX.readFile(process.env.DOC);

    // Seleccionar la hoja de trabajo
    const sheetName = workbook.SheetNames[0]; // Asume que queremos la primera hoja
    const worksheet = workbook.Sheets[sheetName];

    // Datos para la nueva fila
    const newRow = ['Valor1', 'Valor2', 'Valor3']; // Asegúrate de que esto coincida con el número de columnas

    // Agregar la nueva fila a la hoja de trabajo
    // Busca la última fila con datos para no sobrescribir ninguna fila existente
    const ref = worksheet['!ref']; // Asume que la hoja no está vacía y que existe un rango ref
    const range = XLSX.utils.decode_range(ref); // Decodifica el rango para obtener las filas y columnas
    const newRowNumber = range.e.r + 2; // Obtiene el número de la siguiente fila (agregamos 2 porque los índices comienzan en 0 y queremos la siguiente fila)

    // Ahora convertimos los datos a un formato que SheetJS pueda entender y los escribimos
    newRow.forEach((value, index) => {
        const cellAddress = { c: index, r: newRowNumber - 1 }; // -1 porque el índice de la fila comienza en 0
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        worksheet[cellRef] = { t: 's', v: value }; // 't: s' significa que el tipo es string
    });

    // Actualiza el rango de la hoja de trabajo para incluir la nueva fila
    worksheet['!ref'] = XLSX.utils.encode_range(range.s, { c: range.e.c, r: newRowNumber - 1 });

    // Escribir el libro de trabajo modificado de nuevo en el archivo XLSX
    XLSX.writeFile(workbook, process.env.DOC
    );

}

module.exports = {
    readExcel,

}