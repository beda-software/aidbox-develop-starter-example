import { Space, Typography } from "antd";
import { Observation, Patient } from "../../types/aidbox";
import { AddObservationModal } from "../AddObservationModal";
import { ObservationsListTable } from "../ObservationsListTable";

interface ObservationsDetailsProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  patient: Patient;
  observationsList: Observation[];
}

export function ObservationsDetails({
  showModal,
  setShowModal,
  patient,
  observationsList,
}: ObservationsDetailsProps) {
  const { Text } = Typography;

  return (
    <>
      <AddObservationModal
        showModal={showModal}
        setShowModal={setShowModal}
        patient={patient}
      />
      <Space size="middle" style={{ paddingTop: 10, paddingInline: 10 }}>
        <Text code>patient: {patient.name?.[0].family}</Text>
        <Text code>code: Hemoglobin [Mass/volume] in Blood (LOINC#718-7)</Text>
      </Space>
      <ObservationsListTable observationsList={observationsList} />
    </>
  );
}
