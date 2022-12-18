import { useService } from 'aidbox-react/lib/hooks/service';
import {
    extractBundleResources,
    getFHIRResource,
    getFHIRResources,
} from 'aidbox-react/lib/services/fhir';
import { mapSuccess, sequenceMap } from 'aidbox-react/lib/services/service';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Observation, Patient } from '../../types/aidbox';

export function useObservationsList() {
    const navigate = useNavigate();

    const { patientId } = useParams();

    const [showObservationModal, setShowObservationModal] = useState(false);

    const [patientRD] = useService(async () => {
        const response = await getFHIRResource<Patient>({
            resourceType: 'Patient',
            id: patientId,
        });
        return response;
    });

    const [observationsRD, manager] = useService(async () => {
        const response = await getFHIRResources<Observation>('Observation', {
            _subject: patientId,
            _sort: '-_lastUpdated',
        });
        return mapSuccess(response, (bundle) => {
            return extractBundleResources(bundle).Observation;
        });
    }, []);

    const reloadObservationsList = () => {
        manager.reload();
    };

    const patientObservationsMapRD = sequenceMap({
        patient: patientRD,
        observations: observationsRD,
    });

    return {
        navigate,
        showObservationModal,
        setShowObservationModal,
        patientObservationsMapRD,
        reloadObservationsList,
    };
}
