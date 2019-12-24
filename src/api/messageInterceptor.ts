import {Action, InterceptorInterface} from "routing-controllers";

export class MessageInterceptor implements InterceptorInterface {
    public intercept(action: Action, content: any): any {
        let ret: any = {
            status: 200,
            time: Date.now()
        };
        if (content || content === 0) {
            ret.result = content;
            if (content.__user) {
                ret.user = content.__user;
                ret.result.__user = undefined;
            }
        }

        return ret;
    }
}
