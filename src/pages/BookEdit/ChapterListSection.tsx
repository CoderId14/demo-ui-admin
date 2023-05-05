import { ReadOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Divider, Space, Skeleton, List, Typography, Alert, Popconfirm, Button, Row, Col } from 'antd'
import { formatDistance } from 'date-fns'
import { memo } from 'react'

import { Chapter } from '@/types/chapter/chapter.type'
import { useFetchChapters } from '@/services/chapterService'
import { Link, useNavigate } from 'react-router-dom'
import { AppConst } from '@/app-const'
const { Title, Paragraph } = Typography
interface Props {
  bookId: number
}
function ChapterListSection({ bookId }: Props) {
  console.log('ChapterListSection re rendered')
  const { data, error, isFetching } = useFetchChapters({
    book: bookId
  })
  const navigate = useNavigate()
  if (isFetching) {
    return <Skeleton></Skeleton>
  }
  if (error) {
    return <Alert message='Error' description='Some error occurred while fetching chapters' type='error' showIcon />
  }
  if (!data) {
    return <Skeleton></Skeleton>
  }
  const chapterData: Chapter[] = data.content
  const latestChapter = chapterData[0]
  return (
    <>
      <Divider orientation='left'>
        <Space className='d-flex align-items-center'>
          <ReadOutlined style={{ fontSize: 32 }} />
          <Title level={3}>Chapter List</Title>
        </Space>
      </Divider>
      <Row align={'middle'}>
        <Col span={23}>
          <Space align='baseline'>
            {latestChapter && (
              <>
                <Title level={5}>
                  Latest Release: Chapter {latestChapter.chapterNumber}: {latestChapter.title}
                </Title>
                <Paragraph>
                  {formatDistance(new Date(latestChapter.modifiedDate), new Date(), {
                    addSuffix: true
                  })}
                </Paragraph>
              </>
            )}
          </Space>
        </Col>
        <Col>
          <SortAscendingOutlined />
        </Col>
      </Row>
      <Divider></Divider>
      <Button type='primary' onClick={() => navigate(AppConst.CHAPTER_ADMIN_ADD_URL + bookId)}>
        Add New Chapter
      </Button>
      <List
        bordered
        dataSource={chapterData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>
              Chapter {item?.chapterNumber}: {item?.title}
            </Typography.Text>
            <Space size='middle'>
              <Link to={AppConst.CHAPTER_ADMIN_EDIT_URL + item.id}>Edit</Link>
              <Popconfirm title='Sure to delete?'>
                <a>Delete</a>
              </Popconfirm>
            </Space>
          </List.Item>
        )}
      />
    </>
  )
}

export default memo(ChapterListSection)
