import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _find from 'lodash/find';
// STORE
import { loadUsers } from 'redux/modules/usersModule';
// COMPONENTS
import { Map, LoadingScreen } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import { MockCard } from 'components/mocked';
import { Div } from 'components/styled';
import styles from './ProfilePage.scss';

const mappedState = ({ auth, users }, props) => {
  let user = {};

  // On personal profile page, get data from authentication reducer
  if (props.route.name === 'ProfilePage') {
    user = auth.user || {};
  }

  // On other user's page, find data in the users reducer
  if (props.route.name === 'UserPage') {
    user = _find(users.all, usr => props.params.id === `${usr.id}`) || {};
  }

  return {
    user,
    loadingUsers: users.loadingUsers,
    usersLoaded: users.usersLoaded
  };
};

const mappedActions = { loadUsers };

@connect(mappedState, mappedActions)
export default class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object,
    loadingUsers: PropTypes.bool.isRequired,
    usersLoaded: PropTypes.bool.isRequired,
    loadUsers: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.usersLoaded) this.props.loadUsers();
  }

  render() {
    const user = this.props.user;

    return (
      <LoadingScreen loading={this.props.loadingUsers}>
        <Grid className={styles.ProfilePage}>
          <Helmet title="Profile" />
          <MockCard
            title={`${user.firstName} ${user.lastName}`}
            content
          />
          <Paper style={{ overflow: 'hidden', marginBottom: 24 }}>
            <Div flex wrap>
              <Div
                square={200}
                flexVal="none"
                style={{
                  backgroundImage: `url(${user.pictureURL})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <Div flexVal={1} style={{ height: 200, minWidth: 200 }}>
                <Map style={{ height: '100%' }} />
              </Div>
            </Div>
          </Paper>
          <Paper style={{ marginBottom: 24, padding: '0 16px' }}>
            <Row>
              <Col xs={12}>
                <h3>Profile data</h3>
              </Col>
              <Col xs={6}>
                <p>First name: {user.firstName}</p>
                <p>Last name: {user.lastName}</p>
                <p>Email: </p>
                <p>Description: </p>
              </Col>
              <Col xs={6}>
                <p>Password</p>
                <p>Password</p>
                <p>Password</p>
              </Col>
            </Row>
          </Paper>
          <Paper style={{ marginBottom: 24, padding: '0 16px' }}>
            <Row>
              <Col xs={6}>
                <h3>Test results</h3>
                <p>HTML / CSS 50%</p>
                <p>JAVASCRIPT</p>
                <p>REACT / REDUX 75%</p>
                <p>REACT NATIVE 30%</p>
                <p>GRAPHQL 64%</p>
              </Col>
              <Col xs={6}>
                <h3>Activity</h3>
                <p>Comments: 20</p>
                <p>Practices proposed: 2</p>
                <p>Last seen: 20.08.2017</p>
              </Col>
            </Row>
          </Paper>
          <Paper style={{ marginBottom: 24, padding: '0 16px' }}>
            <Row>
              <Col xs={12}>
                <h3>Recent comments</h3>
                <p>Pellentesque at convallis nulla. Curabitur eget posuere sem. Duis velit turpis, suscipit vitae hendrerit pretium, volutpat eu nunc. Aenean eget venenatis velit. Duis quis volutpat erat. Aliquam nec nulla ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis malesuada gravida nulla sed rutrum. Praesent eu ante ut velit pulvinar tristique tristique id augue. Ut efficitur elit nec nisl gravida tempor.</p>
                <p>Phasellus eget pretium nunc. Integer eget sapien eget diam fermentum tempus non vel risus. Suspendisse potenti. Aliquam nec ipsum diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae sodales felis, at finibus felis. Curabitur ultricies purus quis ultrices finibus.</p>
              </Col>
            </Row>
          </Paper>
        </Grid>
      </LoadingScreen>
    );
  }
}
