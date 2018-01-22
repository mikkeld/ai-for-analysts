import React  from 'react';
import {ListModelsTableRow} from "./listModelsTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export const ListModelsTable = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>View</TableCell>
            <TableCell>Model name</TableCell>
            <TableCell>Model description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Deployed</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.models.map(model => <ListModelsTableRow key={model.id} {...model}/>)}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(ListModelsTable)
