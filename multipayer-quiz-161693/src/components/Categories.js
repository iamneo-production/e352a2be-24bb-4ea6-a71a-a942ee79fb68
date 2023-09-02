import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';

function Categories() {
  const [category, setCategory] = React.useState('Movies');
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('single');
  const [start, setStart] = React.useState('Single Player');

  const handleButtonClick = (newMode) => {
    setMode(newMode);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChange3 = (event) => {
    setStart(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="16px"
      gap="20px"
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Multiplayer Trivia
      </Typography>

      <div className='Fields'>
        <FormControl sx={{ minWidth: 300 }}>
           <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center',color:'orange' }}>
        Game Mode
      </Typography>

          <ButtonGroup color="primary" exclusive aria-label="Platform">
            <Button
              onClick={() => handleButtonClick('single')}
              variant={mode === 'single' ? 'contained' : 'outlined'}
            >
              <b>Single player</b>
            </Button>
            <Button
              onClick={() => handleButtonClick('multi')}
              variant={mode === 'multi' ? 'contained' : 'outlined'}
            >
              <b>Multi Player</b>
            </Button>
          </ButtonGroup>
        </FormControl>
      </div>

      <div className='Fields'>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label" sx={{ textAlign: 'center' }}>
            Quiz Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Trivia Category"
            onChange={handleChange}
          >
            <MenuItem value={"Music"}>Music</MenuItem>
            <MenuItem value={"Magic"}>Magic</MenuItem>
            <MenuItem value={"Movies"}>Movies</MenuItem>
            <MenuItem value={"Sports"}>Sports</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        onClick={() => navigate("/game/" + mode + "/" + category)}
        variant="contained"
        size="large"
      >
        Go
      </Button>
    </Box>
  );
}

export default Categories;
