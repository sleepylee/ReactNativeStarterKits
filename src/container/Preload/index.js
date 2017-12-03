import React from 'react';
import { View, Text } from 'native-base';
import * as Progress from 'react-native-progress';
import styles from './styles';

const Preload = () => (
  <View style={styles.container}>
    <Progress.CircleSnail color={['red', 'green', 'blue']} />
    <Text style={{ color: '#fff' }}>Loading...</Text>
  </View>
);
export default Preload;
