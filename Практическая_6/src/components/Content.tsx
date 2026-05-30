import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SideCard from './SideCard';
import structures from '../data';

function Content() {
    return (
        <Container maxWidth='xl' sx={{ mb: 5 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {structures.leftCards.map((item, index) => (
                            <SideCard key={index} item={item} />
                        ))}
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        mb: 3,
                                    }}
                                >
                                    {structures.centerContent.title}
                                </Typography>

                                <Typography
                                    sx={{ color: 'text.secondary', textAlign: 'justify' }}
                                >
                                    {structures.centerContent.description}
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant='contained' size='small'>
                                    Подробнее
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {structures.rightCards.map((item, index) => (
                            <SideCard key={index} item={item} reverse />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Content;