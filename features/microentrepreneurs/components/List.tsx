"use client";
import { memo, useCallback, useState, useEffect, ReactNode } from "react";
import {
  Button,
  Modal,
  Input,
  Table as AntTable,
  Tooltip,
  Space,
  Row,
  Col,
  Spin,
  Typography,
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearch } from "@/features/microentrepreneurs/hooks/useSearch";
import { COLUMN_CONFIG, MODAL_DELETE_TEXT, PAGE_SIZE } from "@/shared/config";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";
import useFetchPersonas from "@/features/microentrepreneurs/utils/fetchData";
import { ColumnsType } from "antd/es/table";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useMemo } from "react";

const SEARCH_FIELDS = [
  "fullName",
  "company",
  "sector",
  "businessIdea",
  "experienceYears",
];

function List() {
  const { data, isLoading, error } = useFetchPersonas();
  const [loaded, setLoaded] = useState(false);
  const { searchQuery, handleSearch, filteredData } = useSearch(
    data,
    SEARCH_FIELDS
  );
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<MicroentrepreneurTableProps | null>(null);
  const screens = useBreakpoint();

  useEffect(() => {
    if (!isLoading && !loaded) {
      setLoaded(true);
    }
  }, [isLoading, loaded]);

  const openModal = useCallback((item: MicroentrepreneurTableProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setIsModalOpen(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedItem) {
      console.log(`Deleting item: ${selectedItem.fullName}`);
    }
    closeModal();
  }, [selectedItem, closeModal]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  const columns: ColumnsType<MicroentrepreneurTableProps> = useMemo(
    () =>
      COLUMN_CONFIG.map((column) => ({
        title: column.header,
        dataIndex: column.key,
        key: column.key,
        ellipsis: true,
        render: (
          text: string,
          record: MicroentrepreneurTableProps
        ): ReactNode =>
          column.isAction ? (
            <ActionColumn record={record} openModal={openModal} />
          ) : (
            <Tooltip placement="topLeft" title={text}>
              <span>{text}</span>
            </Tooltip>
          ),
      })),
    [openModal]
  );

  const renderTitle = useCallback(
    () => (
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ padding: "16px 0" }}
      >
        <Col flex="auto">
          <Typography.Text strong>Lista de Microempresarias</Typography.Text>
        </Col>
        <Col>
          <Space>
            <Input.Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar"
              enterButton
              style={{ width: screens.xs ? 150 : 200 }}
            />
            <Link href="/nueva-microempresaria" prefetch={true}>
              <Button type="primary" style={{ whiteSpace: "nowrap" }}>
                Nueva Microempresaria
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
    ),
    [searchQuery, handleSearchChange, screens]
  );

  const dataSource = useMemo(
    () => filteredData.map((record) => ({ ...record, key: record.id })),
    [filteredData]
  );

  const handleRowClick = useCallback(
    (record: MicroentrepreneurTableProps) => {
      router.push(`/microempresaria/${record.id}`);
    },
    [router]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      {loaded ? (
        <AntTable
          title={renderTitle}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: PAGE_SIZE, position: ["bottomCenter"] }}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          scroll={{ x: "max-content" }}
          sticky
        />
      ) : (
        <Spin
          spinning={isLoading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        />
      )}
      <Modal
        title="Confirmación de eliminación de la microempresaria"
        open={isModalOpen}
        onOk={confirmDelete}
        onCancel={closeModal}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <Typography.Paragraph>
          {MODAL_DELETE_TEXT} {selectedItem?.fullName}?
        </Typography.Paragraph>
      </Modal>
    </section>
  );
}

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

export default memo(List);
