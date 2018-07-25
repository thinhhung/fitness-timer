import React from 'react';
import { Text } from 'react-native';
import appConfig from 'config/app';
import styles from './styles';

const Header = ({headerText}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {headerText}
      </Text>
    </View>
  );
}

export default Header;
