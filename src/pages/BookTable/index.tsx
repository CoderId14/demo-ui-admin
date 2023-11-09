import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputRef, Popconfirm, Row, Skeleton, Space, Table, Tag } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@mui/icons-material'
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { useDeleteBook, useFetchBooks } from '@/services/bookService'
import { BookDetails, BookParamRequest } from '@/types/book/book.type'
import { convertBooksToBookDetails } from '@/utils/convert'
import { Link, useNavigate } from 'react-router-dom'
import { AppConst } from '@/app-const'
interface DataType {
  key: string | number
  bookName: string
  authorName: string
  chapters: number
  categories: string[]
  tags: string[]
  views: number
  likes: number
}
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}
type DataIndex = keyof DataType

function convertToDataTable(data: BookDetails[]) {
  const dataTable: DataType[] = []
  data.map((book) => {
    const tempData: DataType = {
      key: book.bookId,
      bookName: book.title,
      authorName: book.author,
      chapters: book.totalChapter,
      categories: book.categories.map((category) => category.categoryName) || [],
      tags: book.tags.map((tag) => tag.tagName) || [],
      views: book.viewCount,
      likes: book.likeCount
    }
    dataTable.push(tempData)
  })
  return dataTable
}
const BookTable: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const [dataTable, setDataTable] = useState<DataType[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 10
    }
  })
  const useDeleteBookMutation = useDeleteBook()
  const [searchParams, setSearchParams] = useState<BookParamRequest>({
    detail: true,
    page: tableParams.pagination?.current ? tableParams.pagination.current - 1 : 0,
    size: 30
  })
  const { data, isFetching } = useFetchBooks(searchParams)
  useEffect(() => {
    if (data?.content) {
      const bookData: BookDetails[] = convertBooksToBookDetails(data.content)
      setDataTable(convertToDataTable(bookData))
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.totalElements
        }
      })
    }
  }, [data])
  const navigate = useNavigate()
  if (isFetching) {
    return <Skeleton></Skeleton>
  }

  console.log('re render')
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchParams({
      ...searchParams,
      title: selectedKeys[0]
    })
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const handleDelete = (key: React.Key) => {
    useDeleteBookMutation.mutate(key)
  }
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90, display: 'flex', alignItems: 'center' }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  const columns: ColumnsType<DataType> = [
    {
      title: 'Book',
      dataIndex: 'bookName',
      key: 'bookName',
      ...getColumnSearchProps('bookName')
    },
    {
      title: 'Author Name',
      dataIndex: 'authorName',
      key: 'authorName'
    },
    {
      title: 'Chapters',
      dataIndex: 'chapters',
      key: 'chapters'
    },
    {
      title: 'Categories',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }) => (
        <>
          {categories.map((category) => {
            let color = category.length > 5 ? 'geekblue' : 'green'
            if (category === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views'
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={AppConst.BOOK_ADMIN_EDIT_URL + record.key}>Edit</Link>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
    console.log('pagination: ', pagination)
    setTableParams({
      pagination,
      filters,
      ...sorter
    })

    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([])
    // }
  }

  return (
    <>
      <Row>
        <Button type='primary' onClick={() => navigate(AppConst.BOOK_ADMIN_ADD_URL)}>
          Add New Book
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={dataTable}
        rowKey={(record) => record.key}
        pagination={tableParams.pagination}
        //   loading={loading}
        onChange={handleTableChange}
      />
    </>
  )
}

export default BookTable
