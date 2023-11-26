import { CLIENT_HOST_NAME } from '@/environments'
import { useFetchBookWriterRequest, useUpdateBookWriterRequest } from '@/services/writerService'
import { Avatar, Button, List, Skeleton } from 'antd'
import React from 'react'

const DashRequest: React.FC = () => {
  const { data, isFetching } = useFetchBookWriterRequest({status: 'PENDING'})
  const useUpdateBookWriterRequestMutation = useUpdateBookWriterRequest()
  const onAction = (action: string, id: number) => {
    if (action === 'REJECTED') {
      useUpdateBookWriterRequestMutation.mutate({ id: id, status: 'REJECTED' })
    }
    if (action === 'ACCEPTED') {
      useUpdateBookWriterRequestMutation.mutate({ id: id, status: 'ACCEPTED' })
    }
  }
  return (
    <List
      className='demo-loadmore-list'
      loading={isFetching}
      itemLayout='horizontal'
      dataSource={data?.content}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button onClick={() => onAction('ACCEPTED', item.id)} style={{'color': 'green'}}>ACCEPTED</Button>,
            <Button onClick={() => onAction('REJECTED', item.id)} key='list-loadmore-more'>
              REJECTED
            </Button>
          ]}
        >
          <Skeleton avatar title={false} loading={isFetching} active>
            <List.Item.Meta
              avatar={<Avatar src={item.cover} />}
              title={<a href={CLIENT_HOST_NAME + "book/" + item.bookId} target='_blank'>{item.title}</a>}
              description={item.fullName || 'No description'}
            />
            <div>Content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default DashRequest
