import Layout from "src/components/Layout";

import Divider from "@mui/material/Divider";
import AuthSignIn from "src/components/pages/auth/signin/AuthSignin";
import CredentialSignIn from "src/components/pages/auth/signin/CredentialSignIn";

export default function SignIn() {
  return (
    <Layout>
      <CredentialSignIn />
      <Divider>OR</Divider>
      <AuthSignIn />
    </Layout>
  );
}
