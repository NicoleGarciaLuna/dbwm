"use client";
import { useState, useMemo } from "react";
import { Table, Pagination, Input } from "antd";
import { Microentrepreneur } from "../../types";
import { columnConfig } from "../../data/columnConfig";

type MicroentrepreneursListProps = {
  data: Microentrepreneur[];
};

const MicroentrepreneursList = ({ data }: MicroentrepreneursListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (microentrepreneur) =>
        microentrepreneur.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        microentrepreneur.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        microentrepreneur.sector
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        microentrepreneur.mainActivity
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const columns = columnConfig.map((column) => ({
    title: column.header,
    dataIndex: column.key,
    key: column.key,
    render: column.isAction
      ? () => <button className="text-blue-500">Action</button>
      : undefined,
  }));

  return (
    <section className="p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <Input.Search
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search"
              enterButton
            />
            {/* Add other controls like filters, actions, etc. here */}
          </div>
          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            total={totalPages * 10}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default MicroentrepreneursList;
