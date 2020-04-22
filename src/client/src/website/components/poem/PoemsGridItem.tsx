import _ from 'lodash';
import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Divider, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Poem from './model/poem';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';

const TEXT_PREVIEW_LINES_NUMBER = 4;

const useStyles = makeStyles({
  root: {
    borderRadius: 6,
    backgroundColor: '#fbfbfb',
    transition: '0.4s',
    '&:hover': {
      background: '#fff',
    },
  },
  contentRoot: {
    paddingTop: 7,
  },
  header: {
    fontSize: 10,
    textAlign: 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
  subheader: {
    textAlign: 'left',
  },
  text: {
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
});

interface Props extends ComponentProps {
  poem: Poem,
}

function getFirstLine(text: string) {
  const maxCharacters = 20;
  const firstLine = text.split('\n')[0];
  return firstLine.length > maxCharacters
    ? `${firstLine.substr(0, 20)}...`
    : firstLine;
}

function dropLastCharacterIfItsASign(preview: string) {
  return _.includes([',', '.', '!'], preview.slice(-1))
    ? preview.slice(0, -1)
    : preview;
}

function getTextPreview(text: string) {
  const preview = text.split('\n')
    .slice(0, TEXT_PREVIEW_LINES_NUMBER)
    .join('\n');
  return `${(dropLastCharacterIfItsASign(preview))}...`;
}

const PoemsGridItem: React.FC<Props> = (props) => {
  const { actions, poem } = props;
  const classes = useStyles();
  const { showPoemPreview } = actions.chosenPoem;

  const poemName = poem.name || getFirstLine(poem.text);
  const textPreview = getTextPreview(poem.text);
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => {
        showPoemPreview(poem);
      }}
      >
        <CardHeader title={poemName} className={classes.header} />
        <Divider />
        <CardContent className={classes.contentRoot}>
          <Typography className={classes.subheader} color="textSecondary" gutterBottom>
            {poem.author}
          </Typography>
          <Typography className={classes.text} component="p">
            {textPreview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default connectStore(PoemsGridItem);