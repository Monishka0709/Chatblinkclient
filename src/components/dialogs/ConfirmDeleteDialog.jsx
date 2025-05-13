import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { green, red } from '../../constants/color'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontFamily={'Readex Pro'}>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText fontFamily={'Readex Pro'}>
            Are you sure you want to delete this group?
        </DialogContentText>

      </DialogContent>
      <DialogActions >
        <Button sx={{bgcolor:green, color:'white',outline:'2px solid', outlineColor:green }}  onClick={handleClose}>No</Button>
        <Button sx={{bgcolor:'transparent', outline:'2px solid', outlineColor:red , color:red, ":hover" : {bgcolor:red, color:'white'}}}  onClick={deleteHandler}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
