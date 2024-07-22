import { memo } from "react";
import { Tooltip, Space } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";

type ActionColumnProps = {
  record: MicroentrepreneurTableProps;
  openModal: (item: MicroentrepreneurTableProps) => void;
};

const ActionColumn = memo(({ record, openModal }: ActionColumnProps) => (
  <Space>
    <Tooltip title="Eliminar">
      <DeleteOutlined
        onClick={(e) => {
          e.stopPropagation();
          openModal(record);
        }}
        style={{ color: "red", cursor: "pointer" }}
      />
    </Tooltip>
    <Tooltip title="Ver detalles">
      <Link href={`/microempresaria/${record.id}`} prefetch={true}>
        <EyeOutlined style={{ color: "blue", cursor: "pointer" }} />
      </Link>
    </Tooltip>
  </Space>
));
ActionColumn.displayName = "ActionColumn";

export default ActionColumn;
