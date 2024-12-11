import { useAppDispatch } from "@/hooks/useAppDispatch";
import { IRegisterPayloadBody } from "@/interfaces/api.all.interface";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { userRegister } from "@/redux/slice/userSlice";
import { userSchema } from "@/schema/userShema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Grid2,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginWrapper = styled("form")`
  padding: 100px 0;
`;

const Index = () => {
  const dispatch = useAppDispatch();
const router = useRouter()
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver<IRegisterPayloadBody>(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formSubmit = (data: IRegisterPayloadBody) => {
    dispatch(userRegister(data))
      .unwrap()
      .then((data) => {
        if (data?.status === 201) {
          toast.success(data?.message);
          router.push("/")
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
                name="fullName"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Full Name"
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Email"
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Password"
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                    placeholder="Confirm Password"
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid2>
          </Grid2>
          <Typography>Already Have an Account? <Link href={"/login"}>Sign In</Link></Typography>
        </LoginWrapper>
      </Container>
    </Wrapper>
  );
};

export default Index;
