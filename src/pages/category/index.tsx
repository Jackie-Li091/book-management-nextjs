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
  Tag,
  Modal,
  message,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "@/pages/category/index.module.css";
import dayjs from "dayjs";
import { categoryDelete, categoryList } from "@/api/category";
import { CategoryQueryType } from "@/types/category";
import Content from "@/components/PageContent/index";

const LEVEL = {
  ONE: 1,
  TWO: 2,
};
const LEVEL_OPTIONS = [
  { label: "level 1", value: LEVEL.ONE },
  { label: "level 2", value: LEVEL.TWO },
];

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 140,
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
    render: (text: number) => {
      return <Tag color={text === 1 ? "green" : "cyan"}>{`Level ${text}`}</Tag>;
    },
    width: 100,
  },
  {
    title: "Belong",
    dataIndex: "parent",
    key: "parent",
    width: 120,
    render: (text: { name: string }) => {
      return text?.name ?? "";
    },
  },
  {
    title: "Create time",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
];

export default function Category() {
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

  //auto refresh after delete
  async function fetchData(values?: any) {
    const res = await categoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values,
    });
    const { data } = res;
    setData(data);
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = async (values: CategoryQueryType) => {
    const res = await categoryList({
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

  const handleCategoryEdit = () => {
    router.push("/category/edit/id");
  };
  const handleCategoryDelete = (id: string) => {
    Modal.confirm({
      title: "Delete confirm?",
      okText: "Confirm",
      cancelText: "Cancel",
      async onOk() {
        await categoryDelete(id);
        message.success("Delete success");
        fetchData(form.getFieldsValue());
      },
    });
  };
  const handlePageChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    categoryList({
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
            <Button type="link" onClick={handleCategoryEdit}>
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                handleCategoryDelete(row._id);
              }}
            >
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
        title="Category List"
        operation={
          <Button
            type="primary"
            onClick={() => {
              router.push("/category/add");
            }}
          >
            Add Category
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
          <Row gutter={25}>
            <Col span={10}>
              <Form.Item name="name" label="Name:">
                <Input placeholder="input here" allowClear />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="level" label="Level:">
                <Select
                  allowClear
                  showSearch
                  placeholder="select:"
                  options={LEVEL_OPTIONS}
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
