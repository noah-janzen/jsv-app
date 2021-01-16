import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AttendanceLabelItem } from './attendanceLabelItem';

export function AttendanceLabel({attendance_responses}) {
    let numberOfYes = attendance_responses.yes;
    let numberOfNo = attendance_responses.no;
    let numberOfNotSure = attendance_responses.not_sure;


    return (
        <View style={styles.attendanceLabel}>
            <AttendanceLabelItem
                numberOfResponses={numberOfYes}
                attendanceSymbol={'checkmark'} 
                attendanceColor={'#27AE60'} />
            <AttendanceLabelItem
                numberOfResponses={numberOfNo}
                attendanceSymbol={'close'} 
                attendanceColor={'#C0392B'} />
            <AttendanceLabelItem
                numberOfResponses={numberOfNotSure}
                attendanceSymbol={'help'} 
                attendanceColor={'#F39C12'} />
        </View>
    );
}

const styles = StyleSheet.create({
    attendanceLabel: {
        flexDirection: 'row',
    }
});