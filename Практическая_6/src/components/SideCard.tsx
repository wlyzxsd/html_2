import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ComponentProps {
    item: {
        img: string;
        title: string;
        description: string;
    };

    reverse?: boolean;
}

function SideCard({ item, reverse = false }: ComponentProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: reverse ? 'row-reverse' : 'row',
                alignItems: 'center',
                p: 2,
            }}
        >
            <CardMedia
                component='img'
                image={item.img}
                alt={item.title}
                sx={{
                    width: 140,
                    height: 160,
                    objectFit: 'contain',
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 160,
                    width: '100%',
                    textAlign: reverse ? 'right' : 'left',
                }}
            >
                <CardContent>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {item.title}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        {item.description}
                    </Typography>
                </CardContent>

                <Box
                    sx={{
                        px: 2,
                        pb: 2,
                        display: 'flex',
                        justifyContent: reverse ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Button variant='contained' size='small'>
                        Подробнее
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}

export default SideCard;