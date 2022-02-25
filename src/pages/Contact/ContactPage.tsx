import { useEffect, useState } from "react"
import { Alert, AlertButton, Button, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { Database } from "../../db/Database"
import { Contact } from "../../models/Contact"
import { ContactService } from "../../services/ContactService"
import { ContactForm } from "./components/ContactForm"
import { ContactList } from "./components/ContactList"


export const ContactsPage: React.FC = (props) => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [contact, setContact] = useState<Contact>(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        loadContacts()
    }, [])

    const loadContacts = async () => {
        setContacts(await ContactService.findAll())
    }

    const openModal = (data?: Contact) => {
        setContact(data)
        setModalVisible(true)
    }

    const resetDatabase = () => {
        const btns: AlertButton[] = [
            {
                text: 'Yes',
                onPress: () => {
                    Database.initDb(true).then(() => loadContacts())
                }
            },
            { text: 'Cancel' }
        ]

        Alert.alert('Recreate database?', undefined, btns)
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Contact App</Text>

        <ContactList
            contacts={contacts}
            onSelectContact={c => openModal(c)}
            onDeleteContact={() => loadContacts()}
        />

        <Button title="Add contato" onPress={() => openModal()} />

        <Pressable 
            style={styles.resetDbBtn}
            onPress={() => resetDatabase()}
        >
            <Text>Reset database</Text>
        </Pressable>

        <Modal
            animationType="slide"
            transparent={!false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={[styles.modalBackground, { backgroundColor: '#00000050' }]} >
                <View style={styles.modalView}>
                    <ContactForm
                        data={contact}
                        onSuccess={() => {
                            setModalVisible(false)
                            loadContacts()
                        }}
                    />
                </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 26,
        marginBottom: 16
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    resetDbBtn: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 2,
        marginTop: 25
    }
});