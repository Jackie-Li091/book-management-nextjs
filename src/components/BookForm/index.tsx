import React, { useReducer, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Image,
  message,
} from "antd";
import { bookAdd } from "@/api/book";
import { BookType } from "@/types/book";
import { useRouter } from "next/router";

import styles from "./index.module.css";
import dayjs from "dayjs";
import Content from "../PageContent";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function BookForm() {
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const handleFinsh = async (values: BookType) => {
    if (values.publishAt) values.publishAt = dayjs(values.publishAt).valueOf();

    await bookAdd(values);
    message.success("added!");
    router.push("/book");
  };

  return (
    <>
    <Content title="Add Book">
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
          label="Author: "
          name="author"
          rules={[{ required: true, message: "author required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category: "
          name="category"
          rules={[{ required: true, message: "category required!" }]}
        >
          <Select placeholder="select here">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cover Image: " name="cover">
          <Input.Group compact>
            <Input
              style={{ width: "500px" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}
            >
              preview
            </Button>
          </Input.Group>
        </Form.Item>
        {preview && (
          <Form.Item label="" colon={false}>
            <Image src={preview} width={100} height={100} alt="preivew" />
          </Form.Item>
        )}
        <Form.Item label="Publish Date: " name="publishAt">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Storage: " name="stock">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Des: " name="description">
          <TextArea rows={4} />
        </Form.Item>

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
