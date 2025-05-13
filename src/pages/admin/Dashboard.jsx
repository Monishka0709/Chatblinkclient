import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon, } from '@mui/icons-material'
  import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import moment from 'moment/moment'
import '../../components/layout/Loaders.css'
import { SearchField } from '../../components/styles/StyledComponents'
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { useFetchData } from '6pp';


const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = <Paper
  elevation={3}
  className='stackDashboard'

  sx={{
    padding:'2rem',
    margin:'2.6rem auto',
    borderRadius:'1rem',
    width:'90%',
    maxWidth:'45rem'
  }}>
    
    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
      <AdminPanelSettingsIcon sx={{fontSize:'2.5rem', color: '#444141'}} />
      <SearchField style={{width:'17rem', borderRadius:'1rem', fontSize:'1.2rem', outline:'none', border:'1px solid #444141'}} />
      <Button  sx={{marginTop: '1rem', width: ' 2rem', backgroundColor:'#287c8b',border:'1px solid #287c8b', }} variant='contained' color='primary' type='submit'>sdf</Button>
      <Box flexGrow={1}/>
      <Typography fontFamily={'Readex Pro'}>
        {moment().format("MMMM Do YYYY")}
      </Typography>
    </Stack>
  </Paper>


const Widgets = (
  <div className='widgetContainer' style={{display:'flex', justifyContent:'center', maxWidth:'45rem'}}>
  <Stack
  className='stackDashboard'
    direction={{
      xs: "column",
      sm: "row",
    }}
    spacing="2rem"
    justifyContent="space-between"
    alignItems={"center"}
    margin={"2rem 0"}
    maxWidth={'45rem'}
  >
    <Widget title={"Users"} 
    value={stats?.usersCount} 
    Icon={<PersonIcon sx={{fontSize:'1.5rem', color: '#444141'}}/>} />
    <Widget
      title={"Chats"}
      value={stats?.totalChatsCount}
      Icon={<GroupIcon sx={{fontSize:'1.5rem', color: '#444141'}}/>}
    />
    <Widget
      title={"Messages"}
      value={stats?.messagesCount}
      Icon={<MessageIcon sx={{fontSize:'1.5rem', color: '#444141'}} />}
    />
  </Stack>
  </div>
);


  return (
    <AdminLayout>
      
      <Container component={'main'} width={'100%'} >

        {Appbar}
        <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem" }}
          >
            <Paper
              className='stackDashboard'
              elevation={3}
              sx={{
                padding: "2rem 2rem",
                borderRadius: "1rem",
                width: "90%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"1rem 0"} fontFamily={'Readex Pro'} variant='h6' sx={{color:'#444141'}}>
                Last Messages
              </Typography>

              <LineChart value={stats?.messagesChart || []} />
              {/* <LineChart/> */}
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: "1rem ",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "95%", sm: "50%" },
                position: "relative",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />
              {/* <DoughnutChart/> */}


              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon /> <Typography fontFamily={'Readex Pro'}>Vs </Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>

          {Widgets}

      </Container>
            </AdminLayout>
  )
}

const Widget = ({ title,  Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
      bgcolor: '#def'
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid #444141`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {value} */}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography fontFamily={'Readex Pro'}>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);


export default Dashboard
