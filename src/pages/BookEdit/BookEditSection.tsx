import { AppConst } from '@/app-const'
import { useUpdateBook } from '@/services/bookService'
import { useFetchCategories } from '@/services/categoryService'
import { useFetchTags } from '@/services/tagService'
import { BookDetails, BookUpdateInfo } from '@/types/book/book.type'
import { Category } from '@/types/category/category.type'
import { ITag } from '@/types/tag/tag.type'
import { ContainerOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Divider, Space, Switch, Input, Row, Checkbox, Button, Form, Typography, Skeleton } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChapterListSection from './ChapterListSection'
import ContentSection from '@/component/ContentSection'
const { Title } = Typography
interface Props {
  book: BookDetails
}
function BookEditSection({ book }: Props) {
  const updateBookMutation = useUpdateBook()
  const { data: categories, isFetching: isFetchingCategory } = useFetchCategories({})
  const [categoryData, setCategoryData] = useState<Category[]>([])
  const navigate = useNavigate()

  const { data: tags, isFetching: isFetchingTag } = useFetchTags({})
  const [tagData, setTagData] = useState<ITag[]>([])

  useEffect(() => {
    if (categories?.content) {
      setCategoryData(categories.content)
    }
    if (tags?.content) {
      setTagData(tags.content)
    }
  }, [categories, tags])
  const editorRef: any = useRef(null)
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    const bookUpdateInfo: BookUpdateInfo = {
      ...values,
      content: editorRef.current.getContent(),
      id: book.bookId
    }
    updateBookMutation.mutate(bookUpdateInfo)
    navigate(AppConst.BOOK_ADMIN_URL)
    console.log('Received values of form: ', { ...values, content: editorRef.current.getContent(), id: book.bookId })
  }
  const categoryOptions = categoryData.map((category) => ({ label: category.categoryName, value: category.categoryId }))
  const tagOptions = tagData.map((tag) => ({ label: tag.tagName, value: tag.tagId }))

  if (isFetchingCategory || isFetchingTag || updateBookMutation.isLoading || book == undefined) {
    return <Skeleton />
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        isPremium: book?.premium,
        title: book?.title,
        thumbnailUrl: book?.thumbnailUrl,
        categories: book?.categories.map((category) => category.categoryId),
        tags: book?.tags.map((tag) => tag.tagId)
      }}
    >
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Premium</Title>
        </Space>
      </Divider>
      <Form.Item name='isPremium' valuePropName='checked'>
        <Switch defaultChecked={book?.premium} />
      </Form.Item>

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
          <Title level={3}>ThumbnailUrl</Title>
        </Space>
      </Divider>
      <Form.Item name='thumbnailUrl'>
        <Input placeholder='Thumbnail Url' />
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <UnorderedListOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Category</Title>
        </Space>
      </Divider>
      <Row>
        <Form.Item name='categories'>
          <Checkbox.Group options={categoryOptions} />
        </Form.Item>
      </Row>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <UnorderedListOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Tags</Title>
        </Space>
      </Divider>
      <Row>
        <Form.Item name='tags'>
          <Checkbox.Group options={tagOptions} />
        </Form.Item>
      </Row>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Content</Title>
        </Space>
      </Divider>
      <ContentSection content={book.content}></ContentSection>
      <Editor
        apiKey='pmfqllzhlpfn980wmee9dndck6vclx7hy331lmx0dcimpm6l'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={book?.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <ChapterListSection bookId={book.bookId}></ChapterListSection>
      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookEditSection
