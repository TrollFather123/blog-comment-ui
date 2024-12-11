/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IBlog,
  IBlogDetailsResponse,
  IBlogResponse,
  ICreateBlogData,
} from "@/interfaces/api.all.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { endpoints } from "@/endpoints/endpoints";
import { AxiosError } from "axios";

const initialState = {
  blogLoading: false,
  blogs: null as IBlog[] | null,
};

export const fetchBlogs = createAsyncThunk("blogsFetch", async () => {
  try {
    const res = await axiosInstance.get<IBlogResponse>(endpoints.blog.blog);
    return res?.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err?.message);
    }
  }
});

export const createBlog = createAsyncThunk(
  "createBlog",
  async (data: ICreateBlogData) => {
    try {
      const res = await axiosInstance.post<IBlogResponse>(
        endpoints.blog.createBlog,
        data
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "getSingleBlog",
  async (blog_id: string) => {
    try {
      const res = await axiosInstance.get<IBlogDetailsResponse>(
        `${endpoints.blog.blogDetails}/${blog_id}`
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

export const updateBlog = createAsyncThunk(
  "updateBlog",
  async ({blog_id,payload}:{blog_id: string , payload : ICreateBlogData}) => {
    try {
      const res = await axiosInstance.put(`${endpoints.blog.blog}/${blog_id}`,payload);
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (blog_id: string) => {
    try {
      const res = await axiosInstance.delete(
        `${endpoints.blog.blog}/${blog_id}`
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // For Get All Blogs
      .addCase(fetchBlogs.pending, (state, action) => {
        state.blogLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.blogLoading = false;
          state.blogs = payload?.blogs;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogLoading = false;
      })

      // For create Blog
      .addCase(createBlog.pending, (state, action) => {
        state.blogLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.blogLoading = false;
          state.blogs = payload?.blogs;
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.blogLoading = false;
      })

      // For Get Single Blog
      .addCase(getSingleBlog.pending, (state, action) => {
        state.blogLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.blogLoading = false;
        }
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.blogLoading = false;
      })

      // For Update Blog
      .addCase(updateBlog.pending, (state, action) => {
        state.blogLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.blogLoading = false;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.blogLoading = false;
      })

      // For Update Blog
      .addCase(deleteBlog.pending, (state, action) => {
        state.blogLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.blogLoading = false;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.blogLoading = false;
      });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
