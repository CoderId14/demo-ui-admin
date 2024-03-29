export namespace AppConst {
  // Route path
  export const LOGIN_URL = '/login'
  export const HOME_ADMIN_URL = '/'
  export const BOOK_ADMIN_URL = '/book'
  export const BOOK_ADMIN_EDIT_URL = '/book/edit/'
  export const BOOK_ADMIN_ADD_URL = '/book/add'
  export const CHAPTER_ADMIN_EDIT_URL = '/chapter/edit/'
  export const CHAPTER_ADMIN_ADD_URL = '/chapter/add/'
  export const CHAPTER_IMG_ADMIN_EDIT_URL = '/chapterImg/edit/'
  export const CHAPTER_IMG_ADMIN_ADD_URL = '/chapterImg/add/'
  export const CATEGORY_ADMIN_URL = '/category'
  export const CATEGORY_ADMIN_ADD_URL = '/category/add'
  export const CATEGORY_ADMIN_EDIT_URL = '/category/edit/'
  export const TAG_ADMIN_URL = '/tag'
  export const TAG_ADMIN_ADD_URL = '/tag/add'
  export const TAG_ADMIN_EDIT_URL = '/tag/edit/'

  export const USER_ADMIN_URL = '/user'
  export const USER_ADMIN_EDIT_URL = '/user/edit/'
  export const USER_ADMIN_ADD_URL = '/user/add'


  //writer
  export const WRITER_DASH_REQUEST_URL = '/writer/request'
  export const WRITER_PROMOTE_URL = '/writer/promote'
  //error
  export const ERROR_PAGE = '/error'
  export const ERROR_PAGE_403 = '/error_403'

  // messages
  export const LOGIN_FAILED_400 = 'Username not exist'
  export const LOGIN_FAILED_401 = 'Password not valid'
  export const LOGIN_FAILED_SERVER = 'Server not available'

  export const DEFAULT_MESSAGE_400 = 'Bad Request 400'
  export const DEFAULT_MESSAGE_404 = 'Bad Request 404'
  export const DEFAULT_MESSAGE_401 = "You don't have permission"

  export const DEFAULT_MESSAGE_NETWORK_ERROR = 'Network Error'

  export const PAGE_404_MESSAGE = 'Sorry, the page you visited does not exist.'
  export const PAGE_403_MESSAGE = "Sorry, you don't have permission to access this page."
  export const PAGE_500_MESSAGE = 'Sorry, Something went wrong on server.'
}
