import React from 'react';

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left
} from 'native-base';

import styles from 'BikeShare/styles/sidebar';


const data = [
  {
    name: 'Anatomy',
    icon: 'phone-portrait',
  },
  {
    name: 'Actionsheet',
    icon: 'easel'
  },
];

export default class Sidebar extends React.Component {
  renderListItem({ icon, name }) {
    return (
      <ListItem
        key={name}
        button={true}
        noBorder={true}
      >
        <Left>
          <Icon active={true} name={icon} style={{ color: '#777', fontSize: 26, width: 30 }} />
          <Text style={styles.text}>
            {name}
          </Text>
        </Left>
      </ListItem>
    );
  }

  renderListItems() {
    return data.map(item => this.renderListItem(item));
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
          {/* <Image style={styles.drawerCover} /> */}
          <List>
            {this.renderListItems()}
          </List>
        </Content>
      </Container>
    );
  }
}
