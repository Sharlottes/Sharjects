import Box from '@mui/material/Box';
import ProgressiveTypography from 'src/components/ProgressiveTypography';
import FadeUpTypography from 'src/components/FadeUpTypography';

const TitleSection: React.FC = () => {
    return (
        <Box sx={{ marginTop: '60px', width: '100%' }}>
            <ProgressiveTypography 
                variant='h1'  
                sx={{ fontWeight: 'bold', fontSize: 'max(0, min(150px, 15vw))', width: '100%' }}
                label="Sharlotte"  
                motion={{ animate: 'show' }}
                box={{ sx: { display: 'flex', justifyContent: 'center' } }}
            />
            <FadeUpTypography 
                variant='body1' 
                sx={{width: '100%', textAlign: 'center' }} 
                motion={{
                    whileInView: { opacity: 1, marginBottom: '20px' },
                    transition: { delay: 1.5 }
                }}
            >
            <p style={{ textAlign: 'center', paddingLeft: '30px', paddingRight: '30px' }}>
                2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 고등학생입니다!
            </p>
            </FadeUpTypography>
        </Box>
    )
}

export default TitleSection;