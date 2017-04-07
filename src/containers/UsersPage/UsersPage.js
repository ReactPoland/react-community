import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ascendingBy } from 'utils';
// LAYOUT
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { MockCard } from 'components/mocked';
// STORE
import { loadUsers } from 'redux/modules/usersModule';
// COMPONENTS
import { LoadingScreen } from 'components';

const mappedState = ({ users }) => ({
  users: users.all,
  loadingUsers: users.loadingUsers,
  usersLoaded: users.usersLoaded,
});

const mappedActions = { loadUsers };

@connect(mappedState, mappedActions)
class UsersPage extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    loadingUsers: PropTypes.bool.isRequired,
    usersLoaded: PropTypes.bool.isRequired,
    loadUsers: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.usersLoaded) this.props.loadUsers();
  }

  render() {
    return (
      <LoadingScreen loading={this.props.loadingUsers}>
        <Row>
          {
            this.props.users.sort(ascendingBy('firstName')).map((user) => {
              const date = moment(user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
              return (
                <Col key={user.id} md={12}>
                  <MockCard
                    title={`${user.firstName} ${user.lastName}`}
                    subtitle={date}
                  />
                </Col>
              );
            })
          }
        </Row>
      </LoadingScreen>
    );
  }
}

export default UsersPage;
