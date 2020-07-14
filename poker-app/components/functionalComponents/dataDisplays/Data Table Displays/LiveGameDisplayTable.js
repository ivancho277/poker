import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore.js';
import { Text, Card, Paragraph, Divider, DataTable, Surface, Title, ActivityIndicator, Colors, Subheading } from 'react-native-paper'


export function LiveGameDisplayTable(props) {

    



    return (
        <GameSubscriber>
            {(state, actions) => (
                <View>
                    <Surface style={{ elevation: 10 }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Actions</DataTable.Title>
                                <DataTable.Title>% used</DataTable.Title>
                                <DataTable.Title>% used (from games w/ same tags) </DataTable.Title>
                                <DataTable.Title>% By Position</DataTable.Title>
                                <DataTable.Title>% By Position (w/ same tags)</DataTable.Title>


                            </DataTable.Header>
                        </DataTable>
                    </Surface>
                </View>
            )
            }
        </GameSubscriber>
    )

}