import { Spin } from 'antd';
import s from './Loader.module.scss';

export function Loader() {
    return (
        <div className={s.container}>
            <Spin />
        </div>
    );
}
