
import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputRef, Popconfirm, Row, Skeleton, Space, Table } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@mui/icons-material'
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { Link, useNavigate } from 'react-router-dom'
import { AppConst } from '@/app-const'
import { Category, CategorySearchParams } from '@/types/category/category.type'
import { useDeleteCategory, useFetchCategories } from '@/services/categoryService'

interface DataType {
  key: string | number
  categoryName: string
  description: string
  modifiedDate: string | Date
}
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}
type DataIndex = keyof DataType

function convertToDataTable(data: Category[]) {
  const dataTable: DataType[] = []
  data.map((category) => {
    const tempData: DataType = {
      key: category.categoryId,
      categoryName: category.categoryName,
      description: category.description,
      // modifiedDate: format(new Date(category.modifiedDate), 'yyyy/MM/dd kk:mm:ss', { locale: de })
      modifiedDate: new Date(category.modifiedDate).toISOString().substring(0, 10)
    }
    dataTable.push(tempData)
  })
  return dataTable
}
const CategoryTable: React.FC = () => {
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
  const useDeleteCategoryMutation = useDeleteCategory()
  const [searchParams, setSearchParams] = useState<CategorySearchParams>({
    page: tableParams.pagination?.current ? tableParams.pagination.current - 1 : 0,
    size: 30
  })
  const { data, isFetching } = useFetchCategories(searchParams)
  useEffect(() => {
    if (data?.content) {
      const bookData: Category[] = data.content
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


  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchParams({
      ...searchParams,
      name: selectedKeys[0]
    })
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const handleDelete = (key: React.Key) => {
    useDeleteCategoryMutation.mutate(key)
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
      title: 'CategoryName',
      dataIndex: 'categoryName',
      key: 'categoryName',
      ...getColumnSearchProps('categoryName')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'ModifiedDate',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={AppConst.CATEGORY_ADMIN_EDIT_URL + record.key}>Edit</Link>
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
  if (isFetching) {
    return <Skeleton></Skeleton>
  }


  return (
    <>
      <Row>
        <Button type='primary' onClick={() => navigate(AppConst.CATEGORY_ADMIN_ADD_URL)}>
          Add New Category
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

export default CategoryTable
