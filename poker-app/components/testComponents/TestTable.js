import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell, Header, } from 'react-native-table-component';

export default class ExampleFive extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value, bttnText) => (
      <TouchableOpacity onPress={() => {this._alertIndex(value); this._logProps()}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{JSON.stringify(bttnText, null, 2)}</Text>
        </View>
      </TouchableOpacity>
    );
    
    this.state = {
      tableHead: ['Actions', 'current %', 'historical %', 'historical % / Position'],
      tableTitle: ['Call', 'Fold', 'Raise', 'rraise'],
      tableData: [
        [elementButton(this.props, "Current %"), 'a', 'b', 'c', 'd'],
        [elementButton('2', "Historical %"), '1', '2', '3', '4'],
        [elementButton('3', 'Historical % at pos'), 'a', 'b', 'c', 'd']
      ]
    }
  }

  _logProps() {
    console.log("-----------------------------------------------------------------------------------------------------------");
    console.log(this.props);
    
  }

  _alertIndex(value) {
    Alert.alert(`This is column ${value}`);
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 80}}>
            <Cell data="" style={styles.singleHead}/>
            <TableWrapper style={{flexDirection: 'row'}}>
              {/* <Col data={['H1', 'H2']} style={styles.head} heightArr={[60, 60]} textStyle={styles.text} /> */}
              <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30]} textStyle={styles.titleText}></Col>
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
            <Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>
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
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
  btn: { width: 'auto', height: 'auto' , marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});