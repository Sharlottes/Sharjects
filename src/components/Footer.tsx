import Box from '@mui/material/Box'

const Footer: React.FC<{ additional?: React.ReactNode | undefined }> = ({ additional }) => (
    <footer>
        <Box sx={{
            width: '100%',
            height: '100px',
            backgroundColor: '#2e3b75'
        }}>
            {additional}
        </Box>
    </footer>
)

export default Footer;