import { Card, Divider, Typography } from '@mui/material';
import Layout from 'src/components/Layout';
import { projectDataType } from 'src/@type'
import Link from 'next/link';

const projectData: projectDataType['projects'] = (require('components/pages/projectData.json') as projectDataType[]).map(data => data.projects).flat();

const Projects: React.FC = () => (
  <Layout>
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontSize: 50, fontWeight: 'bold' }}>
        Projects
      </div>
      <div style={{ width: '100%', textAlign: 'center', padding: '020px'}}>
        여태껏 개발해온 개인 또는 팀 주관의 다양한 언어와 라이브러리, 프레임워크를 겸비한 토이, 사이드, 메인 프로젝트들의 목록이에요!
      </div>
    </div>
    <div style={{ margin: '50px 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {projectData.map(data => (
          <Card sx={{
            width: 'min(400px, calc(100% / 2 - 20px))', 
            borderRadius: '20px', 
            border: '1px solid #dcdcdc', 
            margin: '10px',
            padding: '10px',
            transition: 'all 250ms ease-in',
            "& .MuiDivider-root": {
              transition: 'width,background-color',
              transitionDuration: '250ms',
              transitionDelay: '0ms,250ms',
              width: 0,
              backgroundColor: 'gray'
            },
            "& .link-btn": {
              opacity: 0,
              transition: 'opacity,color',
              transitionDuration: '500ms',
              transitionDelay: '500ms, 0ms',
              "&:hover": {
                color: 'white',
              }
            },
            "&:hover": {
              boxShadow: '0 0 10px black',
              "& .MuiDivider-root": {
                width: '100%',
                backgroundColor: '#a9d8ff'
              },
              "& .link-btn": {
                opacity: 1,
              }
            }
          }}>
            <div style={{ height: 'calc(100% - 30px)' }}>
              <Typography variant='h5'>{data.name}</Typography>
              <Divider sx={{ margin: '5px 0' }} />
              <Typography variant='body1'>{data.description}</Typography>
            </div>
            <Typography className="link-btn" sx={{ 
              display: 'block',
              width: '60px', height: '30px', 
              borderRadius: '20px', 
              border: '1px solid #dcdcdc', 
              padding: '2px 10px', 
              float: 'right',
              color: 'black',
              "& a": {
                position: 'absolute',
              },
              "&::before": {
                content: "''",
                position: 'absolute',
                width: '60px', height: '30px',
                backgroundImage: 'linear-gradient(30deg, #50d4d9, #b662c4)',
                borderRadius: '20px', 
                transition: 'opacity 500ms',
                opacity: 0,
                transform: 'translateX(-10px) translateY(-2px)'
              },
              "&:hover::before": {
                opacity: 1
              }
            }}><a href={`/projects/${data.name.toLowerCase()}`}>&gt; go!</a>
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  </Layout>
)

export default Projects