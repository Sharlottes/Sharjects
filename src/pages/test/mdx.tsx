import { MDXProvider } from "@mdx-js/react";
import Test from "./test.mdx";

const MDXTestPage: React.FC = () => {
  return (
    <MDXProvider>
      <Test />
    </MDXProvider>
  );
};
export default MDXTestPage;
