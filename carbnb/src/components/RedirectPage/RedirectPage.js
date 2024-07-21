import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const RedirectPage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        You need to be logged in to access this page.
      </Alert>
    </Snackbar>
  );
};

export default RedirectPage;
