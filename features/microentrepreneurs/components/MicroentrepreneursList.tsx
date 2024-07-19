"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Pagination, Input, Button, Modal, Spin } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { fetchPersonasConDatos } from "../utils/fetchTable";
import { usePagination } from "@/features/microentrepreneurs/hooks/usePagination";
import { useSearch } from "@/features/microentrepreneurs/hooks/useSearch";
import {
  COLUMN_CONFIG,
  MODAL_DELETE_TEXT,
  SEARCH_INPUT_WIDTH,
  PAGE_SIZE,
} from "@/shared/config";

import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";

const MicroentrepreneursList = () => {
  const [data, setData] = useState<MicroentrepreneurTableProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    selectedMicroentrepreneur: MicroentrepreneurTableProps | null;
  }>({
    isVisible: false,
    selectedMicroentrepreneur: null,
  });
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const formattedData = await fetchPersonasConDatos();
        if (formattedData) setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const { searchQuery, handleSearch, filteredData } = useSearch(data, [
    "fullName",
    "company",
    "sector",
    "businessIdea",
  ]);

  const { currentPage, totalPages, handlePageChange, paginatedData } =
    usePagination(filteredData.length);

  const handleDelete = useCallback(
    (microentrepreneur: MicroentrepreneurTableProps) => {
      setModalState({
        isVisible: true,
        selectedMicroentrepreneur: microentrepreneur,
      });
    },
    []
  );

  const confirmDelete = useCallback(() => {
    setModalState({ isVisible: false, selectedMicroentrepreneur: null });
    console.log(
      `Deleting microentrepreneur: ${modalState.selectedMicroentrepreneur?.fullName}`
    );
  }, [modalState.selectedMicroentrepreneur]);

  const columns = useMemo(
    () =>
      COLUMN_CONFIG.map((column) => ({
        title: column.header,
        dataIndex: column.key,
        key: column.key,
        render: (text: any, record: MicroentrepreneurTableProps) =>
          column.isAction ? (
            <div className="flex space-x-2">
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(record);
                }}
                className="text-red-500 cursor-pointer"
              />
              <EyeOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/microempresaria/${record.id}`);
                }}
                className="text-blue-500 cursor-pointer"
              />
            </div>
          ) : (
            text
          ),
      })),
    [handleDelete, router]
  );

  return (
    <section className="p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="ml-auto flex items-center space-x-2">
              <Input.Search
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search"
                enterButton
                style={{ width: SEARCH_INPUT_WIDTH }}
              />
              <Button
                type="primary"
                onClick={() => router.push("/nueva-microempresaria")}
              >
                Nueva Microempresaria
              </Button>
            </div>
          </div>
          <Spin spinning={isLoading} tip="Cargando...">
            <Table
              columns={columns}
              dataSource={paginatedData(filteredData).map((record) => ({
                ...record,
                key: record.id,
              }))}
              pagination={false}
              onRow={(record) => ({
                onClick: () => {
                  router.push(`/microempresaria/${record.id}`);
                },
              })}
            />
          </Spin>
          <Pagination
            current={currentPage}
            total={totalPages * PAGE_SIZE}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Modal
        title="Confirmación de eliminación de la microempresaria"
        open={modalState.isVisible}
        onOk={confirmDelete}
        onCancel={() => setModalState({ ...modalState, isVisible: false })}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          {MODAL_DELETE_TEXT} {modalState.selectedMicroentrepreneur?.fullName}?
        </p>
      </Modal>
    </section>
  );
};

export default MicroentrepreneursList;
