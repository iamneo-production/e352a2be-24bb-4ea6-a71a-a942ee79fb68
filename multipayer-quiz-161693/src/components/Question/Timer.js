// import { Heading, HStack, Progress } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

// const Timer = ({ duration }) => {
//   const [timeLeft, setTimeLeft] = useState(duration / 1000);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         return prev - 1;
//       });
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <HStack spacing="1rem">
//       <Progress
//         colorScheme="yellow"
//         size="md"
//         value={timeLeft}
//         min={0}
//         max={duration / 1000}
//         width="20rem"
//       />
//       <Heading w="5rem">{`${timeLeft} s`}</Heading>
//     </HStack>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from "react";
import { LinearProgress, Typography, Grid } from "@mui/material";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <LinearProgress
          variant="determinate"
          value={(timeLeft / (duration / 1000)) * 100}
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{`${timeLeft} s`}</Typography>
      </Grid>
    </Grid>
  );
};

export default Timer;
