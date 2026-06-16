import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import structures from '../../data';

function CircleCards() {
    return (
        <Container sx={{ mb: 5 }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                {structures.circles.map((item, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: '50%',
                                    border: '2px solid #dee2e6',
                                    overflow: 'hidden',
                                    mx: 'auto',
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Box>

                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                {item.title}
                            </Typography>

                            <Typography sx={{ color: 'text.secondary' }}>
                                {item.subtitle}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CircleCards;