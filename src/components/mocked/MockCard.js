import React, { PropTypes } from 'react';
// TODO: import only necessary components in production
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExample = (props) => (
  <Card style={{ marginBottom: 24 }}>

    {props.header && <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="https://placebear.com/50/50"
    />}

    {props.image && <CardMedia
      overlay={props.imageOverlay
        ? <CardTitle
          title="Overlay title"
          subtitle="Overlay subtitle"
        />
        : null
      }
    >
      <img src="https://placebear.com/600/400" />
    </CardMedia>}

    {props.title && <CardTitle
      title={props.titleText}
      subtitle={props.subtitleText}
    />}

    {props.content && <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>}

    {props.buttons && <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>}

  </Card>
);

CardExample.propTypes = {
  header: PropTypes.bool,
  image: PropTypes.bool,
  imageOverlay: PropTypes.bool,
  title: PropTypes.bool,
  titleText: PropTypes.string,
  subtitleText: PropTypes.string,
  content: PropTypes.bool,
  buttons: PropTypes.bool
};

CardExample.defaultProps = {
  titleText: 'Card title',
  subtitleText: 'Card subtitle'
};

export default CardExample;
