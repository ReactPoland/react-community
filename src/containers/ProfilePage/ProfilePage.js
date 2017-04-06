import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// LAYOUT
// TODO: import only necessary components in production
import { Grid } from 'react-bootstrap';
import styles from './ProfilePage.scss';
import { MockCard } from 'components/mocked';
import { Flex, FlexItem } from 'components/styled';

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
          <FlexItem flex={1}>
            <MockCard
              title
              titleText={`${user.firstName} ${user.lastName}`}
              content
            />
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem flex={2}>
            <MockCard image />
          </FlexItem>
          <FlexItem flex={3}>
            <MockCard title titleText="Map" subtitleText="" />
          </FlexItem>
        </Flex>
      </Grid>
    );
  }
}
