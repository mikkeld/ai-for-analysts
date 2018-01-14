import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 3,
  },
});

export const CodeSnippet = props => {
  const {classes} = props;
  const codeString = '(num) => num + 1';
  return (
    <div className={classes.root}>
      <SyntaxHighlighter language='javascript' style={docco}>{codeString}</SyntaxHighlighter>
    </div>
  )
};

export default withStyles(styles)(CodeSnippet);

