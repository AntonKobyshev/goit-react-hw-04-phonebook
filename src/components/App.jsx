import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import { AiFillContacts, AiFillBook } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import initialContacts from 'data/contacts';
import { useLocalStorage } from 'hooks/useLocalStorage';

const notifyOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const LS_KEY = 'contacts';

export function App () {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => {
      if (
        prevContacts.find(
          contact =>
            contact.name.toLowerCase().trim() ===
            newContact.name.toLowerCase().trim()
        )
      ) {
        toast.error(
          `The name ${newContact.name} is already in contacts`,
          notifyOptions
        );
        return prevContacts;
      }
      if (
        prevContacts.find(
          contact => contact.number.trim() === newContact.number.trim()
        )
      ) {
        toast.error(
          `The number ${newContact.number} is already in contacts`,
          notifyOptions
        );
        return prevContacts;
      }
      return [newContact, ...prevContacts];
    });
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>
        <AiFillBook size="36" />
        Phonebook
      </Title>
      <ContactForm onSubmit={addContact} />

      <Subtitle>
        <AiFillContacts size="36" />
        Contacts
      </Subtitle>
      <Filter value={filter} onFilterChange={onFilterChange} />
      <ContactList deleteContact={deleteContact} contacts={filteredContacts} />
      <ToastContainer />
    </Container>
  );
};
