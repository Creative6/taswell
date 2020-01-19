import {get, fileUpload} from "./axios";

export const GET_ARTICLES = (para?: any) => get("/articles", para);
export const GET_PERSON_ACTIVE_RANKINGS = (para?: any) => get("/person_active_rankings", para);
export const GET_ARTICLE_POPULARITY = (para?: any) => get("/article_popularity", para);
export const GET_ARTICLE_INFO = (para?: any) => get("/article_info", para);
export const SET_COMMENT_SAVE = (para?: any) => get("/comment_save", para);
export const GET_COMMENTS = (para?: any) => get("/comments", para);
export const GET_NOTICES = (para?: any) => get("/notices", para);
export const GET_NOTICE_NUM = (para?: any) => get("/notice_num", para);
export const UPLOAD = (para?: any) => fileUpload("/upload", para);
