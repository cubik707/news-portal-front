import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAppError, setAppError } from '../../../app/app-slice.ts';
import { SyntheticEvent } from 'react';
import { Alert, Snackbar } from '@mui/material';

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)

  const dispatch = useAppDispatch()

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
