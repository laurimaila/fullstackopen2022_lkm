import personService from '../services/persons'

const DeleteContact = ({ id, contacts, setContacts }) => {
    const contactToDelete = contacts.find(n => n.id === id)
    if (window.confirm(`Delete ${contactToDelete.name}?`)) {
        personService
            .deleteData(id)
            .then(() => {
                setContacts(contacts.filter(n => n.id !== id))
            })
    }
}

export default DeleteContact