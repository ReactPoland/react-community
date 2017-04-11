import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import config from '../../config';
// STORE
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
// COMPONENTS
import { MainNavbar, MainFooter, DialogsContainer } from 'containers';
import { SuccessHandler, ErrorHandler, LoadingScreen } from 'components';
import styles from './App.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    // Get user's data
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({ user: state.auth.user }),
  { logout, loadAuth })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired,
    routes: PropTypes.array
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = { showPage: false }

  componentDidMount() {
    // TODO: change that to a proper solution for SSR errors in the console
    if (__CLIENT__) {
      setTimeout(() => this.setState({ showPage: true }), 300);
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  renderFooter = () => {
    const noFooter = this.props.routes && this.props.routes.find(route => route.noFooter);

    if (noFooter) return null;

    return <MainFooter />;
  }

  render() {
    return (
      <LoadingScreen loading={!this.state.showPage}>
        <div className={styles.appContainer}>
          <Helmet {...config.app.head}/>
          <MainNavbar user={this.props.user} config={config} />
          <div className={styles.appContent}>
            {this.props.children}
          </div>
          {this.renderFooter()}
          <SuccessHandler />
          <ErrorHandler />
          <DialogsContainer />
        </div>
      </LoadingScreen>
    );
  }
}
