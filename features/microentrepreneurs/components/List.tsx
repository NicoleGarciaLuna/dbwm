"use client";
import { memo, useReducer, useMemo, useCallback, ReactNode } from "react";
import {
  Button,
  Modal,
  Spin,
  Input,
  Table as AntTable,
  Tooltip,
  Space,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearch } from "@/features/microentrepreneurs/hooks/useSearch";
import { COLUMN_CONFIG, MODAL_DELETE_TEXT, PAGE_SIZE } from "@/shared/config";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";
import useFetchPersonas from "@/features/microentrepreneurs/hooks/useFetchPersonas";
import { ColumnsType } from "antd/es/table";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"; // Importa el hook useBreakpoint

const Table = AntTable;

const SEARCH_FIELDS = ["fullName", "company", "sector", "businessIdea"];

type ModalState = {
  isVisible: boolean;
  selectedItem: MicroentrepreneurTableProps | null;
};

type ModalAction =
  | { type: "OPEN"; payload: MicroentrepreneurTableProps }
  | { type: "CLOSE" };

const initialState: ModalState = {
  isVisible: false,
  selectedItem: null,
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN":
      return { isVisible: true, selectedItem: action.payload };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
}

function List() {
  const { data, isLoading, error } = useFetchPersonas();
  const { searchQuery, handleSearch, filteredData } = useSearch(
    data,
    SEARCH_FIELDS
  );
  const router = useRouter();
  const [modalState, dispatch] = useReducer(modalReducer, initialState);
  const screens = useBreakpoint(); // Utiliza el hook useBreakpoint para obtener los tamaños de pantalla

  const openModal = useCallback(
    (item: MicroentrepreneurTableProps) => {
      dispatch({ type: "OPEN", payload: item });
    },
    [dispatch]
  );

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  const confirmDelete = useCallback(() => {
    if (modalState.selectedItem) {
      console.log(`Deleting item: ${modalState.selectedItem.fullName}`);
    }
    closeModal();
  }, [modalState, closeModal]);

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
        style={{
          padding: "16px 0",
        }}
        gutter={[16, 16]} // Añadir espacio entre elementos de la cuadrícula
        justify="space-between" // Asegurar que los elementos se distribuyan correctamente
        align="middle" // Alinear elementos verticalmente en el centro
      >
        <Col flex="auto" style={{ textAlign: "left", fontWeight: "bold" }}>
          Lista de Microempresarias
        </Col>
        <Col>
          <Space>
            <Input.Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar"
              enterButton
              style={{ width: screens.xs ? 150 : 200 }} // Ajustar el ancho dependiendo del tamaño de la pantalla
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <AntTable
        title={renderTitle}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: PAGE_SIZE, position: ["bottomCenter"] }}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        scroll={{ x: "max-content" }}
        sticky
      />
      <Modal
        title="Confirmación de eliminación de la microempresaria"
        open={modalState.isVisible}
        onOk={confirmDelete}
        onCancel={closeModal}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>
          {MODAL_DELETE_TEXT} {modalState.selectedItem?.fullName}?
        </p>
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

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin />
  </div>
);

export default memo(List);
