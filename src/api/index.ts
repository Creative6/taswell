import { get, fileUpload, post } from "./axios";

export const GET_ARTICLES = (para?: any) => get("/articles", para);
export const GET_PERSON_ACTIVE_RANKINGS = (para?: any) => get("/person_active_rankings", para);
export const GET_ARTICLE_POPULARITY = (para?: any) => get("/article_popularity", para);
export const GET_ARTICLE_INFO = (para?: any) => get("/article_info", para);
export const SET_COMMENT_SAVE = (para?: any) => get("/comment_save", para);
export const GET_COMMENTS = (para?: any) => get("/comments", para);
export const GET_NOTICES = (para?: any) => get("/notices", para);
export const GET_NOTICE_NUM = (para?: any) => get("/notice_num", para);
export const UPLOAD = (para?: any) => fileUpload("/upload", para);
export const SET_ARTICLE_SAVE = (para?: any) => post("/save", para);
export const SET_NOTICE_READ = (para?: any) => get("/notice_read", para);
export const GET_SEARCH_RESULT = (para?: any) => get("/search", para);
export const GET_ARTICLE_BY_UID = (para?: any) => get("/user_articles", para);
export const GET_ARTICLE_BY_KEYWORD = (para?: any) => get("/keyword_articles", para);
export const GET_TAGS = (para?: any) => get("/tags", para);
export const SET_FOLLOW = (para?: any) => get("/follow", para);
export const GET_ARTICLES_BY_USER = (para?: any) => get("/articles_by_user", para);
export const GET_USERINFO_BY_NAME = (para?: any) => get("/userinfo_by_name", para);
export const GET_FOLLOWING = (para?: any) => get("/following", para);
export const GET_FOLLOWERS = (para?: any) => get("/followers", para);
export const GET_MY_FOLLOWS = (para?: any) => get("/my_follows", para);






