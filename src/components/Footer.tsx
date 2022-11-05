import { Divider } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
const Footer: React.FC<{ additional?: React.ReactNode | undefined }> = ({ additional }) => (
    <footer>
        <Box sx={{
            width: '100%',
            minHeight: '100px',
            backgroundColor: '#e6e6e6',
        }}>
            <Divider />
            <div style={{ padding: '20px 10% 0px 10%', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='body2'>
                    이 포트폴리오는 2년간 제작된 프로젝트들을 소개하기 위해 웹개발 공부 목적으로 시작된 프로젝트입니다.<br />
                    로그인을 통한 모든 개인정보는 데이터베이스에 저장되며 개발 테스트를 위한 데이터로 이용됩니다. 사용에 주의해주세요.<br /><br />
                    Copyright 2022.Sharlotte. All rights reserved.
                </Typography>
                {additional}
            </div>
        </Box>
    </footer>
)

export default Footer;