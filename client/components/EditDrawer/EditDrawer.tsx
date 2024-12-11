/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSingleBlog, updateBlog } from "@/redux/slice/blogSlice";
import { Button, Grid2, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "@/schema/userShema";
import { IBlogDetails, ICreateBlogData } from "@/interfaces/api.all.interface";
import { toast } from "sonner";
import Image from "next/image";
import { mediaURL } from "@/redux/helper/helper";
import assest from "@/json/assest";

interface IEditDrawerProps {
  open: boolean;
  onClose: () => void;
  blogId: string;
}

const EditDrawer = ({ blogId, open, onClose }: IEditDrawerProps) => {
  const [blogData, setBlogdata] = React.useState<IBlogDetails | null>(null);
  const [imageFile, setImageFile] = React.useState<File | string>("");
  const [preview, setPreview] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset, setValue } = useForm({
    resolver: yupResolver<{ title: string; description: string }>(blogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  React.useEffect(() => {
    if (blogId && open) {
      dispatch(getSingleBlog(blogId as string))
        .unwrap()
        .then((data) => {
          if (data?.status === 200) {
            setBlogdata(data?.blog);
            setValue("title", data?.blog?.title);
            setValue("description", data?.blog?.description);
          }
        });
    }
  }, [blogId, open]);

  const formSubmit = (data: { title: string; description: string }) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("image", imageFile);
    formData.append("userId", blogData?.userId?._id as string);

    dispatch(
      updateBlog({
        blog_id: blogId,
        payload: formData as unknown as ICreateBlogData,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.status === 200) {
          toast.success(data?.message);
          reset();
          onClose();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.message);
        }
      });
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <Box component="form" onSubmit={handleSubmit(formSubmit)}>
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
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <figure>
              <Image
                src={
                  preview
                    ? preview
                    : blogData?.image
                    ? `${mediaURL}/${blogData?.image}`
                    : assest?.no_img
                }
                alt="no image"
                width={150}
                height={150}
              />
            </figure>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Button variant="contained" color="primary" type="submit">
              Update Blog
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
};

export default EditDrawer;
