import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import initialContacts from '../data/contacts';
import { AiFillContacts, AiFillBook } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export class App extends React.Component {
  state = {
    contacts: initialContacts,
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const data = localStorage.getItem(LS_KEY);

    if (data) {
      this.setState({ contacts: JSON.parse(data) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = data => {
    this.setState(({ contacts }) =>
      contacts.find(contact => contact.name.toLowerCase().trim() ===
          data.name.toLowerCase().trim() )
        ? toast.error(`The name ${data.name} is already in contacts`, notifyOptions)
        : contacts.find(contact => contact.number.trim() === data.number.trim() )
        ? toast.error(`The number ${data.number} is already in contacts`, notifyOptions)
        : { contacts: [data, ...contacts] }
        
    );
  };

  onFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      
      <Container>
        <Title>
          <AiFillBook size="36" />
          Phonebook
        </Title>
        <ContactForm onSubmit={this.addContact} />

        <Subtitle>
          <AiFillContacts size="36" />
          Contacts
        </Subtitle>
        <Filter value={filter} onFilterChange={this.onFilterChange} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
        <ToastContainer />
      </Container>
    );
  }
}
