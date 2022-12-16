import { Space, Typography } from "antd";
import { Observation, Patient } from "../../types/aidbox";
import { AddObservationModal } from "../AddObservationModal";
import { ObservationsListTable } from "../ObservationsListTable";
import s from "./ObservationsDetails.module.scss";

interface ObservationsDetailsProps {
  showObservationModal: boolean;
  setShowObservationModal: (showObservationModal: boolean) => void;
  patient: Patient;
  observationsList: Observation[];
}

export function ObservationsDetails({
  showObservationModal,
  setShowObservationModal,
  patient,
  observationsList,
}: ObservationsDetailsProps) {
  const { Text } = Typography;

  return (
    <>
      <AddObservationModal
        showObservationModal={showObservationModal}
        setShowObservationModal={setShowObservationModal}
        patient={patient}
      />
      <Space size="middle" className={s.space}>
        <Text code>patient: {patient.name?.[0].family}</Text>
        <Text code>code: Hemoglobin [Mass/volume] in Blood (LOINC#718-7)</Text>
      </Space>
      <div className={s.table}>
        <ObservationsListTable observationsList={observationsList} />
      </div>
    </>
  );
}
