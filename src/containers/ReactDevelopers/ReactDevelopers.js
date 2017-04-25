import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadStates, loadCities, loadDevs } from 'redux/modules/reactDevelopersModule';
import pick from 'lodash/pick';
import { LoadingScreen, RefreshButton } from 'components';

const mapStateToProps = ({ reactDevelopers }) => ({ ...reactDevelopers });
const mapDispatchToProps = { loadStates, loadCities, loadDevs };

class States extends Component {
  componentWillMount() {
    if (!this.props.statesLoaded) this.props.loadStates();
  }
  render() {
    const { statesLoading, states, statesLoadingError } = this.props;
    if (statesLoadingError) {
      return (
        <RefreshButton
          label="Reload states list"
          onClick={this.props.loadStates} />
      );
    }
    return (
      <LoadingScreen loading={statesLoading}>
        <div>
          {
            states.map(({ name, stateCode }) => (
              <div key={stateCode}><Link to={`/react-developers-${stateCode}`}>{name}</Link></div>
            ))
          }
        </div>
      </LoadingScreen>
    );
  }
}

States.propTypes = {
  loadStates: PropTypes.func,
  states: PropTypes.array,
  statesLoading: PropTypes.bool,
  statesLoaded: PropTypes.bool,
  statesLoadingError: PropTypes.bool
};

class Cities extends Component {
  componentWillMount() {
    if (!this.props.citiesLoaded) this.props.loadCities(this.props.params.slug);
  }
  render() {
    const styles = require('./ReactDevelopers.scss');
    const { cities, citiesLoading } = this.props;
    return citiesLoading
    ? <span>loading...</span>
    : (
      <div className={styles.cities}>
        {
          cities.map(({ name, stateCode, id }) => (
            <div key={id} className={styles.city}>
              <Link to={`/react-developers-${stateCode}-${name.replace(' ', '_').toLowerCase()}`}>{name}</Link>
            </div>
          ))
        }
      </div>
    );
  }
}

Cities.propTypes = {
  loadCities: PropTypes.func,
  cities: PropTypes.array,
  citiesLoading: PropTypes.bool,
  citiesLoaded: PropTypes.bool,
  params: PropTypes.object
};

class Devs extends Component {
  componentWillMount() {
    this.props.loadDevs(this.props.params.slug);
  }
  render() {
    const { devs, devsLoading } = this.props;
    return devsLoading
    ? <span>loading...</span>
    : (
      <div>
        {
          devs.map(({ name, link, description, id }) => (
            <div key={id}>
              <a href={link}>{name}</a>
              <p>{description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Devs.propTypes = {
  loadDevs: PropTypes.func,
  devs: PropTypes.array,
  devsLoading: PropTypes.bool,
  devsLoaded: PropTypes.bool,
  params: PropTypes.object
};

@connect(mapStateToProps, mapDispatchToProps)
class ReactDevelopers extends Component {
  render() {
    const { params: { slug = '' } } = this.props;
    const statesProps = pick(this.props, ['states', 'statesLoading', 'statesLoaded', 'loadStates']);
    const citiesProps = pick(this.props, ['cities', 'citiesLoading', 'citiesLoaded', 'loadCities', 'params']);
    const devsProps = pick(this.props, ['devs', 'devsLoading', 'devsLoaded', 'loadDevs', 'params']);
    switch (true) {
      case slug.length === 0:
        return <States {...statesProps} />;
      case slug.length === 2:
        return <Cities {...citiesProps} />;
      case slug.length > 2:
        return <Devs {...devsProps} />;
      default:
        return null;
    }
  }
}

ReactDevelopers.propTypes = {
  params: PropTypes.object
};

export default ReactDevelopers;
