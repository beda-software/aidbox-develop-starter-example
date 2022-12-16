import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { extractBundleResources } from "aidbox-react/lib/services/fhir";
import { Button, Space, Spin } from "antd";
import { AppHeader } from "../../components/AppHeader";
import { ObservationsDetails } from "../../components/ObservationsDetails";
import { useObservationsList } from "./hooks";

export function ObservationsList() {
  const { navigate, showObservationModal, setShowObservationModal, patientObservationsMapRD } =
    useObservationsList();

  return (
    <>
      <AppHeader>
        <Space size="middle">
          <Button onClick={() => setShowObservationModal(true)} type="primary">
            Add observation
          </Button>
          <Button onClick={() => navigate("main")}>Back</Button>
        </Space>
      </AppHeader>
      <RenderRemoteData
        remoteData={patientObservationsMapRD}
        renderLoading={() => <Spin />}
      >
        {(data) => (
          <ObservationsDetails
            showObservationModal={showObservationModal}
            setShowObservationModal={setShowObservationModal}
            patient={data.patient}
            observationsList={
              extractBundleResources(data.observations).Observation
            }
          />
        )}
      </RenderRemoteData>
    </>
  );
}
