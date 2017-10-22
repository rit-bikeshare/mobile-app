import React from 'react';
import { Image } from 'react-native';
import { Container, Button, Text, Title, H1, Body, Content, Header } from 'native-base';
import styles from 'BikeShare/styles/login';

import bikeClipArt from 'BikeShare/img/BikeClipArt.png';

const LoginContainer = () => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>RIT Bike Share</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={styles.container}>
        <Image
          source={bikeClipArt}
          style={styles.logo}
        />
        <H1 style={styles.title}>RIT Bike Share</H1>
        <Button style={styles.button}>
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginContainer;
