import { useSession } from "next-auth/react";

interface AuthWrapperProps {
  auth: boolean;
}

function AuthWrapper({
  auth,
  children,
}: React.PropsWithChildren<AuthWrapperProps>) {
  const { status } = useSession({ required: !!auth });
  if (auth && status === "loading") return <>Loading...</>;

  return <>{children}</>;
}

export default AuthWrapper;
