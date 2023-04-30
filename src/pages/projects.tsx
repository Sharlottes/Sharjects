import Layout from "src/components/Layout";
import Typography from "@mui/material/Typography";
import Projects from "src/components/pages/projects/Projects";

const ProjectsPage: React.FC = () => (
  <Layout>
    <Typography variant="h2" fontWeight="bold" align="center">
      Projects
    </Typography>
    <Typography variant="body1" p="20px" align="center">
      여태껏 개발해온 개인 또는 팀 주관의 다양한 언어와 라이브러리, 프레임워크를
      겸비한 토이, 사이드, 메인 프로젝트들의 목록이에요!
    </Typography>
    <Projects />
  </Layout>
);
export default ProjectsPage;
