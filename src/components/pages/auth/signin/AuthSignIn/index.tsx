import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { DiscordIcon, GithubIcon, GoogleIcon } from "src/assets/icons";
import { OAuthButton, OAuthButtonsContainer } from "./styled";

const icons: Array<{ name: string; icon: JSX.Element; colors: string[] }> = [
  {
    name: "google",
    icon: <GoogleIcon sx={{ color: "white" }} />,
    colors: ["#679df6", "#5491f5", "white"],
  },
  {
    name: "github",
    icon: <GithubIcon sx={{ color: "black" }} className="githubIcon" />,
    colors: ["#8b76a9", "black", "white"],
  },
  {
    name: "discord",
    icon: <DiscordIcon sx={{ color: "white" }} />,
    colors: ["#8ea0e1", "#8094dd", "white"],
  },
];

const AuthSignIn: React.FC = () => {
  const { query } = useRouter();

  const handleClick = (id: string) => () =>
    signIn(id, {
      callbackUrl: `${
        query.callbackUrl
          ? decodeURIComponent(query.callbackUrl.toString())
          : window.location.origin
      }`,
    });

  return (
    <OAuthButtonsContainer>
      {icons.map(({ name, icon, colors: [base, bg, accent] }) => (
        <OAuthButton
          base={base}
          bg={bg}
          accent={accent}
          variant="outlined"
          onClick={handleClick(name)}
          startIcon={icon}
        >
          Sign in with {name}
        </OAuthButton>
      ))}
    </OAuthButtonsContainer>
  );
};

export default AuthSignIn;
