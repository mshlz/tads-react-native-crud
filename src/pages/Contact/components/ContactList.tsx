import { Alert, AlertButton, Pressable, StyleSheet, Text, View } from "react-native"
import { Contact } from "../../../models/Contact"
import { ContactService } from "../../../services/ContactService"

interface ContactListProps {
    contacts: Contact[]
    onSelectContact?: (contact: Contact) => void
    onDeleteContact?: () => void
}

export const ContactList = (props: ContactListProps) => {

    const deleteContact = (contact: Contact) => {
        const cancelBtn: AlertButton = { text: 'Cancel' }
        const deleteBtn: AlertButton = {
            text: 'Delete',
            onPress: () => {
                ContactService.delete(contact).then(() => {
                    props.onDeleteContact && props.onDeleteContact()
                })
            }
        }

        Alert.alert(`Delete contact "${contact.name}"`, 'This cannot be reversed!', [deleteBtn, cancelBtn])
    }

    const renderContact = (contact: Contact) => {
        return <View key={contact.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, styles.listItem]}
                onLongPress={() => deleteContact(contact)}
                onPress={() => props.onSelectContact && props.onSelectContact(contact)}
            >
                <Text>{contact.id} - {contact.name} - {contact.email} - {contact.natural}</Text>
            </Pressable>
        </View>
    }

    return <View style={styles.container}>
        {props.contacts.map(renderContact)}
    </View>
}

const styles = StyleSheet.create({
    container: {},
    listItem: {
        padding: 10
    }
})