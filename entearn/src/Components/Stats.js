import Typography from '@mui/material/Typography';
import React from 'react';

function Stats() {
    return (
    <div className='Stats'>
      <Typography display="block" variant="overline">
        Total Games Played:
        <Typography display="block" variant="h3" color="purple">
         0
        </Typography>
      </Typography>
      <Typography display="block" variant="overline">
        Win-Loss Ratio:
      </Typography>
        <Typography display="inline" variant="h3" color="green">
         0
        </Typography>
        <Typography display="inline" variant="h3" color="purple">
         <b> | </b>
        </Typography>
        <Typography display="inline" variant="h3" color="red">
         0
        </Typography>
      <Typography display="block" variant="overline">
        Favourite Categories:
      </Typography>
      <Typography display="block"variant="overline">
        Badged Earned:
      </Typography>
    </div>
    );
  }
  
  export default Stats;
  