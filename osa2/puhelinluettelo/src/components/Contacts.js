import personService from '../services/persons'
import SingleContact from './SingleContact'

const Contacts = ({ contacts, filter, setContacts }) => {

    const deleteContact = (id) => {
        const contactToDelete = contacts.find(n => n.id === id)
        if (window.confirm(`Delete ${contactToDelete.name}?`)) {
            personService
                .deleteData(id)
                .then(() => {
                    setContacts(contacts.filter(n => n.id !== id))
                })
        }
    }

    return (
        <ul>
            {contacts.filter(f => f.name.toLowerCase().includes(filter.toLowerCase())
                || filter === '')
                .map(contact =>
                    <SingleContact key={contact.id} contact={contact}  deleteContact={deleteContact} />
                )}    
                        
        </ul>
    );
}

export default Contacts

