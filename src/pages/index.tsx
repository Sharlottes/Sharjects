import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import Layout from "components/Layout";

const Home: React.FC = () =>
  <Layout>
    <Container sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
      <Typography variant='h1' sx={{ fontWeight: 'bold', marginTop: '120px' }}>Sharlotte</Typography>
    </Container>
  </Layout>

export default Home;