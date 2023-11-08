import {
  Button,
  Form,
  Input,
  Row,
  Select,
  Space,
  Col,
  Table,
  TablePaginationConfig,
  Image,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "@/pages/book/index.module.css";
import dayjs from "dayjs";
import { bookList } from "@/api/book";
import { BookQueryType } from "@/types/book";
import Content from "@/components/PageContent/index";

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 140,
  },
  {
    title: "Page",
    dataIndex: "cover",
    key: "cover",
    render: (text: string) => {
      return <Image width={80} src={text} alt="cover" />;
    },
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    width: 100,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 120,
  },
  {
    title: "Des",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 220,
  },
  {
    title: "Storage",
    dataIndex: "stock",
    key: "stock",
    width: 90,
  },
  {
    title: "Create time",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [data, setData] = useState([]);
  //page separte
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await bookList({ current: 1, pageSize: pagination.pageSize });
      const { data } = res;
      setData(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = async (values: BookQueryType) => {
    const res = await bookList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };
  const handleClear = () => {
    form.resetFields();
  };

  const handleBookEdit = () => {
    router.push("/book/edit/id");
  };
  const handleBookDelete = () => {
    router.push("/book/delete/id");
  };
  const handlePageChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    bookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };
  const columns = [
    ...COLUMNS,
    {
      title: "Action",
      key: "action",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button type="link" onClick={handleBookEdit}>
              Edit
            </Button>
            <Button type="link" danger onClick={handleBookDelete}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Content
        title="Book List"
        operation={
          <Button
            type="primary"
            onClick={() => {
              router.push("/book/add");
            }}
          >
            Add book
          </Button>
        }
      >
        <Form
          name="searchForm"
          form={form}
          layout="inline"
          onFinish={onSearch}
          initialValues={{
            name: "",
            author: "",
            category: "",
          }}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item name="name" label="Name:">
                <Input placeholder="input here" allowClear />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="author" label="Author:">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="category" label="Category:">
                <Select
                  allowClear
                  showSearch
                  placeholder="select:"
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                  <Button htmlType="submit" onClick={handleClear}>
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={styles.table}>
          <Table
            dataSource={data}
            columns={columns}
            scroll={{ x: 1000 }}
            pagination={{
              ...pagination,
              showTotal: () => `Total: ${pagination.total}`,
            }}
            onChange={handlePageChange}
          />
        </div>
      </Content>
    </>
  );
}
