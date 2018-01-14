import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import {formatPercentage} from '../../utils/utils';

export const ListPredictionsTableRow = (props) => {
  return (
    <TableRow>
      {props.values.map(value => <TableCell>{value}</TableCell>)}
    </TableRow>
  )
};
