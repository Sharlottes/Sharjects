import React from "react";
import Router, { useRouter } from "next/router";

import CustomTextInput from "src/pages/auth/signin/CustomTextInput";
import Layout from "components/Layout";
import Auths from "src/pages/auth/signin/Auths";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import AddIcon from "@mui/icons-material/Add";

import { useSnackbar } from "notistack";
import {
  getProviders,
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";

import type { BuiltInProviderType } from "next-auth/providers";
import type { CustomNextPage } from "src/pages/_app";

interface State {
  username: string;
  password: string;
}

const SignIn: CustomNextPage<{
  providers?: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const [{ username, password }, setValues] = React.useState<State>({
    username: "",
    password: "",
  });
  const [asEmail, setAsEmail] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { query } = useRouter();

  const handleChange =
    (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [prop]: evt.target.value }));
    };

  const loginuser = async () => {
    const res = await signIn("credentials", {
      callbackUrl: query.callbackUrl?.toString() ?? "/",
      [asEmail ? "email" : "username"]: username,
      password,
      remember,
    });

    const errorMsg = res ? res.error : query.error;
    if (!errorMsg || errorMsg === "SessionRequired") return;
    enqueueSnackbar(errorMsg.toString(), {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "left" },
      autoHideDuration: 2000,
    });
  };

  const registerUser = async () => {
    const { message } = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    enqueueSnackbar(message, {
      variant: message === "success" ? "success" : "warning",
      anchorOrigin: { vertical: "top", horizontal: "left" },
      autoHideDuration: 2000,
    });

    if (message === "success") {
      loginuser();
    }
  };

  const isValid = username !== "" && password !== "";

  return (
    <Layout>
      <Box
        flexDirection="column"
        sx={{
          display: "flex",
          alignItems: "center",
          pt: "100px",
          justifyContent: "center",
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Typography id="title" variant="h2" noWrap fontSize="min(6vw, 70px)">
          Login User
        </Typography>

        <Stack
          direction="column"
          spacing={1}
          sx={{ mt: "20px", mb: "20px", width: "min(70vw, 300px)" }}
        >
          <CustomTextInput
            handleChange={(evt) => {
              setAsEmail(
                /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(evt.target.value)
              );
              handleChange("username")(evt);
            }}
            inputKey="username-input"
            value={username}
            label={(value) =>
              !value ? (
                "Username or Email"
              ) : asEmail ? (
                <>
                  Username or <span style={{ fontWeight: "bold" }}>Email</span>
                </>
              ) : (
                <>
                  <span style={{ fontWeight: "bold" }}>Username</span> or Email
                </>
              )
            }
          />
          <CustomTextInput
            handleChange={handleChange("password")}
            inputKey="password-input"
            value={password}
            label="Password"
            privated
          />
          <Button
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              verticalAlign: "middle",
              m: 0,
              p: 0,
            }}
            onClick={() => setRemember((prev) => !prev)}
            color="inherit"
          >
            <CheckBoxRoundedIcon
              color="primary"
              sx={{ opacity: remember ? 0 : 1, transition: "all 0.25s" }}
            />
            <CheckBoxOutlineBlankRoundedIcon
              sx={{
                opacity: remember ? 1 : 0,
                position: "absolute",
                transition: "all 0.25s",
              }}
            />
            Remember User
          </Button>
          <Button
            onClick={loginuser}
            startIcon={<AddIcon />}
            disabled={!isValid}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Sign In
          </Button>
          <Button
            onClick={registerUser}
            startIcon={<AddIcon />}
            disabled={!isValid}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </Stack>
      </Box>
      <Divider
        sx={{
          color: "gray",
          ml: "15vw",
          mr: "15vw",
          mb: "20px",
          "&::before": { top: 0 },
          "&::after": { top: 0 },
        }}
      >
        OR
      </Divider>
      <Auths providers={providers} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
