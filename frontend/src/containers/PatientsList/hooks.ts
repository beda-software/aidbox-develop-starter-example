import { useService } from 'aidbox-react/lib/hooks/service';
import { extractBundleResources, getFHIRResources } from 'aidbox-react/lib/services/fhir';
import { mapSuccess } from 'aidbox-react/lib/services/service';
import { useState } from 'react';
import { Patient } from '../../types/aidbox';

export function usePatientsList() {
    const [showPatientModal, setShowPatientModal] = useState(false);

    const [patientsRD] = useService(async () => {
        const response = await getFHIRResources<Patient>('Patient', {
            _sort: '-_lastUpdated',
        });
        return mapSuccess(response, (bundle) => {
            return extractBundleResources(bundle).Patient;
        });
    }, [showPatientModal]);

    return { showPatientModal, setShowPatientModal, patientsRD };
}
