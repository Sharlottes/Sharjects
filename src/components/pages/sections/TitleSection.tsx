import Box from '@mui/material/Box';
import ProgressiveTypography from 'src/components/ProgressiveTypography';
import FadeUpTypography from 'src/components/FadeUpTypography';

const TitleSection: React.FC = () => {
    return (
        <Box sx={{ marginTop: '60px', width: '100%' }}>
            <ProgressiveTypography
                variant='h1'
                sx={{ width: '100%' }}
                fontWeight='bold'
                fontSize='min(200px, 15vw)'
                label="Sharlotte"
                motion={{ animate: 'show' }}
                box={{ sx: { display: 'flex', justifyContent: 'center', padding: '20px' } }}
            />
            <FadeUpTypography
                variant='body1'
                sx={{ width: '100vw', textAlign: 'center', paddingLeft: '30px', paddingRight: '30px' }}
                motion={{
                    whileInView: { opacity: 1, marginBottom: '20px' },
                    transition: { delay: 1.5 }
                }}
            >
                2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 고등학생입니다!
            </FadeUpTypography>
        </Box>
    )
}

export default TitleSection;