import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({reference,designation,prix,image}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={reference}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          reference
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          designation
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          prix
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}