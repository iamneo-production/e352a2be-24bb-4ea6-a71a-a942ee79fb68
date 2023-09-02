
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Profile() {
  return (
    <div className="Profile">
        <div display="block" className='Fields'>
         <TextField
          variant="filled"
          id="outlined-read-only-input"
          label="First Name"
          defaultValue="Sam Bells"
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <div display="block" className='Fields'>
        <TextField
          variant="filled"
          id="outlined-read-only-input"
          label="Last Name"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <div display="block" className='Fields'>
        <TextField
          variant="filled"
          id="outlined-read-only-input"
          label="Email ID"
          defaultValue="sambells@gmail.com"
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <div display="block" className='Fields'>
        <TextField
          variant="filled"
          id="outlined-read-only-input"
          label="Mobile"
          defaultValue=""
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <Button variant="contained">Edit</Button>
    </div>
  );
}

export default Profile;
