import { useSession } from "next-auth/react";
import React from "react";

export interface AuthWrapperProps<AT = unknown>
  extends React.PropsWithChildren {
  auth?: AT;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ auth, children }) => {
  const { status } = useSession({ required: !!auth });

  if (status === "loading") return <>Loading...</>;
  return <>{children}</>;
};

export default AuthWrapper;
