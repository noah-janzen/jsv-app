import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsFeed from './components/newsFeed';

export default function App() {
  return (
    <View style={{ backgroundColor: "#129467", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NewsFeed />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, //Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

