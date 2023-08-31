
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Categories() {
  const [category, setCategory] = React.useState('Movies');

 
  const [alignment, setAlignment] = React.useState('Single Player');
  const [start, setStart] = React.useState('Single Player');
  const handleChange2 = (e, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChange3 = (event) => {
    setStart(event.target.value);
  };
  return (
    <div className="Categories">
      <div className='Fields'>
      <InputLabel id="demo-simple-select-label">Game Mode</InputLabel>
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange2}
      aria-label="Platform"
    >
      <ToggleButton value="single"><b>Single player</b></ToggleButton>
      <ToggleButton value="multi"><b>Multi player</b></ToggleButton>
  
    </ToggleButtonGroup>
      </div>
      <div className='Fields'>
        <FormControl sx={{ minWidth: 300 }}>
           <InputLabel id="demo-simple-select-label">Quiz Category</InputLabel>
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
      <div className='Fields'>
      <InputLabel>Game Mode</InputLabel>
      <ToggleButtonGroup
      color="primary"
      value={start}
      exclusive
      onChange={handleChange3}
      aria-label="Platform"
    >
      <ToggleButton value="create"><b>Create Room</b></ToggleButton>
      <ToggleButton value="join"><b>Enter Room</b></ToggleButton>
  
    </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default Categories;
