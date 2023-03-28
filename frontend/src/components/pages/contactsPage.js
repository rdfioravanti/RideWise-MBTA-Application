import React, { useState } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Information & Support', phone: ' 617-222-3200' },
    { id: 2, name: 'Emergency Contacts:  Transit Police', phone: ' 617-222-1212' },
    { id: 3, name: 'Report a railroad crossing gate issue', phone: ' 800-522-8236' },
  ]);

  return (
    <div>
      <h1>Contact List</h1>
      <table>
        <thead>
          <tr>
            
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;