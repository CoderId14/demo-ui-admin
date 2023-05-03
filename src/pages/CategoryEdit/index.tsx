import { useFetchCategories, useUpdateCategory } from "@/services/categoryService";
import { useUpdateChapter } from "@/services/chapterService";
import { Category } from "@/types/category/category.type";
import { Chapter } from "@/types/chapter/chapter.type";
import { ContainerOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Skeleton, Space, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Title, Paragraph } = Typography


function CategoryEdit() {
  const { id } = useParams()
  const [form] = Form.useForm();
    const updateCategoryMutation = useUpdateCategory();
  const { data, error, isFetching } = useFetchCategories({id: Number(id)})
  const navigate = useNavigate();
  let category;
    if(data?.content){
        category = data?.content[0];
    }
  const onFinish = (values: any) => {
    const categoryUpdateInfo: Category = {
      ...values,
      categoryId: Number(id)
    }
    updateCategoryMutation.mutate(categoryUpdateInfo)
    navigate(-1)
    console.log('Received values of form: ', { ...values, id: id })
  }
  if(isFetching){
    return <Skeleton></Skeleton>
  }
    return ( 
    <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
            categoryName: category?.categoryName,
            description: category?.description
        }}
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

export default CategoryEdit;