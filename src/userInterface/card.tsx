import React from 'react';
import classes from './card.module.css';

interface Props {
    children: React.ReactNode
}

const Card: React.FC<Props> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
