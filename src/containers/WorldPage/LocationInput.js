import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class LocationInput extends Component {
  static propTypes = {
    floatingLabelText: PropTypes.string.isRequired,
    onChooseLocation: PropTypes.func.isRequired
  }

  state = { searchText: '', predictions: [] };

  componentDidMount() {
    const { google } = window;
    this.places = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
  }

  getPredictions = searchText => {
    this.places.getQueryPredictions({ input: searchText }, predictions => {
      this.setState({ predictions: predictions || [] });
    });
  }

  handleUpdateInput = searchText => {
    if (searchText) this.getPredictions(searchText);
    this.setState({
      searchText,
      predictions: searchText ? this.state.predictions : []
    });
  };

  handleNewRequest = location => {
    this.geocoder.geocode({ placeId: location.place_id }, results => {
      this.props.onChooseLocation({ ...location, ...results[0] });
      this.setState({ predictions: [] });
    });
  };

  render() {
    const { floatingLabelText } = this.props;
    const { searchText, predictions } = this.state;

    return (
      <AutoComplete
        floatingLabelText={floatingLabelText}
        searchText={searchText}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        dataSource={predictions}
        dataSourceConfig={{ text: 'description', value: 'description' }}
        filter={AutoComplete.noFilter}
      />
    );
  }
}

export default LocationInput;
