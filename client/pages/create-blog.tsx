/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ICreateBlogData } from "@/interfaces/api.all.interface";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { createBlog } from "@/redux/slice/blogSlice";
import { blogSchema } from "@/schema/userShema";
import { yupResolver } from "@hookform/resolvers/yup";
import {

  Button,
  Container,
  Grid2,
  styled,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginWrapper = styled("form")`
  padding: 100px 0;
`;

const Index = () => {
  const cookies = parseCookies();
  const userId = cookies["user_id"];
  const [imageFile, setImageFile] = useState<File | string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver<{ title: string; description: string }>(blogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });


  const formSubmit = (data: { title: string; description: string }) => {


    const formData = new FormData();
    formData.append("title",data?.title)
    formData.append("description",data?.description)
    formData.append("image",imageFile)
    formData.append("userId",userId);


    dispatch(createBlog(formData as unknown as ICreateBlogData))
      .unwrap()
      .then((data) => {
        if (data?.status === 201) {
          toast.success(data?.message);
          router.push("/");
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.message);
        }
      });
  };
  return (
    <Wrapper>
      <Container fixed>
        <LoginWrapper onSubmit={handleSubmit(formSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Controller
                control={control}
                name="title"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Title"
                  />
                )}
              />
            </Grid2>


            <Grid2 size={{ xs: 12 }}>
              <Controller
                control={control}
                name="description"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Description"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
            <input type="file" accept="image/*" onChange={(e:any)=> setImageFile(e.target.files[0])}/>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" color="primary" type="submit">
                Create Blog
              </Button>
            </Grid2>
          </Grid2>

        </LoginWrapper>
      </Container>
    </Wrapper>
  );
};

export default Index;
