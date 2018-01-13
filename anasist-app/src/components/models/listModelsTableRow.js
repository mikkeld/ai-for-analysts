import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import Icon from 'material-ui/Icon';


export const ListModelsTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><a onClick={() => console.log("editing")}><Icon>mode_edit</Icon></a></TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.type}</TableCell>
      <TableCell>{props.progress}</TableCell>
    </TableRow>
  )
};
