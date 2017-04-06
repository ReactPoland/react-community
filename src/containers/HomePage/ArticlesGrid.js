import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// LAYOUT
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { MockCard } from 'components/mocked';

@connect()
class ArticlesGrid extends Component {
  static propTypes = {
    value: PropTypes.string
  }

  render() {
    return (
      <Row>
        <Col md={6}>
          <MockCard title content />
        </Col>
        <Col md={6}>
          <MockCard title content />
        </Col>
        <Col md={6}>
          <MockCard title content />
        </Col>
        <Col md={12}>
          <MockCard title content buttons />
        </Col>
        <Col md={12}>
          <MockCard title content buttons />
        </Col>
      </Row>
    );
  }
}

export default ArticlesGrid;
