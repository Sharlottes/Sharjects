import React from "react";
import { useSnackbar } from "notistack";
import LoginSnackbarAction from "./LoginSnackbarAction";
import useRouterChange from "src/hooks/useRouterChange";

export interface NonAuthProps extends React.PropsWithChildren {
  muteAlert?: boolean | undefined;
}
const NonAuth: React.FC<NonAuthProps> = ({ children, muteAlert }) => {
  const { enqueueSnackbar } = useSnackbar();
  useRouterChange(() => {
    if (muteAlert) return;
    enqueueSnackbar("you are not logged in", {
      preventDuplicate: true,
      variant: "lifebar",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      action: (key) => <LoginSnackbarAction key={key} />,
    });
  });

  return <>{children}</>;
};

export default NonAuth;
