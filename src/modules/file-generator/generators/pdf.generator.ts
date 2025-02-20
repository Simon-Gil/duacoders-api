import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { DuacoderEntity } from 'src/modules/duacoders/duacoder.entity';
const PDFDocument = require('pdfkit-table')

@Injectable()
export class PdfGenerator {
    async generateDuacoderPdf(duacoder: DuacoderEntity): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise(async resolve => {
            const doc = new PDFDocument({
                size: "A4",
                bufferPages: true
            })

            // Dimensiones de la pagina
            const pageWidth = doc.page.width;
            const pageHeight = doc.page.height;

            // Márgenes
            const marginLeft = 50;
            const marginTop = 150;
            const imageWidth = 180;
            const columnOffset = imageWidth + 20;
            const bodyMarginTop = marginTop + 40;

            // Enums
            enum colors {
                HeaderTextColor = '#DA1184',
                HeaderColor = 'white',
                BodyColor = '#DA1184',
                BodyTextColor = 'white',
            }

            enum fontSizes {
                Title = 38,
                DuacoderName = 26,
                DuacoderSubtitle = 14,
                FieldTitle = 18,
                FieldSubtitle = 16
            }

            enum omeletteOptions {
                withOnion = '"La tortilla... ¡Con cebolla!"',
                withoutOnion = '"¿La tortilla? Sin cebolla..."'
            }


            // Colores de header y body
            doc.rect(0, 0, pageWidth, marginTop)
                .fill(colors.HeaderColor);

            doc.rect(0, marginTop, pageWidth, pageHeight - marginTop)
                .fill(colors.BodyColor)



            // Método para agregar texto
            const addText = (fillColor: string, fontSize: number = 18, font: string, text: string, x: number, y: number, options: any = {}) => {
                doc.fillColor(fillColor)
                    .font(font)
                    .fontSize(fontSize)
                    .text(text, x, y, options);
            };

            // Header
            doc.fillColor(colors.HeaderTextColor)
                .font('Helvetica-Bold')
                .fontSize(fontSizes.Title)
                .text('DUACODER PROFILE.', { align: 'center' })


            // Posiciones iniciales del texto
            let textX = marginLeft + columnOffset;
            let currentY = bodyMarginTop;

            // Imagen (si no es una ruta o se ha guardado algun string por equivocación, elimina el offSet de la imagen)
            if (duacoder.photoLink.includes('/')) {
                doc.image(join(process.cwd(), duacoder.photoLink), marginLeft, bodyMarginTop, { width: imageWidth })
            } else {
                textX = marginLeft
            }


            // Nombre de duacoder
            addText(colors.BodyTextColor, fontSizes.DuacoderName, 'Helvetica-Bold', `${duacoder.name}`, textX, currentY);
            currentY += 30;

            // Puesto y deparmento
            addText(colors.BodyTextColor, fontSizes.DuacoderSubtitle, 'Helvetica', `${duacoder.position.name} ${duacoder.department.name}`, textX, currentY);
            currentY += 20;

            // NIF y Fecha de nacimiento de duacoder
            addText(colors.BodyTextColor, fontSizes.DuacoderSubtitle, 'Helvetica-Oblique', `NIF: ${duacoder.nif}     F.nac.: ${duacoder.bDate ? duacoder.bDate : '-'}`, textX, currentY);
            currentY += 45;

            // Skills del duacoder
            addText(colors.BodyTextColor, fontSizes.FieldTitle, 'Helvetica-Bold', 'Skills', textX, currentY)
            currentY += 27; // Agregar espacio después del título "Habilidades"
            duacoder.skills.forEach(skill => {
                addText(colors.BodyTextColor, fontSizes.FieldSubtitle, 'Helvetica', `- ${skill}`, textX, currentY)
                currentY += 20; // Espacio entre cada habilidad
            });
            currentY += 25;

            // Biografía de duacoder y gusto de tortilla
            addText(colors.BodyTextColor, fontSizes.FieldTitle, 'Helvetica-Bold', `Bio`, textX, currentY);
            currentY += 23
            addText(colors.BodyTextColor, fontSizes.DuacoderSubtitle, 'Helvetica-Oblique',
                duacoder.withOnion ? omeletteOptions.withOnion : omeletteOptions.withoutOnion, textX, currentY)
            currentY += 27;
            addText(colors.BodyTextColor, fontSizes.FieldSubtitle, 'Helvetica', `${duacoder.bio}`, textX, currentY);

            const buffer = []
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
            doc.end()
        })

        return pdfBuffer;
    }
}
