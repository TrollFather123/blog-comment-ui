import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import assest from "@/json/assest";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { mediaURL } from "@/redux/helper/helper";
import { fetchBlogs } from "@/redux/slice/blogSlice";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BlogCard = styled(Paper)`
  padding: 20px;
  figure {
    height: 320px;
    a {
      display: block;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { blogLoading, blogs } = useAppSelector((s) => s.blog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  console.log(blogs, "blogs");
  return (
    <Wrapper>
      <Container fixed>
        <Box
          sx={{
            padding: "100px 0",
          }}
        >
          {blogLoading ? (
            <Typography variant="h3">Loading...</Typography>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/create-blog")}
                sx={{
                  mb: "20px",
                }}
              >
                Add New Blog
              </Button>
              <Grid2 container spacing={2}>
                {!!blogs &&
                  blogs?.length &&
                  blogs?.map((blog) => (
                    <Grid2 size={{ md: 4, xs: 12 }} key={blog?._id}>
              
                      <BlogCard>
                        <figure>
                          <Link href={`/blog-details/${blog?._id}`}>
                            <Image
                              src={ blog?.image ? `${mediaURL}/${blog?.image}` : assest?.no_img}
                              alt="no image"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </figure>

                        <Box pt={2}>
                          <Typography variant="h4">
                          <Link href={`/blog-details/${blog?._id}`}>{blog?.title}</Link>
                          </Typography>
                          <Typography>{blog?.description}</Typography>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={4}
                          >
                            <Typography>
                              Author: {blog?.userId?.fullName}
                            </Typography>

                            <Typography>
                              Published in:{" "}
                              {moment(blog?.createdAt).format("DD:MM:YYYY")}
                            </Typography>
                          </Stack>
                        </Box>
                      </BlogCard>
                    </Grid2>
                  ))}
              </Grid2>
            </>
          )}
        </Box>
      </Container>
    </Wrapper>
  );
}
