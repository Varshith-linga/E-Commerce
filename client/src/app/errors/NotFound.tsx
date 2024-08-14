import { Button, Container, Divider, Link, Paper, Typography } from "../../../node_modules/@mui/material/index";

export default function NotFound(){
    return(
        <Container comonent={Paper} sx={{height:400}}>
            <Typography gutterBottom varaint="h3">Oops - we could not find what you are looking for</Typography>
            <Divider/>
            <Button fullwidth component={Link} to='/catalog'>So back to shop</Button>
        </Container>
    )
}