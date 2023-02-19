import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React from "react";
import useRouterChange from "src/hooks/useRouterChange";
import LoginSnackbarAction from "./LoginSnackbarAction";

export interface AuthWrapperProps<AT = unknown>
  extends React.PropsWithChildren {
  auth?: AT;
  muteAlert?: (AT extends unknown ? boolean : unknown) | undefined;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  auth,
  children,
  muteAlert,
}) => {
  const { status } = useSession({ required: !!auth });
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbarAlert = () => {
    if (muteAlert || status === "authenticated") return;
    enqueueSnackbar("you are not logged in", {
      preventDuplicate: true,
      variant: "lifebar",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      action: (key) => <LoginSnackbarAction key={key} />,
    });
  };
  React.useEffect(showSnackbarAlert, [muteAlert]);
  useRouterChange(showSnackbarAlert, [muteAlert]);

  if (status === "loading") return <>Loading...</>;
  return <>{children}</>;
};

export default AuthWrapper;
