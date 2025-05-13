import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import '../layout/Loaders.css'
import { DataGrid } from '@mui/x-data-grid'
import { grayColor, green } from '../../constants/color'

const Table = ({rows, columns, heading, rowHeight = 52}) => {
  return ( 
    <Container sx={{
        height:'90vh',
        // maxHeight:'45rem',
        
        maxWidth:'40rem',
        
    }}>

        <Paper elevation={3} sx={{
                padding: '1rem 4rem',
                borderRadius: '1rem',
                margin: 'auto',
                bgcolor: grayColor,
                // width: '100%',
                overflow: 'hidden',
                height: '100%'
        }}>
            <Typography textAlign={'center'} variant='h4' sx={{
                margin:'2rem',
                fontFamily:'Readex Pro',
                textTransform: 'uppercase',
                color:green
            }}>{heading}</Typography>
            <DataGrid
             rows={rows}
             columns={columns}
             rowHeight={rowHeight}
             style={{
                height:'80%',
                fontFamily:'Readex Pro'


             }}
             
             sx={{
                border:'none',
                ".table-header":{
                    bgcolor:'#444141',
                    color:'white'
                }
             }}/>

        </Paper>

    </Container>
  )
}

export default Table
