import { useService } from 'aidbox-react/lib/hooks/service';
import { getFHIRResource, getFHIRResources } from 'aidbox-react/lib/services/fhir';
import { sequenceMap } from 'aidbox-react/lib/services/service';
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

    const [observationsRD] = useService(async () => {
        const response = await getFHIRResources<Observation>('Observation', {
            _subject: patientId,
            _sort: '-_lastUpdated',
        });
        return response;
    }, [showObservationModal]);

    const patientObservationsMapRD = sequenceMap({
        patient: patientRD,
        observations: observationsRD,
    });

    return { navigate, showObservationModal, setShowObservationModal, patientObservationsMapRD };
}
