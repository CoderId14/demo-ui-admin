import { useAddChapter } from '@/services/chapterService'
import { Chapter } from '@/types/chapter/chapter.type'
import { ContainerOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Space, Typography } from 'antd'
import { useParams } from 'react-router-dom'
const { Title } = Typography

function ChapterImgAdd() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const useAddChapterMutation = useAddChapter()
  const onFinish = (values: any) => {
    const chaperAddInfo: Chapter = {
        ...values,
        content: "this is comic",
        bookId: Number(id)
      }
    useAddChapterMutation.mutate(chaperAddInfo)
    console.log('Received values of form: ', { ...values })
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Title</Title>
        </Space>
      </Divider>
      <Form.Item name='title'>
        <Input placeholder='Title' />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ChapterImgAdd
