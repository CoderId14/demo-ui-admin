import { useFetchTags, useUpdateTag } from '@/services/tagService'
import { ITag } from '@/types/tag/tag.type'
import { ContainerOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Skeleton, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Title } = Typography

function TagEdit() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const updateTagMutation = useUpdateTag()
  const { data, isFetching } = useFetchTags({ id: Number(id) })
  const navigate = useNavigate()
  let tag
  if (data?.content) {
    tag = data?.content[0]
  }
  const onFinish = (values: any) => {
    const tagUpdateInfo: ITag = {
      ...values,
      tagId: Number(id)
    }
    updateTagMutation.mutate(tagUpdateInfo)
    navigate(-1)
    console.log('Received values of form: ', { ...values, id: id })
  }
  if (isFetching) {
    return <Skeleton></Skeleton>
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        tagName: tag?.tagName,
        description: tag?.description
      }}
    >
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Tag Name</Title>
        </Space>
      </Divider>
      <Form.Item name='tagName'>
        <Input placeholder='Tag Name' />
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
    </Form>
  )
}

export default TagEdit
