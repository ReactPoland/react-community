import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import { MockCard } from 'components/mocked';
import { Flex, Div } from 'components/styled';
import styles from './ProfilePage.scss';

const mappedState = () => ({
  user: {
    id: 123,
    pictureURL: 'https://placebear.com/80/80',
    firstName: 'Peter',
    lastName: 'Johnson'
  }
});

const mappedActions = {};

@connect(mappedState, mappedActions)
export default class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <Grid className={styles.ProfilePage}>
        <Helmet title="Profile" />
        <Flex>
          <Div flexVal={1}>
            <MockCard
              title
              title={`${user.firstName} ${user.lastName}`}
              content
            />
          </Div>
        </Flex>
        <Flex>
          <Div flexVal={2}>
            <MockCard image />
          </Div>
          <Div flexVal={3}>
            <MockCard title title="Map" subtitle="" />
          </Div>
        </Flex>
      </Grid>
    );
  }
}
