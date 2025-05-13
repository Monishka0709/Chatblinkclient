<<<<<<< HEAD
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validation';
import Background from '../assets/login_background.png';
// import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";



const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);



    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useStrongPassword("");

    const avatar = useFileHandler("single");

    const dispatch = useDispatch();

    const handleLogin = async(e) => 
    {
        e.preventDefault();
        const toastId = toast.loading("Logging In...");

        setIsLoading(true);
        const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    

    }



    try {
        const { data } = await axios.post(
          `${server}/api/v1/user/login`,
          {
            username: username.value,
            password: password.value,
          },
          config
        );
        dispatch(userExists(data.user));
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };

    


    const handleSignUp = async(e) => 
    {
        e.preventDefault();

        const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    
            
    }


    try {
        const { data } = await axios.post(
          `${server}/api/v1/user/new`,
          formData,
          config
        );
  
        userExists(data.user);
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };
  


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
                isLogin ? <>
                <Typography sx={{color:'#287c8b',
                    fontFamily: "Readex Pro",
                    fontWeight: 500,
                    fontSize: '2rem'
                }}
                >Login</Typography>
                <form style={{
                    width: '100%',
                    marginTop:'1rem',
                }
                }
                onSubmit={handleLogin}
                >

                
                    <TextField required fullWidth label="Username" margin="normal" variant='outlined' value={username.value} onChange={username.changeHandler}></TextField>
                    <TextField required fullWidth label="Password" type='password' margin="normal" variant='outlined' value={password.value} onChange={password.changeHandler}></TextField>
                    <Stack>
                    <Button  sx={{marginTop: '1rem', backgroundColor:'#287c8b',border:'1px solid #287c8b', /*'&:hover':{border:'1px solid #ebf9fe'}*/}} variant='contained' color='primary' type='submit' disabled={isLoading} onClick={handleLogin}>Login</Button> 
                    <Typography textAlign={'center'} mt={'1rem'} >Or</Typography>
                    <Button   sx={{marginTop: '1rem', backgroundColor:'#ebf9fe', border:'1px solid #ebf9fe', color:'#287c8b', '&:hover':{border:'1px solid rgba(40, 124, 139, 0.82)'}}} variant='text'  onClick={() => setIsLogin(!isLogin)}>Sign Up</Button>
                    </Stack>
                </form>
                </> : <>
                <Typography sx={{color:'#287c8b', fontFamily:'Readex Pro', fontWeight: 500, fontSize:'2rem'}}>Sign Up</Typography>
                <form style={{
                    width: '100%',
                    marginTop:'1rem',
                }

                }
                >
                        <Stack position={"relative"} width={"6rem"} margin={"auto"}>
                        <Avatar sx={{
                            width:"6rem",
                            height:"6rem",
                            objectFit:"contain",

                        }}
                        src={avatar.preview}/>
                        {
                        avatar.error && (
                            <Typography m={"1rem auto"} width={"fit-content"} display={"block"} color='error' variant='caption'>{avatar.error}</Typography>
                        )
                    }
                        <IconButton sx={{
                            position:"absolute",
                            bottom: "0",
                            right:"0",
                            color:"white",
                            bgcolor:"rgba(0,0,0,0.5)",
                            ":hover": {
                                bgcolor:"rgba(0,0,0,0.7)"
                            }

                        }}
                        component="label">
                            <>
                            <CameraAltIcon/>
                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                            </>
                        </IconButton>

                    </Stack>

                    
                    
                    <TextField required fullWidth label="Name" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={name.value} onChange={name.changeHandler}></TextField>
                    <TextField required fullWidth label="Bio" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={bio.value} onChange={bio.changeHandler}></TextField>
                    <TextField required fullWidth label="Username" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={username.value} onChange={username.changeHandler}></TextField>
                    {
                        username.error && (
                            <Typography color='error' variant='caption'>{username.error}</Typography>
                        )
                    }
                    <TextField required fullWidth label="Password" type='password' margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={password.value} onChange={password.changeHandler}></TextField>
                    {
                        password.error && (
                            <Typography color='error' variant='caption'>{password.error}</Typography>
                        )
                    }
                    <Button  fullWidth sx={{marginTop: '0.8rem', backgroundColor:'#287c8b'}} variant='contained' color='primary' type='submit' disabled={isLoading} onClick={handleSignUp}>Sign Up</Button>
                    <Typography textAlign={'center'} mt={'0.8rem'} >Or</Typography>
                    <Button  fullWidth sx={{marginTop: '0.8rem', backgroundColor:'#ebf9fe', border:'1px solid #ebf9fe', color:'#287c8b', '&:hover':{border:'1px solid #287c8b'}}} variant='text' onClick={toggleLogin}>Login</Button>
                </form></>
            }

        </Paper>

    </Container>
    </div>
    
  )
}

=======
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validation';
import Background from '../assets/login_background.png';
// import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";



