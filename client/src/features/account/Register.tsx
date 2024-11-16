
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import { LoadingButton } from "../../../node_modules/@mui/lab/index";
import agents from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register() {
    const navigate=useNavigate()
    const { register, handleSubmit,setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });
    function handleApiErrors(errors:any){
        if(errors){
            errors.forEach((error:any) => {
                if(error.includes('Password')){
                    setError('password',{message:error});
                }else if(error.includes('Email')){
                    setError('email',{message:error});
                }else if(error.includes('Username')){
                    setError('username',{message:error});
                }
            });
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data: any) => agents.Account.register(data)
                .then(()=>{toast.success("Registration Successfull - you can now login");navigate('/login')})
                .catch((error: any) => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" fullWidth label="Username" autoFocus {...register('username', { required: 'Username is required' })} error={errors.username} helperText={errors?.username?.message} />
                <TextField margin="normal" fullWidth label="Email" {...register('email', { required: 'Email is required',pattern:{value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,message:'Not a valid email address'} })} error={errors.email} helperText={errors?.email?.message} />
                <TextField margin="normal" fullWidth label="password" type="password" {...register('password', { required: 'Password is required', pattern:{value:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,message:'password does not meet complexity requirements'} })} error={errors.password} helperText={errors?.password?.message} />
                <LoadingButton loading={isSubmitting} disabled={!isValid} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            {"Already have an account? Sign Ip"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}