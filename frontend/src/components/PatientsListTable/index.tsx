import { Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../types/aidbox";

interface Props {
  patientList: Patient[];
}

export function PatientsListTable({ patientList }: Props) {
  const navigate = useNavigate();

  const goToPatientData = (patient: Patient) =>
    navigate(`/patients/${patient.id}`);

  const { Text, Link } = Typography;

  const dataSource = patientList.map((patient: Patient) => {
    return {
      key: patient.id,
      patient: (
        <Link onClick={() => goToPatientData(patient)}>
          {patient.name ? String(patient.name[0].family) : patient.id}
        </Link>
      ),
      lastUpdated: <Text>{patient.meta?.lastUpdated}</Text>,
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
