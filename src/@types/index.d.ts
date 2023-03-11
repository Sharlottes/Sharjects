type projectDataType = {
  owner: string;
  projects: Array<{
    name: string;
    description: string;
    tags: tagType[];
    link?: string;
    icon?: string;
    noGithub?: boolean;
  }>;
};

type Position = { line: number; char: number };
interface VSCodeStatusData {
  workspaceName: string;
  position: Array<{
    start: Position;
    end: Position;
  }>;
  githubUrl?: string;
}

interface CustomNextPage<AT = unknown> extends React.FC {
  auth?: AT;
}
