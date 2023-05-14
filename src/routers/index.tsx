import { AppConst } from '@/app-const'
import BookAdd from '@/pages/BookAdd'
import BookEdit from '@/pages/BookEdit'
import BookTable from '@/pages/BookTable'
import CategoryAdd from '@/pages/CategoryAdd'
import CategoryEdit from '@/pages/CategoryEdit'
import CategoryTable from '@/pages/CategoryTable'
import ChapterAdd from '@/pages/ChapterAdd'
import ChapterEdit from '@/pages/ChapterEdit'
import ChapterImgAdd from '@/pages/ChapterImgAdd'
import ChapterImgEdit from '@/pages/ChapterImgEdit'
import ErrorPage from '@/pages/ErrorPage'
import ErrorPage403 from '@/pages/ErrorPage/Page_403'
import SignIn from '@/pages/SignIn'
import TagAdd from '@/pages/tag/TagAdd'
import TagEdit from '@/pages/tag/TagEdit'
import TagTable from '@/pages/tag/TagTable'

const adminRoutes = [
  { path: AppConst.HOME_ADMIN_URL, component: BookTable },
  { path: AppConst.BOOK_ADMIN_URL, component: BookTable },
  { path: AppConst.CATEGORY_ADMIN_URL, component: CategoryTable },
  { path: AppConst.CATEGORY_ADMIN_EDIT_URL + ':id', component: CategoryEdit },
  { path: AppConst.CATEGORY_ADMIN_ADD_URL, component: CategoryAdd },
  { path: AppConst.TAG_ADMIN_URL, component: TagTable },
  { path: AppConst.TAG_ADMIN_EDIT_URL + ':id', component: TagEdit },
  { path: AppConst.TAG_ADMIN_ADD_URL, component: TagAdd },
  { path: AppConst.BOOK_ADMIN_EDIT_URL + ':id', component: BookEdit },
  { path: AppConst.BOOK_ADMIN_ADD_URL, component: BookAdd },
  { path: AppConst.CHAPTER_ADMIN_EDIT_URL + ':id', component: ChapterEdit },
  { path: AppConst.CHAPTER_ADMIN_ADD_URL + ':id', component: ChapterAdd },
  { path: AppConst.CHAPTER_IMG_ADMIN_ADD_URL + ':id', component:  ChapterImgAdd},
  { path: AppConst.CHAPTER_IMG_ADMIN_EDIT_URL + ':id', component: ChapterImgEdit}


]

const publicRoutes = [
  { path: AppConst.LOGIN_URL, component: SignIn },

  { path: AppConst.ERROR_PAGE_403, component: ErrorPage403 },
  { path: '*', component: ErrorPage }
]
export { adminRoutes, publicRoutes }
