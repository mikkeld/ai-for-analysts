import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import {formatPercentage} from '../../utils/utils';
import {
  Link
} from 'react-router-dom';

export const ListModelsTableRow = (props) => {
  const progress = props.progress === 1
    ? <Icon color="primary">check_circle</Icon>
    : formatPercentage(props.progress);
  const detailLink = props.progress === 1
    ? <Link style={{textDecoration: 'none'}} to={{ pathname: `models/${props.id}` }}><Icon>visibility</Icon></Link>
    : <Icon color="disabled">visibility</Icon>;
  const deployedLink = props.deployed
    ? <Link style={{textDecoration: 'none'}} to={{ pathname: `deploy/${props.id}` }}><Icon>wifi</Icon></Link>
    : <Link style={{textDecoration: 'none'}} to={{ pathname: `deploy/${props.id}` }}><Icon>not_interested</Icon></Link>
  return (
    <TableRow>
      <TableCell>{detailLink}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.type}</TableCell>
      <TableCell>{deployedLink}</TableCell>
      <TableCell>{progress}</TableCell>
    </TableRow>
  )
};
