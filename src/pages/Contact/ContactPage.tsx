import { useEffect, useState } from "react"
import { Button, Modal, StyleSheet, View } from "react-native"
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

    return <View>
        <ContactList
            contacts={contacts}
            onSelectContact={c => openModal(c)}
            onDeleteContact={() => loadContacts()}
        />

        <Button title="Add contato" onPress={() => openModal()} />

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
    }
});