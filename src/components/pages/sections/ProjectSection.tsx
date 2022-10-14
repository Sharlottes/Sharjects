import Link from "next/link"
import React from 'react'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import Paper, { type PaperProps } from '@mui/material/Paper'

import { styled } from '@mui/system'

import { motion, MotionProps } from 'framer-motion'

import GithubIcon from 'src/assets/icons/GithubIcon'
import HorizontalScrollGroup from 'src/components/HorizontalScrollGroup'
import { projectDataType } from 'src/@type'

const projectData: Array<projectDataType> = require('./projectData.json');

type tagType = 'javascript' | 'typescript' | 'java' | 'cs' | 'dart' | 'html' | 'css' | 'react' | 'next' | 'flutter' | 'unity' | 'libgdx'
const allTags: tagType[] = ['javascript', 'typescript', 'java', 'cs', 'dart', 'html', 'css', 'react', 'next', 'flutter', 'unity', 'libgdx']
const TagContext = React.createContext<{ 
  tags: tagType[], 
  setTags: (tags: tagType[]) => void,
  addTag: (tag: tagType) => void,
  removeTag: (tag: tagType) => void 
}>({ 
  tags: [],
  setTags: ()=>{},
  addTag: ()=>{},
  removeTag: ()=>{} 
});

const StyledAvatar = styled(Avatar)<{ highlighted: string }>(({ highlighted })=>({
  width: '30px', height: '30px', 
  marginLeft: '5px', 
  transition: 'margin-bottom 300ms ease-out',
  backgroundColor: 'common.white',
  zIndex: 999,
  ...(Boolean(highlighted) && {
    marginBottom: '10px'
  }),
}));

const Project: React.FC<{
  name: string, 
  description: string|JSX.Element, 
  tags: tagType[], 
  image?: string,
  github_url?: string,
  children?: JSX.Element
} & PaperProps> = ({ 
  name, 
  description, 
  tags,
  image, 
  children, 
  github_url = `https://github.com/sharlottes/${name}`,
  ...props
}) => {
  const { tags: currentTags, removeTag, addTag } = React.useContext(TagContext);
  return (
    <Paper sx={{ 
      margin: '10px', 
      padding: '10px', 
      width: '350px', height: '100%', 
      display: 'flex', flexDirection: 'column', 
      alignContent: 'space-between' 
    }} {...props}>
      <div>
        <div>
          <Link href={github_url}>
            <IconButton style={{ display: 'flex', float: 'right' }}> 
              <GithubIcon sx={{ transition: 'color 300ms', "&:hover": { color: 'black' }}} />
            </IconButton>
          </Link>
          <Typography sx={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{name}</Typography>
          {image&&<img src={image} width='calc(100% - 50px)' />}
        </div>
        <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
        <div>
          <Typography>{description}</Typography>
          {children}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <AvatarGroup total={tags.length}>
              {tags.map((tag, i) => 
                <Tooltip key={i} title={tag} onClick={() => currentTags.includes(tag) ? removeTag(tag) : addTag(tag)}>
                  <StyledAvatar key={i} src={`images/langs/${tag}.png`} alt='' highlighted={currentTags.includes(tag) ? 'asdf' : ''} />
                </Tooltip>
              )}
            </AvatarGroup>
          </div>
        </div>
      </div>
      <Link href={`/projects/${name}`}>
        <Button variant='contained' sx={{ margin: '5px' }}>More</Button>
      </Link>
    </Paper>
  )
}


const TagsSelection: React.FC<MotionProps> = ({ ...props }) => {
  const { tags, addTag, removeTag } = React.useContext(TagContext);
  return (
    <motion.div style={{ width: '100%', display: 'flex', position: 'fixed', bottom: '100px', alignItems: 'center', justifyContent: 'center' }} {...props}>
      {allTags.map((tag, i) => 
        <Tooltip key={i} title={tag} onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}>
          <StyledAvatar key={i} src={`images/langs/${tag}.png`} alt='' highlighted={tags.includes(tag) ? 'asdf' : ''} />
        </Tooltip>
      )}
    </motion.div>
  )
}

const GridProjects: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (
    <Box
    sx={{ 
      display: { xs: 'none', md: 'flex' }, 
      justifyContent: 'flex-start', 
      alignItems: 'stretch',
      justifyItems: 'stretch',
      flexFlow: 'row wrap',
      width: '100%',
      padding: '10px'
    }}>
      {children}
    </Box>
  )
}

const ScrollProjects: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (    
    <Box
      sx={{ 
        display: { xs: 'block', md: 'none' }, 
        overflow: 'hidden',
        width: '100%',
        padding: '10px'
      }}
    >
      <HorizontalScrollGroup>
        {children}
      </HorizontalScrollGroup>
    </Box>
  )
}

const ProjectSection: React.FC = () => {
    const [tags, setTags] = React.useState<tagType[]>([])
    const addTag = (tag: tagType) => setTags(prev => [...prev, tag]);
    const removeTag = (tag: tagType) => {
        setTags(prev => {
            const copied = [...prev];
            copied.splice(copied.indexOf(tag), 1);
            return copied;
        });
    }
    const projects: Array<JSX.Element> = projectData
      .map(({ owner, projects }) => projects
        .reduce<Array<JSX.Element>>(
          (elems, project) => tags.some(tag => project.tags.includes(tag)) 
            ? [...elems, <Project key={project.name} {...project} github_url={`https://github.com/${owner}/${project.name}`} />] 
            : elems
          , []
        )
      )
      .flat();

    return (
        <TagContext.Provider value={{ tags, setTags, addTag, removeTag }}>
            <TagsSelection />
            <Drawer
                ModalProps={{ style: { padding: '10px' } }}
                PaperProps={{ sx: { 
                  maxHeight: '300px', 
                  overflow: 'scroll',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
              } }}
                anchor='bottom'
                open={tags.length !== 0}
                onClose={() => setTags([])}
            >
                <TagsSelection animate={{ bottom: '350px', zIndex: 999 }} />
                <ScrollProjects>{projects}</ScrollProjects>
                <GridProjects>{projects}</GridProjects>
            </Drawer>
        </TagContext.Provider>
    )
    }

export default ProjectSection;