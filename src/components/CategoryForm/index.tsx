import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { useRouter } from "next/router";

import styles from "./index.module.css";
import Content from "../PageContent";
import { LEVEL_OPTIONS } from "@/pages/category";
import { categoryAdd, categoryList } from "@/api/category";
import { CategoryType } from "@/types/category";

export default function CategoryForm() {
  const [level, setLevel] = useState(1);
  const [form] = Form.useForm();
  const router = useRouter();
  const [levelOne, setLevelOne] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchLevel() {
      const res = await categoryList({ all: true, level: 1 });
      setLevelOne(res.data);
    }
    fetchLevel();
  }, []);
  const levelOneOp = useMemo(() => {
    return levelOne.map((item) => {
      value: item._id;
      level: item.name;
    });
  }, [levelOne]);

  const handleFinsh = async (values: CategoryType) => {
    await categoryAdd(values);
    message.success("added!");
    router.push("/category");
  };

  return (
    <>
      <Content title="Add Category">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={handleFinsh}
          className={styles.form}
        >
          <Form.Item
            label="Name: "
            name="name"
            rules={[{ required: true, message: "name required!" }]}
          >
            <Input placeholder="input here" />
          </Form.Item>
          <Form.Item
            label="Level: "
            name="level"
            rules={[{ required: true, message: "level required!" }]}
          >
            <Select
              options={LEVEL_OPTIONS}
              placeholder="select here"
              onChange={(value) => {
                setLevel(value);
              }}
            ></Select>
          </Form.Item>
          {level == 2 && (
            <Form.Item
              label="Parent: "
              name="level"
              rules={[{ required: true, message: "level required!" }]}
            >
              <Select
                options={levelOne}
                placeholder="select here"
              ></Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className={styles.btn}
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}
