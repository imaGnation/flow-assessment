import React from 'react';
import { Container } from 'reactstrap';

export default props => (
  <div className="App">
    <Container>
      {props.children}
    </Container>
  </div>
);