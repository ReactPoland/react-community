import React, { PropTypes } from 'react';
// TODO: import only necessary components in production
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const MockCard = (props) => (
  <Card style={{ marginBottom: 24, ...props.style }} onClick={props.onClick}>

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

    {(props.title || props.subtitle) && <CardTitle
      title={props.title}
      subtitle={props.subtitle}
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

MockCard.propTypes = {
  header: PropTypes.bool,
  image: PropTypes.bool,
  imageOverlay: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.bool,
  buttons: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object
};

MockCard.defaultProps = {
  onClick: () => {},
  style: {}
};

export default MockCard;
