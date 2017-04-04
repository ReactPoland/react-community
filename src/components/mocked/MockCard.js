import React, { PropTypes } from 'react';
// TODO: import only necessary components in production
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExample = ({ header, image, title, content, buttons }) => (
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

CardExample.propTypes = {
  header: PropTypes.bool,
  image: PropTypes.bool,
  title: PropTypes.bool,
  content: PropTypes.bool,
  buttons: PropTypes.bool
};

export default CardExample;
