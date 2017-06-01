import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

class LocationInput extends Component {
  static propTypes = {
    floatingLabelText: PropTypes.string.isRequired,
    onChooseLocation: PropTypes.func.isRequired,
    errorText: PropTypes.string,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    location: PropTypes.object
  }

  state = {
    predictions: [] // Predicted locations
  };

  componentDidMount() {
    // Initializes Google Maps code
    const { google } = window;
    this.places = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
  }

  // Gets localtion predictions based on input text
  getPredictions = (searchText) => {
    this.places.getQueryPredictions({ input: searchText }, predictions => {
      this.setState({ predictions: predictions || [] });
    });
  }

  // Updated input field and gets prediction if input is not empty
  handleUpdateInput = (searchText) => {
    if (searchText) this.getPredictions(searchText);
    this.setState({
      // Clear predictions if there's no input text
      predictions: searchText ? this.state.predictions : []
    });
  };

  // Passes chosen location to the parent component
  handleNewRequest = (location) => {
    this.geocoder.geocode({ placeId: location.place_id }, results => {
      this.props.onChooseLocation({ ...location, ...results[0] });
      this.setState({ predictions: [] });
    });
  };

  render() {
    const { floatingLabelText, errorText, fullWidth, location, disabled } = this.props;
    const { predictions } = this.state;

    return (
      <AutoComplete
        disabled={disabled}
        floatingLabelText={floatingLabelText}
        errorText={errorText}
        searchText={location && (location.description || location.formatted_address) || ''}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        dataSource={predictions}
        dataSourceConfig={{ text: 'description', value: 'description' }}
        filter={AutoComplete.noFilter}
        fullWidth={fullWidth}
      />
    );
  }
}

export default LocationInput;
