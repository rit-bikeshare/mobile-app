import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Modal } from 'react-native';
import { Button, Text, Item, Input, Form, H1, View } from 'native-base';

import PickerWithPlaceholder from 'BikeShare/lib/components/PickerWithPlaceholder';

import styles from './ManualInputModalStyles';

export default class ManualInputModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    headerText: PropTypes.string,
    values: PropTypes.instanceOf(Map),
  };

  constructor(props) {
    super(props);

    this.state = {
      inputValue: null,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(text) {
    this.setState({
      inputValue: text,
    });
  }

  handleSubmit() {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;
    onSubmit(inputValue);
  }

  renderItem(text, value) {
    return <Item key={value} label={text} value={value} />;
  }

  renderPicker() {
    const { placeholder, values } = this.props;
    const { inputValue } = this.state;

    const items = values
      .map((name, value) => {
        return this.renderItem(name, value);
      })
      .toList()
      .toJS();

    return (
      <PickerWithPlaceholder
        placeholder={placeholder}
        mode="dropdown"
        selectedValue={inputValue}
        onValueChange={this.handleTextChange}
      >
        {items}
      </PickerWithPlaceholder>
    );
  }

  renderInput() {
    const { inputValue } = this.state;
    const { placeholder, values } = this.props;

    if (Map.isMap(values)) {
      return this.renderPicker();
    }

    return (
      <Item regular={true}>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChangeText={this.handleTextChange}
          onSubmitEditing={this.handleSubmit}
        />
      </Item>
    );
  }

  render() {
    const { open, onClose, text, buttonText, headerText } = this.props;

    return (
      <Modal visible={open} animationType={'slide'} onRequestClose={onClose}>
        <View style={styles.container}>
          <H1>{headerText}</H1>
          <Text>{text}</Text>
          <Form style={styles.input}>{this.renderInput()}</Form>
          <Button style={styles.button} onPress={this.handleSubmit} full={true}>
            <Text>{buttonText}</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
