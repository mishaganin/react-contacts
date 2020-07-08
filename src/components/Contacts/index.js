import React from 'react';
import firebase from '../firebase';

import ContactItem from '../Contact-item';
import { withRouter } from 'react-router-dom';

function Contacts(props) {
  const { contacts, searchValue, onDeleted, onEdited, onKeyDown } = props;
  if(!firebase.getCurrentUsername()) {
    // not logged in
    alert('Please login first')
    props.history.replace('/login')
    return null
  }

  let i = 0;

  // const obj = {
  //   value: 
  // }
  
  const elements = contacts.map((item) => {
    if (contacts[i].name.includes(searchValue)) {
      const { id, isEditMode, ...itemProps } = item;
      i++;
      return (
        <li key={id} className="list-group-item">
          <ContactItem
            {...itemProps }
            onDeleted={() => onDeleted(id)}
            onEdited={() => onEdited(id)}
            onKeyDown={onKeyDown}
            isEditMode={isEditMode}
            id={id}/>
        </li>
      );
    }
    else {
      i++;
    }
  });

  return (
    <ul className="list-group contacts-list">
      { elements }
    </ul>
  );
};

export default withRouter(Contacts);

