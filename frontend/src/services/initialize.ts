import { setInstanceBaseURL } from 'aidbox-react/lib/services/instance';

import config from './config';

export function init(baseURL?: string) {
    setInstanceBaseURL(baseURL ?? config.baseURL);
}
