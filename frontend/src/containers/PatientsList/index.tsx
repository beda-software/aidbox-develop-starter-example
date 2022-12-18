import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';
import { Button } from 'antd';
import { AddPatientModal } from '../../components/AddPatientModal';
import { AlertFailure } from '../../components/AlertFailure';
import { AppHeader } from '../../components/AppHeader';
import { Loader } from '../../components/Loader';
import { PatientsListTable } from '../../components/PatientsListTable';
import { usePatientsList } from './hooks';
import s from './PatientsList.module.scss';

export function PatientsList() {
    const { showPatientModal, setShowPatientModal, patientsRD, reloadPatientsList } =
        usePatientsList();

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
            <RenderRemoteData
                remoteData={patientsRD}
                renderFailure={(error) => <AlertFailure error={error} />}
                renderLoading={() => <Loader />}
            >
                {(data) => (
                    <div className={s.table}>
                        <PatientsListTable patientsList={data} />
                    </div>
                )}
            </RenderRemoteData>
        </>
    );
}
