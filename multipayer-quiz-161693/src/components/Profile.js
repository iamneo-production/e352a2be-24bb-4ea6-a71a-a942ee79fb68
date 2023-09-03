import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { updateUser,findUser } from '../services/UserServices';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';

function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });

  const [userData,setUserData] = useState({});
  let  userName  = Cookies.get('user');
  userName = userName ? userName.replace(/"/g, '') : null;
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProfileData = async() => {
   try {
     
     //console.log(userName);
      const Data = await findUser(userName).then(res=>res);
      setUserData(Data);
      //console.log(Data);
      setProfileData({
        ...profileData,
        firstName: Data?.firstname || '',
        lastName: Data?.lastname || '',
        email: Data?.email || '',
        mobile: Data?.mobileNo || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    
    fetchProfileData();
  }, [userName]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const saveProfileData = async()=>{
    console.log(userData);
    let profile = {...userData,firstname:profileData?.firstName,
                                lastname:profileData?.lastName,
                                email:profileData?.email,
                                mobileNo:profileData?.mobile}
    await updateUser(profile.id,profile);
  }

  const handleSaveClick = () => {
    saveProfileData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <div className="Profile">
        <Typography>USER PROFILE</Typography>
        <div className='Fields'>
          <TextField
            variant="filled"
            id="outlined-read-only-input"
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            InputProps={{
              readOnly: !isEditMode,
            }}
            onChange={handleInputChange}
          />
        </div>
        <div className='Fields'>
          <TextField
            variant="filled"
            id="outlined-read-only-input"
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            InputProps={{
              readOnly: !isEditMode,
            }}
            onChange={handleInputChange}
          />
        </div>
        <div className='Fields'>
          <TextField
            variant="filled"
            id="outlined-read-only-input"
            label="Email ID"
            name="email"
            value={profileData.email}
            InputProps={{
              readOnly: !isEditMode,
            }}
            onChange={handleInputChange}
          />
        </div>
        <div className='Fields'>
          <TextField
            variant="filled"
            id="outlined-read-only-input"
            label="Mobile"
            name="mobile"
            value={profileData.mobile}
            InputProps={{
              readOnly: !isEditMode,
            }}
            onChange={handleInputChange}
          />
        </div>
        {isEditMode ? (
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </div>
    </Box>
  );
}

export default Profile;
