import { useAddTag } from '@/services/tagService'
import { ITag } from '@/types/tag/tag.type'
import { ContainerOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

function TagAdd() {
  const [form] = Form.useForm()
  const updateTagMutation = useAddTag()
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    const tagUpdateInfo: ITag = {
      ...values
    }
    updateTagMutation.mutate(tagUpdateInfo)
    navigate(-1)
  }

  return (
    <Form form={form} onFinish={onFinish}>
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

export default TagAdd
