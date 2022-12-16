import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { extractBundleResources } from "aidbox-react/lib/services/fhir";
import { Button, Spin } from "antd";
import { AddPatientModal } from "../../components/AddPatientModal";
import { AppHeader } from "../../components/AppHeader";
import { PatientsListTable } from "../../components/PatientsListTable";
import { usePatientsList } from "./hooks";

export function PatientsList() {
  const { showModal, setShowModal, patientsRD } = usePatientsList();

  return (
    <>
      <AppHeader>
        <Button
          key="create-patient"
          onClick={() => setShowModal(true)}
          type={"primary"}
        >
          Create patient
        </Button>
      </AppHeader>
      <AddPatientModal showModal={showModal} setShowModal={setShowModal} />
      <RenderRemoteData remoteData={patientsRD} renderLoading={() => <Spin />}>
        {(data) => (
          <PatientsListTable
            patientsList={extractBundleResources(data).Patient}
          />
        )}
      </RenderRemoteData>
    </>
  );
}
