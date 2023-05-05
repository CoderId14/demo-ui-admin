import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Avatar, Button } from 'antd'
import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './adminLayout.module.scss'
import classNames from 'classnames/bind'
import { AppConst } from '@/app-const'
import { HomeOutlined } from '@mui/icons-material'
import { selectAuth } from '@/redux/store'
import { logOut } from '@/services/authService'
const cx = classNames.bind(styles)

const { Header } = Layout

interface HeaderProps {
  collapsed: boolean
}

const HeaderComponent: FC<HeaderProps> = () => {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate)
  }

  return (
    <Header className={cx('layout-page-header')} style={{ backgroundColor: 'white' }}>
      <div className={cx('item')}>
        <Link to={AppConst.HOME_ADMIN_URL}>
          <HomeOutlined style={{ fontSize: 36 }} />
        </Link>
      </div>
      {user?.accessToken ? (
        <div className={cx('item')}>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  icon: <UserOutlined style={{ fontSize: 24 }} />,
                  label: <span onClick={() => navigate('/')}>UserProfile</span>
                },
                {
                  key: '2',
                  icon: <LogoutOutlined style={{ fontSize: 24 }} />,
                  label: <span onClick={handleLogout}>Logout</span>
                }
              ]
            }}
          >
            <span className={cx('user-action')}>
              <Avatar icon={<UserOutlined className={cx('user-avator')} />} />
            </span>
          </Dropdown>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </Header>
  )
}

export default HeaderComponent
