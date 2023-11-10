import { BookDetails } from '@/types/book/book.type'
import { EyeOutlined, FileTextOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Col, Image, Rate, Row, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Title, Text } = Typography
interface Props {
  book: BookDetails
}
function BookInfoSection({ book }: Props) {
  return (
    <Row
      style={{
        backgroundColor: '#f5f6fc',
        marginBottom: 48
      }}
      gutter={16}
    >
      <Col lg={{ span: 8, offset: 2 }}>
        <Image src={book?.thumbnailUrl}></Image>
      </Col>
      <Col style={{ position: 'relative' }}>
        <Title>{book?.title}</Title>
        <Text type='secondary'>Author: {book?.author}</Text>

        <div style={{ marginTop: 10, marginBottom: 30 }}>
          <Space direction='vertical' size={[0, 10]}>
            <Space size={[4, 8]} wrap>
              <UnorderedListOutlined style={{ fontSize: 24 }} />
              {book?.categories.map((category) => {
                return (
                  <Link to={'#'} key={category.categoryId}>
                    <Tag color='magenta'>{category?.categoryName}</Tag>
                  </Link>
                )
              })}
            </Space>
            <Space>
              <FileTextOutlined style={{ fontSize: 24 }} />
              {book?.latestChapters[0]?.chapterNumber ? book?.latestChapters[0]?.chapterNumber : 0} Chapters
            </Space>
            <Space>
              <EyeOutlined style={{ fontSize: 24 }} />
              {book?.viewCount} View
            </Space>
          </Space>

          <div>
            <Space>
              <Rate disabled defaultValue={book?.averageRating} />
              <span style={{ fontSize: 24 }}> {book?.averageRating} ({book.reviewCount} reviews)</span>
            </Space>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default BookInfoSection
