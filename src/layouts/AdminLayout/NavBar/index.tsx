import { NavLink, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { Avatar, Menu, MenuProps } from 'antd'
import { DownOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'

import classNames from 'classnames/bind'
import styles from './Nav.module.scss'
import { AppConst } from '@/app-const'
import { Header } from 'antd/lib/layout/layout'
import { selectAuth } from '@/redux/store'
import { logOut } from '@/services/authService'

let cx = classNames.bind(styles)
export const NavbarMain = () => {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null
  const isAuthorized = user ? true : false
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate)
  }

  type MenuItem = Required<MenuProps>['items'][number]
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    authorized: boolean = true
  ): MenuItem {
    // if the submenu is unauthorized, return null
    if (!authorized) {
      return null
    }
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem
  }

  const menuItems = [
    getItem(
      <NavLink to={AppConst.HOME_ADMIN_URL}>Home</NavLink>,
      'home',
      <HomeOutlined className={cx('iconSizeMedium')} />,
      undefined,
      undefined,
      true
    ),
    getItem(
      <span>User Login</span>,
      'user',
      <Avatar icon={<UserOutlined className={cx('iconSizeMedium')} />} />,
      [
        getItem(
          <NavLink to='/' onClick={handleLogout}>
            Logout
          </NavLink>,
          'logout',
          <LogoutOutlined className={cx('iconSizeMedium')} />,
          undefined,
          undefined,
          isAuthorized
        ),
        getItem(
          <NavLink to={AppConst.LOGIN_URL}>Login</NavLink>,
          'login',
          <LoginOutlined className={cx('iconSizeMedium')} />,
          undefined,
          undefined,
          !isAuthorized
        )
      ],
      undefined,
      true
    ),
    getItem(
      'Category',
      'login',
      <DownOutlined />,
      [getItem('test1', 'test1', null, [getItem('testSub1', 'test2')], 'group', true)],
      undefined,
      true
    )
  ]

  return (
    <>
      <Header>
        <Menu mode='horizontal' defaultSelectedKeys={['home']} items={menuItems}></Menu>
      </Header>
    </>
  )
}
