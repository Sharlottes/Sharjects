import { Component } from "react";
import Layout from "./components/Layout";
import Button from '@mui/material/Button';

export default class About extends Component {
  render(): JSX.Element {
    return (
      <Layout>
        <h2>안녕하세요 저는 Sharlotte 입니다.</h2>
      </Layout>
    )
  }
}