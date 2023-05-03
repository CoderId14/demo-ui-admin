export namespace AppConst {
  // Route path
  export const LOGIN_URL: string = "/login";
  export const HOME_ADMIN_URL: string = "/";
  export const BOOK_ADMIN_URL: string = "/book";
  export const BOOK_ADMIN_EDIT_URL: string = "/book/edit/";
  export const BOOK_ADMIN_ADD_URL: string = "/book/add";
  export const CHAPTER_ADMIN_EDIT_URL: string = "/chapter/edit/";
  export const CHAPTER_ADMIN_ADD_URL: string = "/chapter/add/";
  export const CATEGORY_ADMIN_URL: string = "/category";
  export const CATEGORY_ADMIN_ADD_URL: string = "/category/add";
  export const CATEGORY_ADMIN_EDIT_URL: string = "/category/edit/";

  export const ERROR_PAGE: string = "/error";
  export const ERROR_PAGE_403: string = "/error_403";


  // messages
  export const LOGIN_FAILED_400 = "Username not exist";
  export const LOGIN_FAILED_401 = "Password not valid";
  export const LOGIN_FAILED_SERVER = "Server not available";

  export const DEFAULT_MESSAGE_400 = "Bad Request 400";
  export const DEFAULT_MESSAGE_404 = "Bad Request 404";
  export const DEFAULT_MESSAGE_401 = "You don't have permission";

  export const DEFAULT_MESSAGE_NETWORK_ERROR = "Network Error";

  export const PAGE_404_MESSAGE = "Sorry, the page you visited does not exist.";
  export const PAGE_403_MESSAGE =
    "Sorry, you don't have permission to access this page.";
  export const PAGE_500_MESSAGE = "Sorry, Something went wrong on server.";
}
