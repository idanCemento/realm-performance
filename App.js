import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import realm, { schemaVersion } from 'realm';
import * as realmSchemas from './schemas';




class App extends Component {
  state = {};
  realmInstance = {};

  async componentDidMount() {

    this.realmInstance.parents = await new realm({
      schema: [realmSchemas.parentSchema, realmSchemas.childSchema],
      schemaVersion: realmSchemas.parentSchema.schemaVersion,
      path: 'parents'
    });

    this.realmInstance.lightObjects = await new realm({
      schema: [realmSchemas.lightObjectSchema],
      schemaVersion: realmSchemas.lightObjectSchema.schemaVersion,
      path: 'lightObject'
    });

    await this.writeData();

  }

  async writeData() {
    let info = {};

    this.realmInstance.parents.write(() => {
      console.log("TCL: App -> writeData -> this.realmInstance.parents.write");
      let startParentsWrite = new Date();
      for (let i = 0; i < 100; i++) {
        let obj = {
          id: `parent${i}`,
          child: {
            id: `child${i}`
          }
        };
        this.realmInstance.parents.create('parent', obj);
      };

      let totalParentsWrite = new Date() - startParentsWrite;
      info.avgParentWrite = totalParentsWrite / 100;
    });


    this.realmInstance.lightObjects.write(() => {
      console.log("TCL: App -> writeData -> this.realmInstance.lightObjects.write");
      let startLightObjectsWrite = new Date();
      for (let i = 0; i < 100; i++) {
        let obj = {
          id: `lightObject${i}`,
        };
        this.realmInstance.lightObjects.create('lightObject', obj);

        let totalLightObjectsWrite = new Date() - startLightObjectsWrite;
        info.avgLightObjectWrite = totalLightObjectsWrite / 100;
      };
    });

    console.log("TCL: App -> writeData -> info", info);
    this.setState({ info });

  }


  render() {
    const { realmLoaded, info } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
          </ScrollView>
          <View style={styles.container}>
            {(!info)
              ? <Text>realm is loading...</Text>
              : <>{Object.entries(info).map(([key, val]) => <Text>{`${key} - ${val} ms`}</Text>)}</>
            }
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    padding: 15
  }
});

export default App;
