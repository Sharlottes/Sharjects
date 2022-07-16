import { FormControl, InputLabel, OutlinedInput, Container } from "@mui/material";
import React from 'react';
import Layout from 'src/pages/components/Layout';

interface State {
  id: string;
  password: string;
  showPassword: boolean;
}
function LoginPage() {
  const [values, setValues] = React.useState<State>({
    id: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  }
  
  return (
    <Layout>
      <Container sx={{alignItems:'center'}}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="id-input">ID</InputLabel>
          <OutlinedInput id='id-input' type='text' value={values.id} onChange={handleChange('id')}/>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput id='password-input' type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')} />
        </FormControl>
      </Container>
    </Layout>
  )
} 

export default LoginPage;