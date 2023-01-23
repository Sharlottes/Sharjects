import { useSession } from "next-auth/react";

export interface AuthProps extends React.PropsWithChildren {
  auth?: any | undefined;
}
const Auth: React.FC<AuthProps> = ({ children }) => {
  const { status } = useSession({ required: true });
  if (status === "loading") return <>Loading...</>;
  return <>{children}</>;
};

export default Auth;
