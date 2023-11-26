import { useFetchWriterPromoteRequest, useUpdateWriterPromoteRequest } from '@/services/writerService'
import { Avatar, Button, List, Skeleton } from 'antd'
import React from 'react'

const WriterPromoteDash: React.FC = () => {
  const { data, isFetching } = useFetchWriterPromoteRequest({status: 'PENDING'})
  const useUpdateBookWriterRequestMutation = useUpdateWriterPromoteRequest()
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
              avatar={<Avatar/>}
              title={<a href='https://ant.design'>{item.fullName}</a>}
              description={item.status || 'No description'}
            />
            <div>{item.roleName}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default WriterPromoteDash
