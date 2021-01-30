import React from 'react';
import { View, Text } from 'react-native';
import { getTimeString } from '../globalObjects/dateAndTimeFunctions';
import globalStyles from '../styles/globalStyles';

export function ChatBubble({ text, date, isFirstElement, isLastElement }) {
    return (
        <View style={[globalStyles.chatBubble, isFirstElement ? { marginTop: 16 } : {}, isLastElement ? { marginBottom: 16 } : {} ]}>
            <Text style={globalStyles.chatBubbleText}>{text}</Text>
            <Text style={globalStyles.date}>{getTimeString(new Date(date))}</Text>
            <View style={globalStyles.triangleTransformed} />
        </View>
    );
}