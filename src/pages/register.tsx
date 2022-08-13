import React from 'react'
import { useSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Divider from '@mui/material/Divider'

import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'

import Layout from 'components/Layout'
import CustomTextInput from 'components/CustomTextInput'
import Auths from 'components/Auths'

import { initCasePartially } from 'src/utils/initCasePartially'

enum SubmitStatus {
  READY,
  SUBMITTING,
  DONE,
  FAILED
}

interface IStepCtx {
  activeStep: number
  maxStep: number
  nextStep: () => unknown
  prevStep: () => unknown
}

const StepContext = React.createContext<IStepCtx>({ activeStep: 0, maxStep: 3, nextStep: () => { }, prevStep: () => { } })
const StepContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const nextStep = () => setState(prev => ({ ...prev, activeStep: Math.min(prev.maxStep, prev.activeStep + 1) }))
  const prevStep = () => setState(prev => ({ ...prev, activeStep: Math.max(0, prev.activeStep - 1) }))

  const [state, setState] = React.useState<IStepCtx>({
    activeStep: 0,
    maxStep: 3,
    nextStep,
    prevStep,
  })

  return (
    <StepContext.Provider value={state}>
      {children}
    </StepContext.Provider>
  )
}

interface State {
  id: string
  password: string
  email?: string
}

const DataInputStep: React.FC = () => {
  const [{ id, password, email }, setValues] = React.useState<State>({ id: '', password: '' })
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>(SubmitStatus.READY)
  const { enqueueSnackbar } = useSnackbar()
  const { nextStep } = React.useContext(StepContext)

  const handleChange = (prop: keyof State) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [prop]: evt.target.value }))
    }

  const submitData = async () => {
    console.log(`id: ${id}, pw: ${password}`)
    setSubmitStatus(SubmitStatus.SUBMITTING)
    setTimeout(() => {
      enqueueSnackbar('User is successfully created', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        variant: 'success'
      })
      setSubmitStatus(SubmitStatus.DONE)
      nextStep()
    }, 2000)

    /*
    await fetch('/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        password: password
      })
    })
      .then(res => always<Promise<IUser>>(res.json(), console.log(res)))
      .then(({ userId, password: resPassword }) => {
        setSubmitStatus(SubmitStatus.DONE)
        Router.push('/login')
      })
      .catch((err: any) => {
        setSubmitStatus(SubmitStatus.FAILED)
        enqueueSnackbar('something went wrong', { variant: 'error' })
        console.error(err)
      })
    */
  }

  const isValid = id !== '' && password !== ''
  const isEnd = submitStatus === SubmitStatus.DONE || submitStatus === SubmitStatus.FAILED

  return (
    <>
      <Typography id='title' variant='h2' noWrap fontSize='min(6vw, 70px)' sx={{ textAlign: 'center' }}>Register User</Typography>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)', justifyContent: 'center' }}>
          <CustomTextInput
            handleChange={handleChange('id')}
            value={id}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            label='Id'
          />
          <CustomTextInput
            handleChange={handleChange('password')}
            value={password}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            label='Password'
            privated
          />
          <CustomTextInput
            handleChange={handleChange('email')}
            value={email ?? ''}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            label='Email'
            required={false}
            cons={[[(value: string) => !value || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), 'Invalid Format']]}
          />

          <Tooltip title={!isValid ? 'you need to type into every required input'
            : {
              [SubmitStatus.READY]: 'submit now!',
              [SubmitStatus.SUBMITTING]: 'submitting...',
              [SubmitStatus.DONE]: 'done!',
              [SubmitStatus.FAILED]: 'failed!',
            }[submitStatus]
          }>
            <Box>
              <LoadingButton
                disabled={!isValid}
                loading={submitStatus === SubmitStatus.SUBMITTING}
                loadingPosition='start'
                variant={isEnd ? 'contained' : 'outlined'}
                startIcon={
                  submitStatus === SubmitStatus.DONE ? <CheckIcon />
                    : submitStatus === SubmitStatus.FAILED ? <ErrorIcon />
                      : <AddIcon />
                }
                onClick={submitData}
                color={
                  initCasePartially<string>()(SubmitStatus, {
                    [SubmitStatus.DONE]: () => 'success',
                    [SubmitStatus.FAILED]: () => 'error',
                  }, submitStatus) ?? 'primary'
                }
                sx={{ width: '100%' }}
              >
                {
                  {
                    [SubmitStatus.READY]: 'Submit',
                    [SubmitStatus.SUBMITTING]: 'Submitting...',
                    [SubmitStatus.DONE]: 'DONE!',
                    [SubmitStatus.FAILED]: 'Failed!',
                  }[submitStatus]
                }
              </LoadingButton>
            </Box>
          </Tooltip>
        </Stack>
      </Box>
      <Divider sx={{ color: "gray", ml: "15vw", mr: "15vw", mb: "20px", "&::before": { top: 0 }, "&::after": { top: 0 } }}>
        OR
      </Divider>
      <Auths />
    </>
  )
}

const InputStepper: React.FC = () => {
  const { activeStep } = React.useContext(StepContext)
  const steps: Array<[string, React.ReactElement]> = [
    ["General Info", <DataInputStep />]
  ]

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ ml: '10px', mr: '10px', mb: '25px' }}>
        {steps.map(([label,], i) => (
          <Step key={i}>
            <StepLabel>
              <Typography>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[Math.min(activeStep, steps.length - 1)][1]}
    </>
  )
}

function RegisterPage() {
  return (
    <Layout>
      <Box
        flexDirection='column'
        sx={{
          pt: '100px',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '100vw',
        }}
      >
        <StepContextProvider>
          <InputStepper />
        </StepContextProvider>
      </Box>
    </Layout >
  )
}

export default RegisterPage