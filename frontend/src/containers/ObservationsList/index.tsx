import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';
import { Button, Space, Spin } from 'antd';
import { AppHeader } from '../../components/AppHeader';
import { ObservationsDetails } from '../../components/ObservationsDetails';
import { useObservationsList } from './hooks';

export function ObservationsList() {
    const {
        navigate,
        showObservationModal,
        setShowObservationModal,
        patientObservationsMapRD,
        reloadObservationsList,
    } = useObservationsList();

    return (
        <>
            <AppHeader>
                <Space size="middle">
                    <Button onClick={() => setShowObservationModal(true)} type="primary">
                        Add observation
                    </Button>
                    <Button onClick={() => navigate('main')}>Back</Button>
                </Space>
            </AppHeader>
            <RenderRemoteData remoteData={patientObservationsMapRD} renderLoading={() => <Spin />}>
                {(data) => (
                    <ObservationsDetails
                        showObservationModal={showObservationModal}
                        setShowObservationModal={setShowObservationModal}
                        patient={data.patient}
                        observationsList={data.observations}
                        reloadObservationsList={reloadObservationsList}
                    />
                )}
            </RenderRemoteData>
        </>
    );
}
