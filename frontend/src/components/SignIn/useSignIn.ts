import { isSuccess } from 'aidbox-react/lib/libs/remoteData';
import { notification } from 'antd';

import { setToken, signin, SigninBody } from '../../services/auth';

export function useSignIn() {
    const onFinish = async (values: SigninBody) => {
        const signinResponse = await signin(values);
        if (isSuccess(signinResponse)) {
            const { access_token } = signinResponse.data;
            setToken(access_token);
            window.location.reload();
        } else {
            notification.error({
                message: signinResponse.error.error_description
                    ? signinResponse.error.error_description
                    : JSON.stringify(signinResponse.error),
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.warn('Login error: ', errorInfo);
    };

    return { onFinish, onFinishFailed };
}
