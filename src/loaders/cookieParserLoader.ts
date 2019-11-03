import cookieParser from 'cookie-parser';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

export const cookieParserLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp.use(cookieParser());
    }
};
