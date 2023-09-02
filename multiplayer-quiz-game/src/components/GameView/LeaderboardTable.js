// import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
// import { sortWith, descend, ascend, prop } from "ramda";
// // Sorting Helper
// const scoreNameSort = sortWith([descend(prop("score")), ascend(prop("name"))]);
// const LeaderboardTable = ({ data }) => {
//   const sortedData = scoreNameSort(data);
//   return (
//     <Table variant="simple">
//       <Thead>
//         <Tr>
//           <Th>Rank</Th>
//           <Th>Player</Th>
//           <Th isNumeric>Score</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {sortedData.map((player, index) => (
//           <Tr key={player.id}>
//             <Td>{index + 1}</Td>
//             <Td>{player.name}</Td>
//             <Td isNumeric>{player.score}</Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// };
// export default LeaderboardTable;


import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from '@mui/material';

// Sorting Helper
const scoreNameSort = (data) =>
  data.slice().sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const LeaderboardTable = ({ data }) => {
  const sortedData = scoreNameSort(data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((player, index) => (
            <TableRow key={player.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell align="right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
