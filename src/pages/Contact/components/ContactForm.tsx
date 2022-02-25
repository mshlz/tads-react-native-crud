import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Input } from "../../../components/Input"
import { Contact } from "../../../models/Contact"
import { ContactService } from "../../../services/ContactService"

interface ContactFormProps {
    data?: Contact | Partial<Contact>
    onSuccess?: () => void
}

export const ContactForm = (props: ContactFormProps) => {
    const [data, setData] = useState<Partial<Contact>>(props.data || {})
    const [formErrors, setErrors] = useState({})

    const saveContact = async () => {
        // clear errors
        setErrors({})

        // validation
        const errors = {}
        if (!data.name || !data.name.trim()) {
            errors['name'] = 'Name is required'
        }
        if (!data.email || !data.email.trim()) {
            errors['email'] = 'Email is required'
        }
        if (!data.natural || !data.natural.trim()) {
            errors['natural'] = 'Natural is required'
        }

        // has errors
        if (Object.keys(errors).length) {
            setErrors(errors)
            return
        }

        // if has id is update
        if (data.id) {
            const contact = new Contact(data)
            const result = await ContactService.update(contact)
        } else {
            // is create
            const obj = new Contact(data)
            const contact = await ContactService.create(obj)
            setData(contact)
        }

        // callback
        props.onSuccess && props.onSuccess()
    }

    return <View style={styles.container}>
        <Text style={styles.title}>{data.id ? 'Edit contact' : 'Add new contact'}</Text>

        <Input
            label="Name"
            placeholder="Enter your name"
            defaultValue={data.name}
            onChangeText={val => setData({ ...data, name: val })}
            error={formErrors['name']}
        />
        <Input
            label="Email"
            textContentType="emailAddress"
            placeholder="Enter your email"
            defaultValue={data.email}
            onChangeText={val => setData({ ...data, email: val })}
            error={formErrors['email']}
        />
        <Input
            label="Natural"
            placeholder="Enter where you from"
            defaultValue={data.natural}
            onChangeText={val => setData({ ...data, natural: val })}
            error={formErrors['natural']}
        />

        <Button title="Save" onPress={saveContact} />
    </View>
}


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    title: {
        fontSize: 20,
        marginBottom: 14
    }
})
