import fs from 'fs';
import mkdirp from 'mkdirp';
import multer from 'multer';
import * as path from 'path';

export const fileOptions = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const d = new Date(Date.now());
            const dir = path.join(__dirname, '../../public/upload/', `${d.getFullYear()}_${d.getUTCMonth()}`);
            if (!fs.existsSync(dir)) {    // directory check
                mkdirp(dir);
            }
            cb(undefined, dir);
        },
        filename: (req: any, file: any, cb: any) => {
            const ext = path.extname(file.originalname);
            const originName: string = file.originalname;
            const fileName = originName.replace(ext, '') + '-' + Date.now() + ext;
            cb(undefined, fileName);
        },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'));
        }
        cb(undefined, true);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2,
    },
};
