import Box from '@mui/material/Box'

const Footer: React.FC<{ additional?: React.ReactNode | undefined }> = ({ additional }) => (
    <Box sx={{ width: '100%', height: '100px', backgroundColor: '#2e3b75' }}>
        포션탈모
        {additional}
    </Box>
)

export default Footer;