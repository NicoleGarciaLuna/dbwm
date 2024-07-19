"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
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

export type MicroentrepreneurTableProps = {
  id: number;
  fullName: string;
  company: string;
  sector: string;
  businessIdea: string;
  experienceYears: string;
};

export type Persona = {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
};

export type Emprendimiento = {
  nombre_emprendimiento?: string;
  tiempo_operacion?: string;
  sector_economico?: string;
};

export type IdeaNegocio = {
  descripcion_breve?: string;
};

export type Diagnostico = {
  id_diagnostico: number;
  fecha_diagnostico: string;
  id_persona: number;
  emprendimiento?: Emprendimiento;
  idea_negocio?: IdeaNegocio;
  persona: Persona;
};

const MicroentrepreneursList = () => {
  const [data, setData] = useState<MicroentrepreneurTableProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMicroentrepreneur, setSelectedMicroentrepreneur] =
    useState<MicroentrepreneurTableProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const formattedData = await fetchPersonasConDatos();
        console.log("Datos formateados obtenidos en useEffect:", formattedData);
        if (formattedData) {
          setData(formattedData);
        }
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
      setSelectedMicroentrepreneur(microentrepreneur);
      setIsModalVisible(true);
    },
    []
  );

  const confirmDelete = useCallback(() => {
    setIsModalVisible(false);
    console.log(
      `Deleting microentrepreneur: ${selectedMicroentrepreneur?.fullName}`
    );
  }, [selectedMicroentrepreneur]);

  const columns = useMemo(
    () =>
      COLUMN_CONFIG.map((column) => ({
        title: column.header,
        dataIndex: column.key,
        key: column.key,
        render: (text: string, record: MicroentrepreneurTableProps) => {
          if (column.isAction) {
            return (
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
            );
          }
          return text;
        },
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
        open={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          {MODAL_DELETE_TEXT} {selectedMicroentrepreneur?.fullName}?
        </p>
      </Modal>
    </section>
  );
};

export default MicroentrepreneursList;
