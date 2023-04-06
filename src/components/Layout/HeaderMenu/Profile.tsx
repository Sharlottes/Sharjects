import Link from "next/link";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { signIn, signOut, useSession } from "next-auth/react";
import * as S from "./Profile.styled";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  if (status == "loading") return <CircularProgress />;

  return (
    <S.ProfileContainer>
      <Avatar src={session?.user?.image ?? ""} />
      <Link href="/mypage">
        {session ? session.user?.name ?? "" : "not logged in!"}
      </Link>
      {status === "authenticated" ? (
        <IconButton disableRipple onClick={() => signOut()}>
          <LogoutIcon />
        </IconButton>
      ) : (
        <IconButton disableRipple onClick={() => signIn()}>
          <LoginIcon />
        </IconButton>
      )}
    </S.ProfileContainer>
  );
};

export default Profile;
