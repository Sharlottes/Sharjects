import Auth from "./Auth";
import NonAuth from "./NonAuth";

export interface AuthWrapperProps<AT = unknown>
  extends React.PropsWithChildren {
  auth?: AT;
  muteAlert?: (AT extends unknown ? boolean : unknown) | undefined;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  auth,
  children,
  muteAlert,
}) =>
  auth ? (
    <Auth auth={auth}>{children}</Auth>
  ) : (
    <NonAuth muteAlert={muteAlert}>{children}</NonAuth>
  );
export default AuthWrapper;
