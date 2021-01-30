import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Image, Modal, ScrollView } from 'react-native';
import colors from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';


export function ProfileOverview() {
    const [modalOpen, setModalOpen] = useState(false);
    
    return (
        <SafeAreaView style={styles.container}>

            <Modal visible={modalOpen} transparent={true} animationType='slide'>
                <View style={styles.modal}>
                    <Pressable onPress={() => { console.log('close button clicked'); setModalOpen(false); }} style={styles.closeIcon}>
                        <Ionicons size={33} name="close-outline" color={'#000'} />
                    </Pressable>
                    <View style={styles.content}>
                        <Text style={styles.modalHeader}>Impressum</Text>
                        <ScrollView>
                            <Text style={styles.modalText}>Junggesellenschützen – Verein Hünxe 1422 e.V.{"\n"}Registergericht: Amtsgericht Duisburg{"\n"}Registernummer: VR 30798{"\n"}Steuernummer: 101/5762/0519{"\n"}{"\n"}Als Vorsitzender des Vorstandes vertretungsberechtigt und inhaltlich Verantwortlicher i.S.d. § 5 TMG i.V.m. § 55 RStV:{"\n"}{"\n"}Christoph Plikat{"\n"}Kolkstege 15{"\n"}46569 Hünxe{"\n"}Telefon: +49 1578 4646003{"\n"}E-Mail: info@jsv-huenxe.de{"\n"}{"\n"}Weitere vertretungsberechtigte Vorstandsmitglieder:{"\n"}{"\n"}Tim Neyenhuys, Kassierer{"\n"}E-Mail: info@jsv-huenxe.de{"\n"}{"\n"}Maximilian Philipp Ideler, Schriftführer{"\n"}E-Mail: info@jsv-huenxe.de{"\n"}{"\n"}Technische Ansprechpartner:{"\n"}app@jsv-huenxe.de{"\n"}Noah Janzen{"\n"}Philipp Student</Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <View style={styles.features}>

                <View>
                    <Image  source={require('../assets/images/jsvAppLogo.png')}
                            style={[styles.jsvAppLogo, styles.mb12]} />
                    <Text style={[styles.header, styles.alignCenter, styles.mb24]}>JSV ID</Text>
                    <View style={[styles.featureList]}>
                        <View style={[styles.featureListItem]}>
                            <Image style={styles.featureListItemCheckMark} source={require('../assets/images/tick.png')} />
                            <Text style={[styles.featureListItemText]}>Zu-/Absage zu Events</Text>
                        </View>
                        <View style={[styles.featureListItem]}>
                            <Image style={styles.featureListItemCheckMark} source={require('../assets/images/tick.png')} />
                            <Text style={[styles.featureListItemText]}>Anonymer Chat</Text>
                        </View>
                        <View style={[styles.featureListItem]}>
                            <Image style={styles.featureListItemCheckMark} source={require('../assets/images/tick.png')} />
                            <Text style={[styles.featureListItemText]}>Besser vernetzt</Text>
                        </View>
                    </View>
                </View>

                
            </View>

            <View style={styles.loginMask}>
                <Text style={[styles.header, styles.mb24]}>Login</Text>

                <TextInput
                    style={[styles.input, styles.mb12]}
                    placeholder={'E-Mail'}
                    placeholderTextColor={'#777777'} />

                <TextInput
                    style={[styles.input, styles.mb12]}
                    placeholder={'Passwort'}
                    placeholderTextColor={'#777777'} />

                <Pressable style={[styles.loginButton, styles.mb12]}>
                    <Text style={[styles.loginButtonText, styles.alignCenter, styles.fwBold]}>
                        Login
                    </Text>
                </Pressable>

                <View style={[styles.footerBar]}>
                    <Text style={styles.captionLink}>Passwort vergessen</Text>
                    <Pressable onPress={() => setModalOpen(true)}>
                        <Text style={styles.captionLink}>Impressum</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    features: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginMask: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22
    },
    header: {
        fontSize: 22
    },
    alignCenter: {
        textAlign: 'center'
    },
    mb12: {
        marginBottom: 12
    },
    mb24: {
        marginBottom: 24
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#AFAFAF',
        padding: 11,
        fontSize: 16
    },
    loginButton: {
        width: '100%',
        padding: 11,
        backgroundColor: colors.jsvMainGreen
    },
    loginButtonText: {
        fontSize: 16,
        color: '#fff'
    },
    fwBold: {
        fontWeight: 'bold'
    },
    footerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 2
    },
    captionLink: {
        color: '#B2B2B2',
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    jsvAppLogo: {
        alignSelf: 'center'
    },
    featureList: {
    },
    featureListItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    featureListItemText: {
        color: '#5D5D5D'
    },
    featureListItemCheckMark: {
        marginRight: 6
    },
    center: {
    },
    modal: {
        flex: 1,
        width: '85%',
        maxHeight: '70%',
        left: '7.5%',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    closeIcon: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 99999
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    },
    modalHeader: {
        fontSize: 22,
        marginBottom: 16,
        marginTop: 24,
        marginLeft: 16,
        marginRight: 16
    },
    modalText: {
        fontSize: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 0
    }
});