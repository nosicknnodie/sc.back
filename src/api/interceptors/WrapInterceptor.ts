import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';

@Interceptor()
export class WrapInterceptor implements InterceptorInterface {
    // constructor(
    //     @Logger(__filename) private log: LoggerInterface
    // ) { }
    // tslint:disable-next-line:typedef
    public intercept(action: Action, content: any) {
        // const _data: any = {};
        // _data.result = 'OK';
        // _data.message = '';
        // _data.data = (content ? content : {});
        return content;
    }

}
