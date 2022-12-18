import { Alert, Space } from 'antd';
import s from './AlertFailure.module.scss';

interface AlertFailureProps {
    error: any;
}

export function AlertFailure({ error }: AlertFailureProps) {
    return (
        <Space direction="vertical" className={s.space}>
            <Alert message={JSON.stringify(error)} type="error" />
        </Space>
    );
}
