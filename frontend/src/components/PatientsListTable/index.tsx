import { Table } from "antd";
import { Patient } from "../../types/aidbox";

interface Props {
  patientList: Patient[];
}

export function PatientsListTable({ patientList }: Props) {
  const goToPatientData = (patient: Patient) => {};

  const dataSource = patientList.map((patient: Patient) => {
    return {
      key: patient.id,
      patient: (
        <div onClick={() => goToPatientData(patient)}>
          {patient.name ? String(patient.name[0].family) : patient.id}
        </div>
      ),
      lastUpdated: <div>{patient.meta?.lastUpdated}</div>,
    };
  });

  const columns = [
    {
      title: <b>Patient</b>,
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: <b>Last updated</b>,
      dataIndex: "lastUpdated",
      key: "lastUpdated",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} bordered />;
}
