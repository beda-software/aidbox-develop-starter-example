import { Table } from "antd";
import { Observation } from "../../types/aidbox";
import { formatHumanDateTime } from "../../utils/date";

interface ObservationsListTableProps {
  observationsList: Observation[];
}

export function ObservationsListTable({
  observationsList,
}: ObservationsListTableProps) {
  const dataSource = observationsList.map((observation) => {
    return {
      key: observation.id,
      observation: observation.value?.Quantity?.value,
      unit: observation.value?.Quantity?.unit,
      dateTime: formatHumanDateTime(observation.effective?.dateTime || ""),
      lastUpdated: formatHumanDateTime(observation.meta?.lastUpdated || ""),
    };
  });

  const columns = [
    {
      title: <b>Value</b>,
      dataIndex: "observation",
      key: "observation",
    },
    {
      title: <b>Unit</b>,
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: <b>Date & Time</b>,
      dataIndex: "dateTime",
      key: "dateTime",
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
