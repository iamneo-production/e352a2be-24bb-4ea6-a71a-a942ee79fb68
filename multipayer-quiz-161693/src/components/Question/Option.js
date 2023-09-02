// import { Box } from "@chakra-ui/react";

// const optionColours = ["#5582ac", "#f8f1ba", "#ea977d", "#e2c14d"];

// // Parse HTML entities in string
// export const parseEntities = (content) =>
//   new DOMParser().parseFromString(content, "text/html").body.innerText;

// const Option = ({ index, content, isSelected, onClickHandler }) => {
//   return (
//     <Box
//       p="1rem"
//       w="8rem"
//       h="4rem"
//       borderRadius="lg"
//       borderWidth={isSelected ? "0.4rem" : "0px"}
//       borderColor="white"
//       cursor="pointer"
//       color="#151515"
//       bg={optionColours[index]}
//       onClick={onClickHandler}
//       textAlign="center"
//     >
//       {parseEntities(content)}
//     </Box>
//   );
// };

// export default Option;


import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const optionColours = ['#5582ac', '#f8f1ba', '#ea977d', '#e2c14d'];

// Parse HTML entities in string
export const parseEntities = (content) =>
  new DOMParser().parseFromString(content, 'text/html').body.innerText;

const Option = ({ index, content, isSelected, onClickHandler }) => {
  return (
    <Paper
      elevation={isSelected ? 3 : 0}
      sx={{
        padding: '1rem',
        width: '8rem',
        height: '4rem',
        borderRadius: 'lg',
        cursor: 'pointer',
        color: '#151515',
        backgroundColor: optionColours[index],
        textAlign: 'center',
        border: isSelected ? '2px solid white' : 'none',
      }}
      onClick={onClickHandler}
    >
      <Typography variant="body1">{parseEntities(content)}</Typography>
    </Paper>
  );
};

export default Option;
