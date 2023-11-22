import { AppConst } from '@/app-const'
import axiosInstance from '@/config/axios'
import { useAddBook } from '@/services/bookService'
import { useFetchCategories } from '@/services/categoryService'
import { useFetchTags } from '@/services/tagService'
import { BookAddInfo } from '@/types/book/book.type'
import { Category } from '@/types/category/category.type'
import { ITag } from '@/types/tag/tag.type'
import { ContainerOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Checkbox, Divider, Form, Input, Row, Select, SelectProps, Skeleton, Space, Switch, Typography, Upload, UploadProps, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '@/config-firebsae'
import { getDownloadURL, ref } from 'firebase/storage'
import { IUserResponse } from '@/types/user/user.type'
import { useFetchUsers } from '@/services/userService'
const { Title } = Typography

function convertToOptionsUsers(data: IUserResponse[]) {
  const users: SelectProps['options'] = []
  data.map((user) => {
    const tempData = {
      label: user.name,
      value: user.userId
    }
    users.push(tempData)
  })
  return users

}

function BookAdd() {
  const addBookMutation = useAddBook()
  const { data: categories, isFetching: isFetchingCategory } = useFetchCategories({})

  const [categoryData, setCategoryData] = useState<Category[]>([])
  const navigate = useNavigate()
  const [thumbnailUrlState, setThumbnailUrl] = useState('' as string)
  const { data: tags, isFetching: isFetchingTag } = useFetchTags({})
  const [tagData, setTagData] = useState<ITag[]>([])
  const {data: userData, isFetching: isFetchingUser} = useFetchUsers({'userRoles.role.roleName': "ROLE_WRITER"})
  const [users, setUsers] = useState<SelectProps['options'] | undefined>()


  useEffect(() => {
    if (userData) {
      setUsers(convertToOptionsUsers(userData.content))
    }
  }, [userData])
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
    const bookAdd: BookAddInfo = {
      ...values,
      thumbnailUrl: thumbnailUrlState,
      content: editorRef.current.getContent()
    }
    addBookMutation.mutate(bookAdd)
    navigate(AppConst.BOOK_ADMIN_URL)
    console.log('Received values of form: ', { ...values,thumbnailUrl: thumbnailUrlState, content: editorRef.current.getContent() })
  }
  const categoryOptions = categoryData.map((category: Category) => ({
    label: category.categoryName,
    value: category.categoryId
  }))
  const tagOptions = tagData.map((tag: ITag) => ({ label: tag.tagName, value: tag.tagId }))

 
  const props: UploadProps = {
    name: 'file',
    action: axiosInstance.defaults.baseURL + 'attachment/v1/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log("infoL ", info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
            if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const url = info.file.response.responseData;
 
        const imageRef = ref(storage, url);
        getDownloadURL(imageRef).then((url) => { setThumbnailUrl(url)})
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  console.log("thumbnailUrl: ", thumbnailUrlState)
  if (isFetchingCategory || isFetchingTag || addBookMutation.isLoading || isFetchingUser) {
    return <Skeleton />
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        isPremium: false,
        isNovel: false
      }}
    >
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Premium</Title>
        </Space>
      </Divider>
      <Form.Item name='isPremium' valuePropName='checked'>
        <Switch />
      </Form.Item>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Novel</Title>
        </Space>
      </Divider>
      <Form.Item name='isNovel' valuePropName='checked'>
        <Switch />
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
        <Input placeholder='Thumbnail Url' value={thumbnailUrlState} />
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
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
      <Row>
        <Form.Item name='author' label='Author' rules={[{ required: true, message: 'Please enter a users' }]}>
          <Select allowClear placeholder='Select Author' options={users}></Select>
        </Form.Item>
      </Row>
      <Divider orientation='left'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Content</Title>
        </Space>
      </Divider>

      <Editor
        apiKey='pmfqllzhlpfn980wmee9dndck6vclx7hy331lmx0dcimpm6l'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=''
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
      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookAdd
