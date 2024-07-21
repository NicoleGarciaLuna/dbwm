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
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearch } from "@/features/microentrepreneurs/hooks/useSearch";
import { COLUMN_CONFIG, MODAL_DELETE_TEXT, PAGE_SIZE } from "@/shared/config";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";
import useFetchPersonas from "@/features/microentrepreneurs/hooks/useFetchPersonas";
import { ColumnsType } from "antd/es/table";

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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Space>
          <Input.Search
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar"
            enterButton
            style={{ minWidth: 200 }}
          />
          <Link href="/nueva-microempresaria" prefetch={true}>
            <Button type="primary">Nueva Microempresaria</Button>
          </Link>
        </Space>
      </div>
    ),
    [searchQuery, handleSearchChange]
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
      <Table
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
    <Spin tip="Cargando..." />
  </div>
);

export default memo(List);
