import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: '/src/asset/Event/5.jpg',
    title: 'EVENTS',
    category: 'event',
  },
  {
    url: '/src/asset/Event/4.jpg',
    title: 'SPORTS',
    category: 'sports',
},
  {
    url: '/src/asset/Event/6.jpg',
    title: 'PARTIES',
    category: 'parties',
},
  {
    url: '/src/asset/Event/7.jpg',
    title: 'COMMUNITIES',
    category: 'communities',
},
  {
    url: '/src/asset/Event/8.jpg',
    title: 'THEATERS',
    category: 'theaters',
},
  {
    url: '/src/asset/Event/9.jpg',
    title: 'CONCERTS',
    category: 'concerts',
},
];

const GradientOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(180deg, rgba(40,40,40,0.15) 40%, rgba(40,40,40,0.55) 100%)',
  borderRadius: '18px',
  zIndex: 1,
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontWeight: 900,
  fontSize: '2rem',
  letterSpacing: 1.5,
  textShadow: '0 4px 24px rgba(0,0,0,0.25)',
  zIndex: 2,
  textAlign: 'center',
  width: '90%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

export default function ButtonBaseDemo() {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      navigate(`/event`, { state: { category } });
    }
  }, [category]);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1100, mx: 'auto', mt: 2, mb: 2 }}>
      <Grid container spacing={4} justifyContent="center">
      {images.map((image, idx) => (
          <Grid item xs={12} sm={6} md={4} key={image.title}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.18)' }}
              style={{ borderRadius: 18 }}
        >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 220,
                  background: '#fff',
                  transition: 'box-shadow 0.3s',
                }}
                elevation={0}
              >
                <CardActionArea
                  sx={{ height: 220, borderRadius: 3, position: 'relative' }}
                  onClick={() => setCategory(image.category)}
                >
                  <CardMedia
                    component="img"
                    image={image.url}
                    alt={image.title}
                    sx={{
                      height: 220,
                      width: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.92)',
                    }}
                  />
                  <GradientOverlay />
                  <CategoryTitle variant="h4">{image.title}</CategoryTitle>
                </CardActionArea>
              </Card>
        </motion.div>
          </Grid>
      ))}
      </Grid>
    </Box>
  );
}
