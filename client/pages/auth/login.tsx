import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ILoginPayloadBody, IRegisterPayloadBody } from "@/interfaces/api.all.interface";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { userLogin, userRegister } from "@/redux/slice/userSlice";
import { userLoginSchema, userSchema } from "@/schema/userShema";
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
    resolver: yupResolver<ILoginPayloadBody>(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit = (data: ILoginPayloadBody) => {
    dispatch(userLogin(data))
      .unwrap()
      .then((data) => {
        if (data?.status === 200) {
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
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid2>
          </Grid2>
          <Typography>Don't Have an Account? <Link href={"/sign-up"}>Sign Up</Link></Typography>
        </LoginWrapper>
      </Container>
    </Wrapper>
  );
};

export default Index;
