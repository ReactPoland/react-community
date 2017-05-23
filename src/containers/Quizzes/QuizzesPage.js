import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import NavItem from 'react-bootstrap/lib/NavItem';

export default function QuizzesPage({ list }) {
  if (!( list && list.length )) {
    return (
      <div className="container">Items not available</div>
    );
  }
  return (
    <div className="container">
      {list.map((item, key) => {
        return (
          <LinkContainer to={`quizzes/${item.id}`} key={key} >
            <NavItem>{item.title}</NavItem>
          </LinkContainer>
        );
      })}
    </div>
  );
}
