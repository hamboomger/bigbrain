import _ from 'lodash';
import React from 'react';
import {
  Card, CardActionArea, CardContent, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Poem from './model/poem';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';
import PoemHeader from './PoemHeader';
import PoemTags from './PoemTags';
import AuthorName from './AuthorName';

const TEXT_PREVIEW_LINES_NUMBER = 4;

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fdfdfd',
    transition: '0.4s',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  cardActionArea: {
    padding: 6,
  },
  contentRoot: {
    paddingTop: 10,
  },
  content: {
    fontSize: 10,
    textAlign: 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
  text: {
    paddingTop: 8,
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
});

interface Props extends ComponentProps {
  poem: Poem,
}

function getFirstLine(text: string) {
  const maxCharacters = 25;
  const firstLine = text.split('\n')[0];
  return firstLine.length > maxCharacters
    ? `${firstLine.substr(0, maxCharacters)}...`
    : firstLine;
}

function dropLastCharacterIfItsASign(preview: string) {
  return _.includes([',', '.', '!'], preview.slice(-1))
    ? preview.slice(0, -1)
    : preview;
}

const PoemsGridItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { actions, poem } = props;
  const { showPoemPreview } = actions.chosenPoem;

  const poemName = poem.name || getFirstLine(poem.text);
  const textPreview = getTextPreview(poem.text);
  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => {
          showPoemPreview(poem);
        }}
      >
        <PoemHeader header={poemName} />
        <CardContent className={classes.contentRoot}>
          <AuthorName author={poem.author} />
          <Typography className={classes.text} component="p">
            {textPreview}
          </Typography>
          <PoemTags tags={poem.tags} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

function getTextPreview(text: string) {
  const preview = text.split('\n')
    .slice(0, TEXT_PREVIEW_LINES_NUMBER)
    .join('\n');
  return `${(dropLastCharacterIfItsASign(preview))}...`;
}

export default connectStore(PoemsGridItem);
