import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { findUser } from '../services/UserServices';
import Cookies from 'js-cookie';

function Stats() {
  // State variable to store statistics
  const [stats, setStats] = useState({
    gamesplayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    score: 0,
  });
  let  userName  = Cookies.get('user');
  userName = userName ? userName.replace(/"/g, '') : null;

  async function fetchData() {
      try {
        const userData = await findUser(userName);
        //console.log(userData);
        setStats((prevState) => {
          return {
            ...prevState,
            gamesplayed: userData.gamesplayed,
            gamesWon: userData.gamesWon,
            gamesLost: userData.gamesLost,
            score: userData.score,
          };
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }


  useEffect(() => {
    fetchData();
    // console.log(stats);
  }, [userName]); // Include userName in the dependency array

  return (
    <div className='Stats' style={{ textAlign: 'center' }}>
      <Typography display="block" variant="overline">
        Total Games Played:
        <Typography display="block" variant="h3" color="purple">
          {stats?.gamesplayed}
        </Typography>
      </Typography>
      <Typography display="block" variant="overline">
        Win-Loss Ratio:
      </Typography>
      <Typography display="inline" variant="h3" color="green">
        {stats?.gamesWon}
      </Typography>
      <Typography display="inline" variant="h3" color="purple">
        <b> | </b>
      </Typography>
      <Typography display="inline" variant="h3" color="red">
        {stats?.gamesLost}
      </Typography>
      <Typography display="block" variant="overline">
        Total Score: {stats?.score}
      </Typography>
    </div>
  );
}

export default Stats;
