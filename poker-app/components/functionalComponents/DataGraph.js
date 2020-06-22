import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Card } from 'react-native-paper';
import { StackedBarChart } from 'react-native-chart-kit';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const screenWidth = Dimensions.get("window").width;

export function DataGraph(props) {

    return (
       
            <Card>
                <Card.Title title='Graph' />
                <Card.Content>
                    <StackedBarChart
                        // style={graphStyle}
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />



                </Card.Content>
            </Card>
        


    )

}

const data = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
        [60, 60, 60],
        [30, 30, 60]
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};


const graphStyle = {

}


const chartConfig = {
    backgroundGradientFrom: "#BBBE64",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#EAF0CE",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};