/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IBlogDetailsResponse,
  ICommentData,
} from "@/interfaces/api.all.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { endpoints } from "@/endpoints/endpoints";
import { AxiosError } from "axios";

const initialState = {
  commentLoading: false,
};

export const createComment = createAsyncThunk(
  "createComment",
  async (data: ICommentData) => {
    try {
      const res = await axiosInstance.post<IBlogDetailsResponse>(
        endpoints.comment.createComment,
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

export const updateComment = createAsyncThunk(
  "updateComment",
  async ({
    commentId,
    payload,
  }: {
    commentId: string;
    payload: ICommentData;
  }) => {
    try {
      const res = await axiosInstance.put(
        `${endpoints.comment.updateComment}/${commentId}`,
        payload
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId: string) => {
    try {
      const res = await axiosInstance.delete(
        `${endpoints.comment.deleteComment}/${commentId}`
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // For create Blog
      .addCase(createComment.pending, (state, action) => {
        state.commentLoading = true;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.commentLoading = false;
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentLoading = false;
      })

      // For update Blog
      .addCase(updateComment.pending, (state, action) => {
        state.commentLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.commentLoading = false;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.commentLoading = false;
      });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
