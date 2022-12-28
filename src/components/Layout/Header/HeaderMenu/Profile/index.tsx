import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { signIn, signOut, useSession } from "next-auth/react";
import { ProfileContainer } from "../../../styled";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <ProfileContainer>
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
    </ProfileContainer>
  );
};

export default Profile;
