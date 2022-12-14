import { useService } from "aidbox-react/lib/hooks/service";
import { getFHIRResources } from "aidbox-react/lib/services/fhir";
import { Patient } from "../../types/aidbox";

export function usePatientsList() {
  const [patientsRD] = useService(async () => {
    const response = await getFHIRResources<Patient>("Patient", {
      _sort: "-_lastUpdated",
    });
    return response;
  });

  return { patientsRD };
}
