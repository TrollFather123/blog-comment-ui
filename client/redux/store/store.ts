import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import blogSlice from "../slice/blogSlice";
import commentSlice from "../slice/commentSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        blog: blogSlice,
        comment: commentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;