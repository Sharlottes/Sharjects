import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ProgressiveTypography from 'src/components/ProgressiveTypography';
import FadeUpTypography from 'src/components/FadeUpTypography';

import GithubIcon from 'src/assets/icons/GithubIcon';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';

const TitleSection: React.FC = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <ProgressiveTypography
                variant='h1'
                sx={{ width: '100%' }}
                fontWeight='bold'
                fontSize='min(200px, 15vw)'
                label="Sharlotte"
                motion={{ animate: 'show', drag: true }}
                box={{ sx: { display: 'flex', justifyContent: 'center', padding: '20px' } }}
            />
            <FadeUpTypography
                variant='body1'
                sx={{ width: '100vw', textAlign: 'center', paddingLeft: '30px', paddingRight: '30px' }}
                motion={{
                    whileInView: { opacity: 1, y: -30 },
                    transition: { delay: 1.5 }
                }}
            >
                2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 고등학생입니다!
            </FadeUpTypography>
            <Box
                component={motion.div}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 3 }}
                sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}
            >
                <motion.div
                    animate={{ y: -20 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1, delay: 0.5 }}
                >
                    <Button
                        href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        variant='contained'
                        sx={{ ml: '10px', mr: '10px' }}
                        color='info'
                        startIcon={<DescriptionIcon />}
                    >
                        other portfolio
                    </Button>
                </motion.div>
                <motion.div
                    animate={{ y: -20 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                >
                    <Button
                        href='https://github.com/sharlottes/sharjects'
                        variant='contained'
                        sx={{ ml: '10px', mr: '10px', backgroundColor: 'black', color: 'white', "&:hover": { backgroundColor: 'black' } }}
                        startIcon={<GithubIcon />}
                    >
                        Github Repository
                    </Button>
                </motion.div>
            </Box>
        </Box >
    )
}

export default TitleSection;