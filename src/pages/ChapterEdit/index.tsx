import { useFetchChapter, useUpdateChapter } from "@/services/chapterService";
import { Chapter } from "@/types/chapter/chapter.type";
import { ContainerOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Divider, Form, Input, Skeleton, Space, Typography } from "antd";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { Title } = Typography


function ChapterEdit() {
  const { id } = useParams()
  const [form] = Form.useForm();
    const updateChapterMutation = useUpdateChapter();
  const { data, isFetching } = useFetchChapter(Number(id))
  const editorRef: any = useRef(null)
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    const chapterUpdateInfo: Chapter = {
      ...values,
      content: editorRef.current.getContent(),
      id: Number(id)
    }
    updateChapterMutation.mutate(chapterUpdateInfo)
    navigate(-1)
    console.log('Received values of form: ', { ...values, content: editorRef.current.getContent(), id: id })
  }
  if(isFetching){
    return <Skeleton></Skeleton>
  }
    return ( 
    <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          title: data?.title,
          content: data?.content
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
        <Editor
          apiKey='pmfqllzhlpfn980wmee9dndck6vclx7hy331lmx0dcimpm6l'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={data?.content}
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
      </Form> );
}

export default ChapterEdit;