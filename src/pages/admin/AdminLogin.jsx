import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import Background from '../../assets/login_background.png';


const AdminLogin = () => {

    const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;


  return (
    <div style={{
        backgroundImage:`url(${Background})`,
                

    }}>
    <Container component={"main"} maxWidth='xs' sx={{
        height:'100vh',
        display: "flex",
        justifyContent: "center",
        alignItems:"center",


    }}>
        <Paper elevation={3} 
        sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            borderRadius:"10px",
            alignItems:"center",

        }}>

            {
                 <>
                <Typography sx={{color:'#287c8b',
                    fontFamily: "Readex Pro",
                    fontWeight: 500,
                    fontSize: '2rem'
                }}
                > Admin Login</Typography>
                <form style={{
                    width: '100%',
                    marginTop:'1rem',
                }
                }
                onSubmit={submitHandler}
                >

                
                    {/* <TextField required fullWidth label="Username" margin="normal" variant='outlined' value={username.value} onChange={username.changeHandler}></TextField> */}
                    <TextField 
                            required 
                            fullWidth 
                            label="Secret Key" 
                            type='password' 
                            margin="normal" 
                            variant='outlined' 
                            value={secretKey.value} 
                            onChange={secretKey.changeHandler}
                            />
                    { <Button  fullWidth sx={{marginTop: '1rem', backgroundColor:'#287c8b',border:'1px solid #287c8b', /*'&:hover':{border:'1px solid #ebf9fe'}*/}} variant='contained' color='primary' type='submit'>Login</Button> }
                    
                </form>
                </> 
                            }

        </Paper>

    </Container>
    </div>
    
  )
}

export default AdminLogin
