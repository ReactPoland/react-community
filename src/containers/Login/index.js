import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import { Div } from 'components/styled';
import { gitAuthLink } from 'utils';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  ghLogin = () => window.location = gitAuthLink();

  render() {
    return (
      <Grid style={{ height: '100%', marginTop: 20 }}>
        <Div flex column fullHeight>
          <Card>
            <CardTitle title="Login page" />
            <CardText >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton primary label="Authorization" onTouchTap={this.ghLogin} />
            </CardActions>
          </Card>
        </Div>
      </Grid>
    );
  }
}

export default LoginPage;
