import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Container, useTheme, useMediaQuery } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

const ModeSelection = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNavigate = (mode) => {
    navigate(`/${mode}`);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#0d1b2a', 
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 4, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" color="#ffffff" fontWeight={600}>
            {userEmail ? `Welcome, ${userEmail}` : "Loading..."}
          </Typography>
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 600, color: '#ff6f61', borderColor: '#ff6f61', '&:hover': { backgroundColor: '#ff6f61', color: '#ffffff' } }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#ff6f61', mr: 1 }} />
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ fontWeight: 700, color: '#ffffff', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            >
              KneeRevive
            </Typography>
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ color: '#a0aec0', maxWidth: '600px', mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            Your Advanced Virtual Physiotherapy Assistant for Personalized Knee Rehabilitation
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ 
              padding: 4, 
              textAlign: 'center', 
              cursor: 'pointer', 
              backgroundColor: '#1b263b', 
              '&:hover': { backgroundColor: '#ff6f61', color: '#ffffff' },
              transition: '0.3s'
            }} onClick={() => handleNavigate('therapy')}>
              <FavoriteIcon sx={{ fontSize: 40, color: '#ff6f61' }} />
              <Typography variant="h5" fontWeight={600} mt={2}>Therapy Mode</Typography>
              <Typography variant="body2" sx={{ color: '#a0aec0' }}>Personalized exercises and guided therapy for your knee recovery journey.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ 
              padding: 4, 
              textAlign: 'center', 
              cursor: 'pointer', 
              backgroundColor: '#1b263b', 
              '&:hover': { backgroundColor: '#1976d2', color: '#ffffff' },
              transition: '0.3s'
            }} onClick={() => handleNavigate('saviour')}>
              <ShieldIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Typography variant="h5" fontWeight={600} mt={2}>Saviour Mode</Typography>
              <Typography variant="body2" sx={{ color: '#a0aec0' }}>Emergency alerts, fall detection, and immediate assistance during recovery.</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 'auto', py: 4 }}>
          <Typography variant="body2" sx={{ color: '#a0aec0' }}>
            © 2025 KneeAI Technologies. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ModeSelection;
