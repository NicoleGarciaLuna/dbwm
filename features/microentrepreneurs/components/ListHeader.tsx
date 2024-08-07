import { memo } from "react";
import { Input, Button, Space, Row, Col, Typography, Grid } from "antd";
import Link from "next/link";

const { useBreakpoint } = Grid;

type ListHeaderProps = {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ListHeader = memo(
  ({ searchQuery, handleSearchChange }: ListHeaderProps) => {
    const screens = useBreakpoint();

    return (
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
            
          </Space>
        </Col>
      </Row>
    );
  }
);

ListHeader.displayName = "ListHeader";

export default ListHeader;
