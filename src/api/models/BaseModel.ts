import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel {
    @PrimaryColumn('uuid')
    public idx: string;

    @CreateDateColumn({ name: 'reg_dt' })
    public regDt: Date;

    @UpdateDateColumn({ name: 'edt_dt' })
    public edtDt: Date;
}
