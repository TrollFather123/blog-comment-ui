/* eslint-disable react-hooks/exhaustive-deps */
import EditDrawer from "@/components/EditDrawer/EditDrawer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { IBlogDetails } from "@/interfaces/api.all.interface";
import assest from "@/json/assest";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { mediaURL } from "@/redux/helper/helper";
import { deleteBlog, getSingleBlog } from "@/redux/slice/blogSlice";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/redux/slice/commentSlice";
import { commentSchema } from "@/schema/userShema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Stack,
  styled,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const DetailsBlock = styled(Box)`
  padding: 100px 0;
  figure {
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

interface Props {
  commentId: string;
  authorName: string;
  comment: string;
  authorId: string;
  commentValue:string;
  userId: string;
  setCommentValueCallback: (data: string) => void;
  handleUpdateCommentCallback: (data: string) => void;
  handleDeleteCommentCallback: (data: string) => void;
}

const CustomListItem = ({
  authorName,
  userId,
  commentId,
  commentValue,
  comment,
  authorId,
  handleDeleteCommentCallback,
  handleUpdateCommentCallback,
  setCommentValueCallback,
}: Props) => {
  const [isEditMain, setIsEditMain] = useState<boolean>(false);
  const [commentValueMain, setCommentValueMain] = useState<string>("");

  useEffect(()=>{
    if(commentValue){
      setCommentValueMain(commentValue)
    }
  },[commentValue])

  return (
    <ListItem
      sx={{
        backgroundColor: (theme: Theme) => theme.palette.action.disabled,
        display: "block",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Typography variant="h6">Author: {authorName}</Typography>
      {isEditMain && userId === authorId ? (
        <TextField
          placeholder="Enter Comment"
          value={commentValueMain}
          onChange={(e) => {
            setCommentValueCallback(e.target.value);
            setCommentValueMain(e.target.value);
          }}
        />
      ) : (
        <Typography>comment: {comment}</Typography>
      )}

      {userId === authorId && (
        <>
          {!isEditMain ? (
            <Button
              onClick={() => {
                setIsEditMain(true);
                setCommentValueCallback(comment);
              }}
            >
              Edit
            </Button>
          ) : (
            <Button onClick={() => handleUpdateCommentCallback(commentId)}>
              Submit
            </Button>
          )}
          <Button onClick={() => handleDeleteCommentCallback(commentId)}>
            Delete
          </Button>
        </>
      )}
    </ListItem>
  );
};

const Index = () => {
  const cookies = parseCookies();
  const userId = cookies["user_id"];
  const [blogData, setBlogdata] = useState<IBlogDetails | null>(null);
  const router = useRouter();
  const { blogLoading } = useAppSelector((s) => s.blog);
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState<string>("");

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver<{ comment: string }>(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (router.query.id && open === false) {
      dispatch(getSingleBlog(router.query.id as string))
        .unwrap()
        .then((data) => {
          if (data?.status === 200) {
            setBlogdata(data?.blog);
          }
        });
    }
  }, [router.query.id, open]);

  const commentSubmit = (data: { comment: string }) => {
    const payload = {
      authorId: userId,
      blogId: router.query.id as string,
      comment: data?.comment,
    };
    dispatch(createComment(payload))
      .unwrap()
      .then((data) => {
        if (data?.status === 201) {
          dispatch(getSingleBlog(router.query.id as string))
            .unwrap()
            .then((data) => {
              if (data?.status === 200) {
                setBlogdata(data?.blog);
              }
            });
          reset();
        }
      });
  };

  const handleUpdateComment = (commentId: string) => {
    const payload = {
      authorId: userId,
      blogId: router.query.id as string,
      comment: commentValue,
    };
    dispatch(updateComment({ commentId, payload }))
      .unwrap()
      .then(() => {
        dispatch(getSingleBlog(router.query.id as string))
          .unwrap()
          .then((data) => {
            if (data?.status === 200) {
              setBlogdata(data?.blog);
            }
          });
        setCommentValue("");
      });
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId))
      .unwrap()
      .then(() => {
        dispatch(getSingleBlog(router.query.id as string))
          .unwrap()
          .then((data) => {
            if (data?.status === 200) {
              setBlogdata(data?.blog);
            }
          });
      });
  };

  const setCommentValueCallback = useCallback((data: string) => {
 
    setCommentValue(data);
  }, []);
  const handleUpdateCommentCallback = useCallback((data: string) => {
    console.log(data,commentValue,"data")
    handleUpdateComment(data);
  }, [commentValue, handleUpdateComment]);

  
  const handleDeleteCommentCallback = useCallback((data: string) => {
    handleDeleteComment(data);
  }, [handleDeleteComment]);

  return (
    <Wrapper>
      <Container fixed>
        {blogLoading ? (
          <Typography variant="h3">Loading...</Typography>
        ) : (
          <>
            {!!blogData && blogData && (
              <DetailsBlock>
                {userId === blogData?.userId?._id && (
                  <Stack direction="row" alignItems="center" gap={4}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={openDrawer}
                    >
                      Edit Blog
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        dispatch(deleteBlog(blogData?._id))
                          .unwrap()
                          .then(() => {
                            router.push("/");
                          })
                      }
                    >
                      Delete Blog
                    </Button>
                  </Stack>
                )}

                <Typography variant="h2">{blogData?.title}</Typography>
                <figure>
                  <Image
                    src={
                      blogData?.image
                        ? `${mediaURL}/${blogData?.image}`
                        : assest?.no_img
                    }
                    alt="no image"
                    width={300}
                    height={300}
                  />
                </figure>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >
                  <Typography>Author: {blogData?.userId?.fullName}</Typography>

                  <Typography>
                    Published in:{" "}
                    {moment(blogData?.createdAt).format("DD:MM:YYYY")}
                  </Typography>
                </Stack>

                <Box mt={4}>
                  <Typography variant="h4">Description:</Typography>
                  <Typography>{blogData?.description}</Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit(commentSubmit)}
                  mt={4}
                >
                  <Controller
                    control={control}
                    name="comment"
                    render={({
                      field: { ...props },
                      fieldState: { invalid, error },
                    }) => (
                      <TextField
                        fullWidth
                        {...props}
                        helperText={error?.message}
                        error={invalid}
                        placeholder="Wriate Comment"
                        multiline
                        rows={4}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: "15px",
                    }}
                    type="submit"
                  >
                    Submit Comment
                  </Button>
                </Box>
                <Box mt={4}>
                  <Typography variant="h4">Comments:</Typography>
                  <List>
                    {!!blogData?.comments &&
                      blogData?.comments?.length &&
                      blogData?.comments?.map((comment) => (
                        <CustomListItem
                          key={comment?._id}
                          commentId={comment?._id}
                          commentValue={commentValue}
                          authorName={comment?.authorId?.fullName}
                          comment={comment?.comment}
                          authorId={comment?.authorId?._id}
                          userId={userId}
                          setCommentValueCallback={setCommentValueCallback}
                          handleUpdateCommentCallback={
                            handleUpdateCommentCallback
                          }
                          handleDeleteCommentCallback={
                            handleDeleteCommentCallback
                          }
                        />
                      ))}
                  </List>
                </Box>
              </DetailsBlock>
            )}
          </>
        )}
        <EditDrawer
          open={open}
          blogId={blogData?._id as string}
          onClose={closeDrawer}
        />
      </Container>
    </Wrapper>
  );
};

export default Index;
