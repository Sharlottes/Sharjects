import Layout from "src/components/Layout";

import CredentialSignIn from "src/components/pages/auth/signin/CredentialSignIn";
import AuthSignIn from "src/components/pages/auth/signin/AuthSignIn";
import Divider from "@mui/material/Divider";

const SignIn: CustomNextPage = () => (
  <Layout>
    <CredentialSignIn />
    <Divider>OR</Divider>
    <AuthSignIn />
  </Layout>
);
SignIn.muteAlert = true;

export default SignIn;
