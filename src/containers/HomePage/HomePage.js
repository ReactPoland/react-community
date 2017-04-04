import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
// TODO: import only necessary components in production
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import styles from './HomePage.scss';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = ({ header, image, title, content, buttons }) => (
  <Card style={{ marginBottom: 24 }}>
    {header && <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="https://placebear.com/50/50"
    />}
    {image && <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="https://placebear.com/600/400" />
    </CardMedia>}
    {title && <CardTitle title="Card title" subtitle="Card subtitle" />}
    {content && <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>}
    {buttons && <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>}
  </Card>
);

export default class HomePage extends Component {
  render() {
    return (
      <Grid className={styles.HomePage}>
        <Helmet title="Home" />
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p><Button bsStyle="primary">Learn more</Button></p>
        </Jumbotron>
        <Row>
          <Col md={7}>
            <Row>
              <Col md={6}>
                <CardExampleWithAvatar title content />
              </Col>
              <Col md={6}>
                <CardExampleWithAvatar title content />
              </Col>
              <Col md={12}>
                <CardExampleWithAvatar title content buttons />
              </Col>
              <Col md={12}>
                <CardExampleWithAvatar title content buttons />
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <CardExampleWithAvatar image />
            <CardExampleWithAvatar title content buttons />
            <CardExampleWithAvatar title content buttons />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <CardExampleWithAvatar title content buttons />
          </Col>
          <Col md={4}>
            <CardExampleWithAvatar title content buttons />
          </Col>
          <Col md={4}>
            <CardExampleWithAvatar title content buttons />
          </Col>
        </Row>
      </Grid>
    );
  }
}
