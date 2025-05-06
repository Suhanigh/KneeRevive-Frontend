import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container, useTheme, useMediaQuery } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom'; // 🔁 Add this for navigation

const ModeSelection = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const navigate = useNavigate(); // 🔁 Initialize navigate

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 4, md: 6 }
      }}
    >
      <Container maxWidth="lg">

        {/* Header Section */}
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#1976d2', mr: 1 }} />
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ fontWeight: 700, color: '#1a2c42', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            >
              KneeAI
            </Typography>
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ color: '#637381', maxWidth: '600px', mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            Your Advanced Virtual Physiotherapy Assistant for Personalized Knee Rehabilitation
          </Typography>
        </Box>

        {/* Mode Selection Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center" sx={{ mb: 6 }}>

          {/* Therapy Mode */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper 
              elevation={isLaptop ? 2 : 1} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <FavoriteIcon sx={{ color: '#1976d2', mr: 1.5, fontSize: 28 }} />
                <Typography variant="h5" fontWeight="700" color="#1a2c42">
                  Therapy Mode
                </Typography>
              </Box>
              <Typography variant="body1" color="#637381" fontWeight="500" mb={2}>
                Access comprehensive historical data, assessments, and insights.
              </Typography>
              <Typography variant="body2" color="#637381" mb={4} sx={{ lineHeight: 1.6 }}>
                Review your past knee movement data, analyze recovery trends, and understand your progress over time. Get AI-generated assessments and personalized recommendations based on your rehabilitation history.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  backgroundColor: '#1976d2', 
                  '&:hover': { backgroundColor: '#0d5aa3' },
                  py: 1.5,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Go to Therapy Mode →
              </Button>
            </Paper>
          </Grid>

          {/* Saviour Mode */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper 
              elevation={isLaptop ? 2 : 1} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <ShieldIcon sx={{ color: '#2e7d32', mr: 1.5, fontSize: 28 }} />
                <Typography variant="h5" fontWeight="700" color="#1a2c42">
                  Saviour Mode
                </Typography>
              </Box>
              <Typography variant="body1" color="#637381" fontWeight="500" mb={2}>
                Real-time monitoring with intelligent AI assistance.
              </Typography>
              <Typography variant="body2" color="#637381" mb={4} sx={{ lineHeight: 1.6 }}>
                Monitor your knee movements in real-time, receive instant feedback on technique, and interact with our advanced AI chatbot for personalized guidance and preventative support during your exercises.
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => navigate('/saviour')} // 🔁 Navigate on click
                sx={{ 
                  color: '#2e7d32', 
                  borderColor: '#2e7d32', 
                  '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.04)', borderColor: '#2e7d32' },
                  py: 1.5,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Go to Saviour Mode →
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 'auto' }}>
          <Typography variant="body2" sx={{ color: '#637381' }}>
            © 2025 KneeAI Technologies. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ModeSelection;
