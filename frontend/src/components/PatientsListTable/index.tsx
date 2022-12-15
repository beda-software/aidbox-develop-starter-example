import { Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../types/aidbox";
import { formatHumanDateTime } from "../../utils/date";

interface PatientsListTableProps {
  patientsList: Patient[];
}

export function PatientsListTable({ patientsList }: PatientsListTableProps) {
  const navigate = useNavigate();

  const goToPatientData = (patient: Patient) =>
    navigate(`/patients/${patient.id}`);

  const { Link } = Typography;

  const dataSource = patientsList.map((patient: Patient) => {
    return {
      key: patient.id,
      patient: (
        <Link onClick={() => goToPatientData(patient)}>
          {patient.name ? String(patient.name[0].family) : patient.id}
        </Link>
      ),
      lastUpdated: formatHumanDateTime(patient.meta?.lastUpdated || ""),
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      style={{ padding: 10 }}
    />
  );
}
