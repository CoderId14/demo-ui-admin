import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputRef, Popconfirm, Row, Skeleton, Space, Table, Tag } from 'antd'
import type { ColumnType, ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@mui/icons-material'
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { Link, useNavigate } from 'react-router-dom'
import { AppConst } from '@/app-const'
import { IUserResponse, IUserSearchParams } from '@/types/user/user.type'
import { useDeleteUser, useFetchUsers } from '@/services/userService'
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons'
import moment from 'moment'
interface DataType {
    key: number
    email: string
    username: string
    name: string
    isActive: boolean
    avatar: string
    roles: string[]
    createDate: string
    modifyDate: string
    coin: number
}
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}
type DataIndex = keyof DataType

function convertToDataTable(data: IUserResponse[]) {
  const dataTable: DataType[] = []
  data.map((user) => {
    const tempData: DataType = {
        key: user.userId,
        username: user.username,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        avatar: user.avatar,
        roles: user.roles,
        createDate: user.createDate,
        modifyDate: user.modifyDate,
        coin: user.coin
    }
    dataTable.push(tempData)
  })
  return dataTable
}
const UserTable: React.FC = () => {
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
  const useDeleteUserMutation = useDeleteUser()
  const [searchParams, setSearchParams] = useState<IUserSearchParams>({
    page: tableParams.pagination?.current ? tableParams.pagination.current - 1 : 0,
    size: 30
  })
  const { data, isFetching } = useFetchUsers(searchParams)
  useEffect(() => {
    if (data?.content) {
      setDataTable(convertToDataTable(data.content))
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    console.log('selectedKeys: ', selectedKeys)
    console.log('dataIndex: ', dataIndex)
    confirm()
    setSearchText(selectedKeys[0])
    setSearchParams({
      ...searchParams,
      username: selectedKeys[0]
    })
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const handleDelete = (key: React.Key) => {
    console.log('key: ', key)
    useDeleteUserMutation.mutate(key)
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
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = role.length > 5 ? 'geekblue' : 'green'
            if (role === 'ROLE_USER') {
              color = 'volcano'
            }
            if (role === 'ROLE_ADMIN') {
              color = 'green'
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin'
      },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render : (avatar) => <img src={avatar} alt="avatar" style={{width: '50px', height: '50px'}}/>
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => <>{isActive ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <StopTwoTone twoToneColor="#FF3333" />}</>
    },
    {
        title: 'ModifyDate',
        dataIndex: 'modifyDate',
        key: 'modifyDate',
        render: (modifyDate) => <>{modifyDate ? <span>{moment(modifyDate).format('YYYY-MM-DD')}</span> : 'N/A'}</>
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={AppConst.USER_ADMIN_EDIT_URL + record.key}>Edit</Link>
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
        <Button type='primary' onClick={() => navigate(AppConst.USER_ADMIN_ADD_URL)}>
          Add New User
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

export default UserTable
