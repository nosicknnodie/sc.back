import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity({name: 'upload_file'})
export class UploadFile extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'field_name' })
    public fieldName: string;

    @IsNotEmpty()
    @Column({ name: 'origin_name' })
    public originName: string;

    @IsNotEmpty()
    @Column({ name: 'encoding' })
    public encoding: string;

    @IsNotEmpty()
    @Column({ name: 'mime_type' })
    public mimeType: string;

    @IsNotEmpty()
    @Column({ name: 'file_name' })
    public fileName: string;

    @IsNotEmpty()
    @Column({ name: 'size' })
    public size: number;

    @IsNotEmpty()
    @Column({ name: 'destination' })
    public destination: string;

    public toString(): string {
        return `${this.fileName}`;
    }

}
