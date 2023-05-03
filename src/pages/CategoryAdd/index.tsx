import { useAddCategory } from "@/services/categoryService";
import { Category } from "@/types/category/category.type";
import { ContainerOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography


function CategoryAdd() {
  const [form] = Form.useForm();
    const useAddCategoryMutation = useAddCategory();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const categoryUpdateInfo: Category = {
      ...values,
    }
    useAddCategoryMutation.mutate(categoryUpdateInfo)
    navigate(-1)
    console.log('Received values of form: ', { ...values, })
  }

    return ( 
    <Form
        form={form}
        onFinish={onFinish}
      >
        <Divider orientation='left'>
          <Space style={{ display: 'flex', alignItems: 'center' }}>
            <ContainerOutlined style={{ fontSize: 32 }} />
            <Title level={3}>Category Name</Title>
          </Space>
        </Divider>
        <Form.Item name='categoryName'>
          <Input placeholder='Category Name' />
        </Form.Item>
        <Divider orientation='left'>
          <Space style={{ display: 'flex', alignItems: 'center' }}>
            <ContainerOutlined style={{ fontSize: 32 }} />
            <Title level={3}>Description</Title>
          </Space>
        </Divider>
        <Form.Item name='description'>
          <Input placeholder='Description' />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Button type='primary' htmlType='submit' size='large'>
            Submit
          </Button>
        </Form.Item>
      </Form> );
}

export default CategoryAdd;