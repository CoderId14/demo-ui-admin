import { useEffect, useState } from 'react';
import { Form, Input, Button, Skeleton, Select, SelectProps, Switch, Row, Col, Image, Upload, UploadProps, message } from 'antd';
import { KeyOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAddUser } from '@/services/userService';
import { IAddUserRequest } from '@/types/user/user.type';
import { useFetchRoles } from '@/services/roleService';
import { IRoleResponse } from '@/types/role.type';
import axiosInstance from '@/config/axios';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/config-firebsae';
import { MailOutline } from '@mui/icons-material';

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

const UserAdd = () => {
    const useAddMutation = useAddUser() 
    const {data: roleData, isFetching: isFetchingRoles} = useFetchRoles({})
    const [roles, setRoles] = useState<SelectProps['options'] | undefined>()
    const [avatar , setAvatar] = useState('')

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
        const userAddInfo: IAddUserRequest = {
            ...values,
            avatar: avatar,
        }
        useAddMutation.mutate(userAddInfo)
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

    if( isFetchingRoles || roles == undefined) {
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
            >
              <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter a name' }]}>
                <Input prefix={<UserOutlined />} placeholder='Name' />
              </Form.Item>
              <Form.Item name='username' label='Username' rules={[{ required: true, message: 'Please enter a username' }]}>
                <Input prefix={<UserOutlined />} placeholder='Username' />
              </Form.Item>
              <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please enter an email' }]}>
                <Input prefix={<MailOutline />} placeholder='Email' />
              </Form.Item>
              <Form.Item name='password' label='Password'>
                <Input.Password prefix={<KeyOutlined />} placeholder='Password' />
              </Form.Item>
              <Form.Item
                name='isActive'
                label='isActive'
                rules={[{ required: true, message: 'Please enter a isActive' }]}
              >
                <Switch />
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

export default UserAdd;
