import React  from 'react';
import {ListPredictionsTableRow} from "./listPredictionsTableRow";
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

export const ListPredictionsTable = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.headers.map(name => <TableCell>{name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.values.map(prediction => <ListPredictionsTableRow key={prediction.id} values={prediction}/>)}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(ListPredictionsTable)
