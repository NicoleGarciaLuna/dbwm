"use client";
import { memo, useCallback, useState, ReactNode, useMemo } from "react";
import { Modal, Table as AntTable, Tooltip, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useSearch } from "@/features/microentrepreneurs/hooks/useSearch";
import {
  COLUMN_CONFIG,
  MODAL_DELETE_TEXT,
  PAGE_SIZE,
  SEARCH_FIELDS,
} from "@/features/microentrepreneurs/types";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";
import usePersonas from "@/features/microentrepreneurs/utils/fetchData";
import { ColumnsType } from "antd/es/table";
import ActionColumn from "@/features/microentrepreneurs/components/ActionColumn";
import ListHeader from "@/features/microentrepreneurs/components/ListHeader";
import { supabaseClient } from "@/shared/utils/supabase/client";

const List = () => {
  const { data, isLoading, error, setData } = usePersonas();
  const { searchQuery, handleSearch, filteredData } = useSearch(
    data,
    SEARCH_FIELDS
  );
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<MicroentrepreneurTableProps | null>(null);

  const openModal = useCallback((item: MicroentrepreneurTableProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setIsModalOpen(false);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (selectedItem) {
      try {
        const { error } = await supabaseClient
          .from("persona")
          .update({ esta_eliminado: true })
          .eq("id_persona", selectedItem.id);

        if (error) throw error;

        console.log(`Marked item as deleted: ${selectedItem.fullName}`);
        setData(data.filter((item) => item.id !== selectedItem.id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
    closeModal();
  }, [selectedItem, closeModal, data, setData]);

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

  const dataSource = useMemo(
    () => filteredData.map((record) => ({ ...record, key: record.id })),
    [filteredData]
  );

  const handleRowClick = useCallback(
    (record: MicroentrepreneurTableProps) => {
      router.push(`/profile/${record.id}`);
    },
    [router]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      {isLoading ? (
        <Spin
          spinning={isLoading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        />
      ) : (
        <AntTable
          title={() => (
            <ListHeader
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />
          )}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: PAGE_SIZE, position: ["bottomCenter"] }}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          scroll={{ x: "max-content" }}
          sticky
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
};

export default memo(List);
