import { useState } from "react";
import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "../../../node_modules/@mui/material/index";
import agent from "../../app/api/agent";
import agents from "../../app/api/agent";

export default function AboutPage(){
    const [validationErrors,setValidationErrors]=useState<string[]>([]);
    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(()=>console.log('should not see this'))
        .catch(err=>setValidationErrors(err));
    }
    return(
        <Container>
            <Typography gutterBottom variant="h2">
            Errors for testing purposes
        </Typography>
        <ButtonGroup>
            <Button variant="contained" onClick={()=>agents.TestErrors.get400Error().catch(err=>console.log(err))}>Test 400 Error</Button>
            <Button variant="contained" onClick={()=>agents.TestErrors.get401Error().catch(err=>console.log(err))}>Test 401 Error</Button>
            <Button variant="contained" onClick={()=>agents.TestErrors.get404Error().catch(err=>console.log(err))}>Test 404 Error</Button>
            <Button variant="contained" onClick={()=>agents.TestErrors.get500Error().catch(err=>console.log(err))}>Test 500 Error</Button>
            <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
        </ButtonGroup>
        {validationErrors.length>0 &&
            <Alert severity='error'>
                <AlertTitle>Validation Errors</AlertTitle>
                <List>
                    {validationErrors.map(err=>(
                        <ListItem key={err}>
                            <ListItemText>{err}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>
        }
        </Container>
        
    )
}