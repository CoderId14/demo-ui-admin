import { useFetchChaptersImg, useSaveBulkChapterImg } from '@/services/chapterImgService'
import { useFetchChapter, useUpdateChapter } from '@/services/chapterService'
import { Chapter } from '@/types/chapter/chapter.type'
import { SaveBulkChapterRequest } from '@/types/chapter/chapterImg.type'
import { ContainerOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Skeleton, Space, Typography } from 'antd'
import { useParams } from 'react-router-dom'
const { Title } = Typography

function ChapterImgEdit() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const { data, isFetching } = useFetchChaptersImg({ chapterId: Number(id) })
  const { data: chapter, isFetching: isFetchingChapter } = useFetchChapter(Number(id))
  const updateChapterMutation = useUpdateChapter()
  const useSaveBulkChapterImgMutaion = useSaveBulkChapterImg()
  const onFinish = (values: any) => {
    const info: SaveBulkChapterRequest = {
      ...values,
      chapterId: id
    }
    const chapterUpdateInfo: Chapter = {
      ...values,
      content: chapter?.content,
      id: Number(id)
    }
    updateChapterMutation.mutate(chapterUpdateInfo)
    useSaveBulkChapterImgMutaion.mutate(info)
    console.log('Received values of form: ', { ...values })
  }
  if (isFetching || isFetchingChapter) {
    return <Skeleton />
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        title: chapter?.title,
        listImg: data?.imgChapterList?.content?.map((img) => ({ fileUrl: img.fileUrl }))
      }}
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
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Content</Title>
        </Space>
      </Divider>
      <Form.List name='listImg'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 1 }} align='baseline'>
                <Form.Item
                  {...restField}
                  name={[name, 'fileUrl']}
                  rules={[{ required: true, message: 'Missing file url' }]}
                >
                  <Input placeholder='File Url' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ChapterImgEdit
