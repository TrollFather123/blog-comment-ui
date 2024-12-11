export interface IRegisterPayloadBody {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface ILoginPayloadBody {
  email: string;
  password: string;
}
export interface IUserData {
  fullName: string;
  email: string;
  password: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUserResponse {
  status: number;
  message: string;
  user: IUserData;
  token: string;
}

export interface IComment {
  comment: string;
  author: {
    fullName: string;
    email: string;
    createdAt: string;
  };
}

export interface IUSerBlogData {
  _id: string;
  fullName: string;
}

export interface IBlog {
  _id: string;
  userId: IUSerBlogData;
  comments: IComment[] | [];
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBlogResponse {
  status: number;
  message: string;
  blogs: IBlog[];
}

export interface ICreateBlogData {
  title: string;
  description: string;
  image: File | string;
  userId: string;
}

export interface IBlogDetailsUser {
  _id: string;
  fullName: string;
}

export interface IBlogDetails {
  _id: string;
  userId: IBlogDetailsUser;
  comments: ICommentResponseData[];
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBlogDetailsResponse {
  status: number;
  message: string;
  blog: IBlogDetails;
}





export interface ICommentAuthor {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface ICommentResponseData {
  _id: string;
  authorId: ICommentAuthor;
  blogId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICommentBlog {
  _id: string;
  userId: IUser;
  comments: ICommentResponseData[];
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  fullName: string;
}


export interface ICommentData {
  authorId: string;
  blogId: string;
  comment: string;
}



export interface INewComment {
  _id: string;
  authorId: string  
  blogId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBlogDetailsResponse {
  status: number;
  message: string;
  newComment: INewComment;
}






export interface IGetUserDataResponse {
  status: number;
  message: string;
  user: IGetUserData;
}

export interface IGetUserData {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
