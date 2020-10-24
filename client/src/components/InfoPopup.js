import React from 'react';
import { Popup } from 'semantic-ui-react';

function InfoPopup({ children, content }) {
  return <Popup content={content} inverted trigger={children} />;
}

export default InfoPopup;
