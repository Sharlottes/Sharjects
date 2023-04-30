import ProjectCard from "./ProjectCard";
import Layout from "src/components/Layout";
import { motion, Variants } from "framer-motion";
import S from "./Projects.styled";

const projectData: Array<projectDataType["projects"][0] & { owner: string }> = (
  require("public/data/projectData.json") as projectDataType[]
)
  .map(({ owner, projects }) => projects.map((proj) => ({ ...proj, owner })))
  .flat();

const projectVariants: Variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
  hidden: { opacity: 0 },
};

const Projects: React.FC = () => (
  <S.ProjectsContainer>
    {projectData.map((data, i) => (
      <motion.div
        key={i}
        custom={i}
        initial="hidden"
        animate="visible"
        variants={projectVariants}
      >
        <ProjectCard {...data} />
      </motion.div>
    ))}
  </S.ProjectsContainer>
);

export default Projects;
