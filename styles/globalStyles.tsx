import React from 'react';
import colors from './colors';

const globalStyles = {
    screenHeader: {
        fontSize: 30,
        marginLeft: 4
    },
    item: {
        borderRadius: 10,
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 4,
        elevation: 5
    },
    firstItem: {
        marginTop: 20
    },
    notFirstItem: {

    },
    date: {
        fontSize: 12,
        marginTop: 4,
        marginBottom: 0,
        color: '#898989'
    },
    chatBubble: {
        backgroundColor: colors.jsvChatBubbleBackground,
        borderRadius: 5,
        marginTop: 16,
        marginLeft: 32,
        marginRight: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
        zIndex: 100
    },
    chatBubbleText: {
        fontSize: 14
    },
    triangleTransformed: {
        width: 10,
        height: 10,
        backgroundColor: '#fff',
        transform: [{ rotate: '45deg'}],
        position: 'absolute',
        right: -5,
        top: 10
    }
}

export default globalStyles;