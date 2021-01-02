import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell, Header, } from 'react-native-table-component';
import { Dialog, Portal, Button, } from 'react-native-paper';





export default class ExampleFive extends Component {
  constructor(props) {
    super(props);
    const elementButton = (visible, btnText, hide, show) => (
      <View>
        <Button onPress={show}>Show text</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hide}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <Text>{JSON.stringify(props, null, 2)}</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>
    );

    this.state = {
      tableHead: ['Actions', 'current %', 'historical %', 'historical % / Position'],
      tableTitle: ['Call', 'Fold', 'Raise', 'rraise'],
      visible: false,
      tableData: [
        [elementButton(this.visible, "Current %", this._hideDialog, this._showDialog), 'a', 'b', 'c', 'd'],
        [elementButton('2', "Historical %"), '1', '2', '3', '4'],
        [elementButton('3', 'Historical % at pos'), 'a', 'b', 'c', 'd']
      ],
      
    }
  }

  _logProps() {
    console.log("-----------------------------------------------------------------------------------------------------------");
    console.log(this.props);

  }

  _showDialog() {
    this.setState({ visible: true });
  }
  _hideDialog() {
    this.setState({ visible: false });
  }

  TestDialog = (toShow) => {

    return (
      <Portal>
        <Button onPress={_showDialog}>Show text</Button>
        <Dialog visible={this.state.visible} onDismiss={_hideDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text>{JSON.stringify(props, null, 2)}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    );
  };

  _alertIndex(value) {
    Alert.alert(`This is column ${JSON.stringify(value, null, 2)}`);
  }

  render() {
    const state = this.state; https://calendar.google.com/calendar/u/0?cid=aXJvdXNrb3ZAZ21haWwuY29t~
    return (
      <View style={styles.container}>
        {/* <TestDialog></TestDialog> */}
        <Table style={{ flexDirection: 'row' }} borderStyle={{ borderWidth: 1 }}>
          {/* Left Wrapper */}
          <TableWrapper style={{ width: 80 }}>
            <Cell data="" style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: 'row' }}>
              {/* <Col data={['H1', 'H2']} style={styles.head} heightArr={[60, 60]} textStyle={styles.text} /> */}
              <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30]} textStyle={styles.titleText}></Col>
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{ flex: 1 }}>
            <Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign: 'right' },
  text: { textAlign: 'center' },
  btn: { width: 'auto', height: 'auto', marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});