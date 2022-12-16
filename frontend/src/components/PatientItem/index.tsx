import { Typography } from 'antd';
import { Patient } from '../../types/aidbox';

interface PatientItemProps {
    patient: Patient;
}

export function PatientItem({ patient }: PatientItemProps) {
    const { Link } = Typography;

    return (
        <>
            <Link onClick={console.log}>{patient.name?.[0].family}</Link>
            {patient.meta?.createdAt}
        </>
    );
}
