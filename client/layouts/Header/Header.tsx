/* eslint-disable @typescript-eslint/no-unused-expressions */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { currentUser, LogoutUser } from "@/redux/slice/userSlice";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const cookies = parseCookies();
  const userId = cookies["user_id"];
  const { userData } = useAppSelector((s) => s.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) dispatch(currentUser(userId));
  }, [userId]);

  const loggedOutUser = () => {
    console.log("cliked!!");
    dispatch(LogoutUser());
    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , cursor:"pointer" }} onClick={()=> router.push("/")}>
            Logo Here
          </Typography>
          {userId && (
            <Box
              sx={{
                marginRight: "10px",
              }}
            >
              <Typography>Hi {userData?.fullName}</Typography>
            </Box>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              userId ? loggedOutUser() : router.push("/login");
            }}
          >
            {userId ? "Logout" : "Login"}{" "}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
