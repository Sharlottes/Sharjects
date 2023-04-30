import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { isEmail } from "src/utils/isEmail";

export default {
  useSignUser(username: string, password: string) {
    const { enqueueSnackbar } = useSnackbar();
    const { query } = useRouter();

    const loginuser = async () => {
      const res = await signIn("credentials", {
        callbackUrl: query.callbackUrl?.toString() ?? "/",
        [isEmail(username) ? "email" : "username"]: username,
        password,
      });

      const errorMsg = res?.error ?? query.error;
      if (!errorMsg || errorMsg === "SessionRequired") return;

      enqueueSnackbar(errorMsg.toString(), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "left" },
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
      });
      if (message === "success") loginuser();
    };

    return { loginuser, registerUser };
  },
};
