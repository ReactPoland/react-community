import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadStates, loadCities, loadDevs } from 'redux/modules/reactDevelopersModule';
import pick from 'lodash/pick';
import { LoadingScreen, RefreshButton, Map } from 'components';
import Paper from 'material-ui/Paper';
import { CardHeader, CardText, Card } from 'material-ui/Card';
import { threeColumns, flexCenter } from './ReactDevelopers.scss';

const mapStateToProps = ({ reactDevelopers }) => ({ ...reactDevelopers });
const mapDispatchToProps = { loadStates, loadCities, loadDevs };

class States extends Component {
  componentWillMount() {
    if (!this.props.statesLoaded) this.props.loadStates('Cieszyn');
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
        <Paper style={{ margin: '5rem 10rem' }}>
          <div className={threeColumns}>
            {
              states.map(({ name, stateCode }) => (
                <div key={stateCode} className={flexCenter}>
                  <Link to={`/react-developers-${stateCode}`}>{name}</Link>
                </div>
              ))
            }
          </div>
        </Paper>
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
    const { cities, citiesLoading } = this.props;
    return citiesLoading
    ? <span>loading...</span>
    : (
      <Paper style={{ margin: '5rem 10rem' }}>
        <div className={threeColumns}>
          {
            cities.map(({ name, id, slug }) => (
                <div key={id} className={flexCenter}>
                  <Link to={`/react-developers-${slug}`}>{name}</Link>
                </div>
            ))
          }
        </div>
      </Paper>

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
      <Paper style={{ margin: '5rem 10rem' }}>
        <Map
          type="users"
          markers={devs}
          style={{ height: '50vh' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {
            devs.map(({ name, link, description, id }) => (
              <Card key={id} style={{ margin: '50px 5vw 0' }}>
                <CardHeader
                  title={name}
                  subtitle={<a href={link}>{link}</a>} />
                <CardText>
                  <p>{description}</p>
                </CardText>
              </Card>
            ))
          }
        </div>
      </Paper>
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
