import { useEffect, useState } from 'react';
import { Form, Input, Button, Skeleton, Select, SelectProps, Switch, Row, Col, Image, Upload, UploadProps, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useFetchUsers, useUpdateUser } from '@/services/userService';
import { IUpdateUserRequest, IUserResponse } from '@/types/user/user.type';
import { useFetchRoles } from '@/services/roleService';
import { IRoleResponse } from '@/types/role.type';
import axiosInstance from '@/config/axios';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/config-firebsae';

function convertToOptionsRoles(data: IRoleResponse[]) {
    const roles: SelectProps['options'] = []
    data.map((role) => {
      const tempData = {
        label: role.roleName,
        value: role.roleName
      }
      roles.push(tempData)
    })
    return roles
  }
const UserEdit = () => {
    const { id } = useParams()
    const useUpdateUserMuataion = useUpdateUser() 
    const {data , isFetching} = useFetchUsers({ id: Number(id)})
    const [user, setUser] = useState<IUserResponse | undefined>()
    const {data: roleData, isFetching: isFetchingRoles} = useFetchRoles({})
    const [roles, setRoles] = useState<SelectProps['options'] | undefined>()
    const [avatar , setAvatar] = useState(user?.avatar)

    useEffect(() => {
        if (data) {
          setUser(data.content[0])
          setAvatar(data.content[0].avatar)
        }
      }, [data])
    useEffect(() => {
        if (roleData) {
          setRoles(convertToOptionsRoles(roleData.content))
        }
      }, [roleData])
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log("values: ",values);
        const userUpdateInfo: IUpdateUserRequest = {
            ...values,
            avatar: avatar,
            userId: Number(id)
        }
        useUpdateUserMuataion.mutate(userUpdateInfo)
        setLoading(false);
        // TODO: Implement submit logic
    };

    const props: UploadProps = {
        name: 'file',
        action: axiosInstance.defaults.baseURL + 'attachment/v1/upload',
        onChange(info) {
          console.log("infoL ", info)
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
                if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            const url = info.file.response.responseData;
     
            const imageRef = ref(storage, url);
            getDownloadURL(imageRef).then((url) => { setAvatar(url)})
          
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    if(isFetching || user == undefined || isFetchingRoles || roles == undefined) {
        return <Skeleton/>
    }
    return (
      <>
        <Row>
          <Col span={8}>
            <Image width={200} src={avatar} />
            <br/>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Col>
          <Col span={16}>
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                name: user?.name,
                email: user?.email,
                password: '',
                isActive: user?.isActive,
                roles: user?.roles,
                avatar: user?.avatar,
                coin: user?.coin,
              }}
            >
              <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter a name' }]}>
                <Input prefix={<UserOutlined />} placeholder='Name' />
              </Form.Item>
              <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please enter an email' }]}>
                <Input prefix={<UserOutlined />} placeholder='Email' />
              </Form.Item>
              <Form.Item name='password' label='Password'>
                <Input.Password prefix={<UserOutlined />} placeholder='Password' />
              </Form.Item>
              <Form.Item
                name='isActive'
                label='isActive'
                rules={[{ required: true, message: 'Please enter a isActive' }]}
              >
                <Switch defaultChecked={data?.content[0].isActive} />
              </Form.Item>
              <Form.Item name='roles' label='Roles' rules={[{ required: true, message: 'Please enter a roles' }]}>
                <Select mode='multiple' allowClear placeholder='Roles' options={roles}></Select>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    )
};

export default UserEdit;
