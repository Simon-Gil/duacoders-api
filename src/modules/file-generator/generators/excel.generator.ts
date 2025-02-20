import { DuacoderEntity } from "src/modules/duacoders/duacoder.entity";
import * as xl from 'excel4node';
export class ExcelGenerator {
    generateExcel(duacodersList: DuacoderEntity[]): Promise<any> {
        const workbook = new xl.Workbook()
        const worksheet = workbook.addWorksheet('Duacoders')

        // Fila inicial
        let currentRow = 1;

        // Añadimos encabezados y avanzamos una fila
        this.addHeaders(workbook, worksheet, currentRow)
        currentRow++

        // Añadimos duacoders y ajustamos alto y ancho de filas y columnas
        this.addDuacoders(workbook, worksheet, currentRow, duacodersList)
        this.adjustColumnWidths(worksheet)
        this.adjustRowHeights(worksheet, duacodersList.length)

        return workbook;
    }


    // Añade encabezados a la tabla
    addHeaders(workbook: any, worksheet: any, currentRow: number) {
        const headerStyle = workbook.createStyle({
            font: { bold: true, size: 18 },
            fill: { type: 'pattern', patternType: 'solid', fgColor: '#DA1184' },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
                left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' },
                top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' }
            }
        })

        worksheet.cell(currentRow, 1).string('NIF').style(headerStyle);
        worksheet.cell(currentRow, 2).string('Nombre completo').style(headerStyle);
        worksheet.cell(currentRow, 3).string('Departamento').style(headerStyle);
        worksheet.cell(currentRow, 4).string('Puesto').style(headerStyle);
        worksheet.cell(currentRow, 5).string('Biografía').style(headerStyle);
        worksheet.cell(currentRow, 6).string('¿Tortilla con cebolla?').style(headerStyle);
        worksheet.cell(currentRow, 7).string('Skills').style(headerStyle);
        worksheet.cell(currentRow, 8).string('Fecha de nacimiento').style(headerStyle);
    }

   // Añade duacoders a la tabla
    addDuacoders(workbook: any, worksheet: any, currentRow: number, duacodersList: DuacoderEntity[]) {
        const duacoderStyle = workbook.createStyle({
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: { type: 'pattern', patternType: 'solid', fgColor: '#EBEBEB' },
            border: {
                left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' },
                top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' }
            }
        })
        duacodersList.forEach(duacoder => {
            // Crear string para skills 
            let skillsText = ''
            if(duacoder.skills){
                skillsText = duacoder.skills.map(skill => `- ${skill}`).join('\n');
            }
            
            worksheet.cell(currentRow, 1).string(duacoder.nif).style(duacoderStyle)
            worksheet.cell(currentRow, 2).string(duacoder.name).style(duacoderStyle)
            worksheet.cell(currentRow, 3).string(duacoder.department.name).style(duacoderStyle)
            worksheet.cell(currentRow, 4).string(duacoder.position.name).style(duacoderStyle)
            worksheet.cell(currentRow, 5).string(duacoder.bio).style(duacoderStyle)
            worksheet.cell(currentRow, 6).string(duacoder.withOnion ? 'Sí' : 'No').style(duacoderStyle)
            worksheet.cell(currentRow, 7).string(skillsText).style(duacoderStyle)
            worksheet.cell(currentRow, 8).string(duacoder.bDate).style(duacoderStyle)
            currentRow++
        })

    }
    
    // Ajusta el ancho de las columnas
    adjustColumnWidths(worksheet: any) {
        worksheet.column(1).setWidth(20);
        worksheet.column(2).setWidth(30);
        worksheet.column(3).setWidth(20);
        worksheet.column(4).setWidth(20);
        worksheet.column(5).setWidth(35);
        worksheet.column(6).setWidth(30);
        worksheet.column(7).setWidth(40);
        worksheet.column(8).setWidth(30);
    }

    // Ajusta el alto de las filas
    adjustRowHeights(worksheet: any, nDuacoders: number) {
        worksheet.row(1).setHeight(45)
        for (let i = 2; i < nDuacoders + 2; i++) {
            worksheet.row(i).setHeight(35)
        }
    }
}