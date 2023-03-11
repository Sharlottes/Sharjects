import { useSession } from "next-auth/react";
import React from "react";

export interface AuthWrapperProps<AT = unknown>
  extends React.PropsWithChildren {
  auth?: AT;
}

const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { status } = useSession({ required: true });
  if (status === "loading") return <>Loading...</>;

  return <>{children}</>;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ auth, children }) =>
  !!auth ? <Auth>{children}</Auth> : <>{children}</>;

export default AuthWrapper;
