import { Box, Grid, Paper, Typography } from '@mui/material';
import AccessibleForm from './components/AccessibleForm';
import InaccessibleForm from './components/InaccessibleForm';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4, px: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Form Accessibility Comparison
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Left — Inaccessible */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: 'error.main', fontWeight: 'bold', mb: 1 }}
          >
            ❌ Inaccessible Form
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <InaccessibleForm />
          </Paper>
        </Grid>

        {/* Right — Accessible */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: 'success.main', fontWeight: 'bold', mb: 1 }}
          >
            ✅ Accessible Form
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <AccessibleForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
