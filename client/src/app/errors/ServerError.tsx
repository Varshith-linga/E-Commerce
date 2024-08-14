import { Container, Divider, Paper, Typography } from "../../../node_modules/@mui/material/index";
import { useLocation } from "../../../node_modules/react-router-dom/dist/index";

export default function ServerError(){
    const {state}=useLocation();
    return(
        <Container component={Paper}>
            {state?.error?(
                <>
                    <Typography gutterBottom variant="h3" color='secondary'>
                        {state.error.title}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">{state.error.detail || 'Internal server error'}</Typography>
                </>
            ):(
                <Typography gutterBottom variant='h5'>Server Error</Typography>
            )
            }
            <Typography gutterBottom variant='h5'>Server Error</Typography>
        </Container>
    )
}