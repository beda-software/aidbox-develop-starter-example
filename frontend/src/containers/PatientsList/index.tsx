import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';
import { Button, Spin } from 'antd';
import { AddPatientModal } from '../../components/AddPatientModal';
import { AppHeader } from '../../components/AppHeader';
import { PatientsListTable } from '../../components/PatientsListTable';
import { usePatientsList } from './hooks';
import s from './PatientsList.module.scss';

export function PatientsList() {
    const { showPatientModal, setShowPatientModal, patientsRD, reloadPatientsList } = usePatientsList();

    return (
        <>
            <AppHeader>
                <Button
                    key="create-patient"
                    onClick={() => setShowPatientModal(true)}
                    type={'primary'}
                >
                    Create patient
                </Button>
            </AppHeader>
            <AddPatientModal
                showPatientModal={showPatientModal}
                setShowPatientModal={setShowPatientModal}
                reloadPatientsList={reloadPatientsList}
            />
            <RenderRemoteData remoteData={patientsRD} renderLoading={() => <Spin />}>
                {(data) => (
                    <div className={s.table}>
                        <PatientsListTable patientsList={data} />
                    </div>
                )}
            </RenderRemoteData>
        </>
    );
}
