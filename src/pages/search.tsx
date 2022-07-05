import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { ScriptProps } from "next/script";
import { Component, ReactNode } from "react";
import Layout from "./components/Layout";

class Search extends Component<ScriptProps & WithRouterProps> {
  render(): ReactNode {
    return (
      <Layout>
        당신이 검색한 키워드는 "{this.props.router.query.keyword}" 입니다.
      </Layout>
    )  
  }
}

export default withRouter(Search);