const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);



    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useStrongPassword("");

    const avatar = useFileHandler("single");

    const dispatch = useDispatch();

    const handleLogin = async(e) => 
    {
        e.preventDefault();
        const toastId = toast.loading("Logging In...");

        setIsLoading(true);
        const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    

    }



    try {
        const { data } = await axios.post(
          `${server}/api/v1/user/login`,
          {
            username: username.value,
            password: password.value,
          },
          config
        );
        dispatch(userExists(data.user));
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };

    


    const handleSignUp = async(e) => 
    {
        e.preventDefault();

        const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    
            
    }


    try {
        const { data } = await axios.post(
          `${server}/api/v1/user/new`,
          formData,
          config
        );
  
        userExists(data.user);
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };
  


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
                isLogin ? <>
                <Typography sx={{color:'#287c8b',
                    fontFamily: "Readex Pro",
                    fontWeight: 500,
                    fontSize: '2rem'
                }}
                >Login</Typography>
                <form style={{
                    width: '100%',
                    marginTop:'1rem',
                }
                }
                onSubmit={handleLogin}
                >

                
                    <TextField required fullWidth label="Username" margin="normal" variant='outlined' value={username.value} onChange={username.changeHandler}></TextField>
                    <TextField required fullWidth label="Password" type='password' margin="normal" variant='outlined' value={password.value} onChange={password.changeHandler}></TextField>
                    <Stack>
                    <Button  sx={{marginTop: '1rem', backgroundColor:'#287c8b',border:'1px solid #287c8b', /*'&:hover':{border:'1px solid #ebf9fe'}*/}} variant='contained' color='primary' type='submit' disabled={isLoading} onClick={handleLogin}>Login</Button> 
                    <Typography textAlign={'center'} mt={'1rem'} >Or</Typography>
                    <Button   sx={{marginTop: '1rem', backgroundColor:'#ebf9fe', border:'1px solid #ebf9fe', color:'#287c8b', '&:hover':{border:'1px solid rgba(40, 124, 139, 0.82)'}}} variant='text'  onClick={() => setIsLogin(!isLogin)}>Sign Up</Button>
                    </Stack>
                </form>
                </> : <>
                <Typography sx={{color:'#287c8b', fontFamily:'Readex Pro', fontWeight: 500, fontSize:'2rem'}}>Sign Up</Typography>
                <form style={{
                    width: '100%',
                    marginTop:'1rem',
                }

                }
                >
                        <Stack position={"relative"} width={"6rem"} margin={"auto"}>
                        <Avatar sx={{
                            width:"6rem",
                            height:"6rem",
                            objectFit:"contain",

                        }}
                        src={avatar.preview}/>
                        {
                        avatar.error && (
                            <Typography m={"1rem auto"} width={"fit-content"} display={"block"} color='error' variant='caption'>{avatar.error}</Typography>
                        )
                    }
                        <IconButton sx={{
                            position:"absolute",
                            bottom: "0",
                            right:"0",
                            color:"white",
                            bgcolor:"rgba(0,0,0,0.5)",
                            ":hover": {
                                bgcolor:"rgba(0,0,0,0.7)"
                            }

                        }}
                        component="label">
                            <>
                            <CameraAltIcon/>
                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                            </>
                        </IconButton>

                    </Stack>

                    
                    
                    <TextField required fullWidth label="Name" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={name.value} onChange={name.changeHandler}></TextField>
                    <TextField required fullWidth label="Bio" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={bio.value} onChange={bio.changeHandler}></TextField>
                    <TextField required fullWidth label="Username" margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={username.value} onChange={username.changeHandler}></TextField>
                    {
                        username.error && (
                            <Typography color='error' variant='caption'>{username.error}</Typography>
                        )
                    }
                    <TextField required fullWidth label="Password" type='password' margin="normal" sx={{ '& .MuiInputLabel-root': { fontSize: '0.8rem',}}} inputProps={{style: {paddingTop: 10,  }}} variant='outlined' value={password.value} onChange={password.changeHandler}></TextField>
                    {
                        password.error && (
                            <Typography color='error' variant='caption'>{password.error}</Typography>
                        )
                    }
                    <Button  fullWidth sx={{marginTop: '0.8rem', backgroundColor:'#287c8b'}} variant='contained' color='primary' type='submit' disabled={isLoading} onClick={handleSignUp}>Sign Up</Button>
                    <Typography textAlign={'center'} mt={'0.8rem'} >Or</Typography>
                    <Button  fullWidth sx={{marginTop: '0.8rem', backgroundColor:'#ebf9fe', border:'1px solid #ebf9fe', color:'#287c8b', '&:hover':{border:'1px solid #287c8b'}}} variant='text' onClick={toggleLogin}>Login</Button>
                </form></>
            }

        </Paper>

    </Container>
    </div>
    
  )
}

>>>>>>> b8a3feb (first commit)
export default Login