import React from 'react'
import * as NotiStack from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Stack, Typography, Tooltip, Step, Stepper, StepLabel } from '@mui/material'
import Layout from 'src/frontend/client/components/Layout'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import CustomTextInput from 'src/frontend/client/components/CustomTextInput'
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
  const { enqueueSnackbar } = NotiStack.useSnackbar()
  const { nextStep } = React.useContext(StepContext)

  const handleChange = (prop: keyof State) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [prop]: evt.target.value }))
    }

  const submitData = async () => {
    console.log(`id: ${id}, pw: ${password}`)
    setSubmitStatus(SubmitStatus.SUBMITTING)
    setTimeout(() => {
      enqueueSnackbar('account is successfully created', {
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
    await fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        password: password
      })
    })
      .then(res => always<Promise<IAccount>>(res.json(), console.log(res)))
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
      <Typography id='title' variant='h2' noWrap fontSize='min(6vw, 70px)' sx={{ textAlign: 'center' }}>Register Account</Typography>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', }}>
        <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)', justifyContent: 'center' }}>
          <CustomTextInput
            handleChange={handleChange('id')}
            value={id}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            name='Id'
          />
          <CustomTextInput
            handleChange={handleChange('password')}
            value={password}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            name='Password'
            privated
          />
          <CustomTextInput
            handleChange={handleChange('email')}
            value={email ?? ''}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            name='Email'
            required={false}
            validate={(value) => !value || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)}
            errorMsg='Invalid Format'
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
        {steps.map(([label,]) => (
          <Step>
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