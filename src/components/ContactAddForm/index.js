import React, { useState } from 'react';

function ContactAddForm(props) {
  const [name, setName] = useState('');

  function onNameChange(e) {;
    setName(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    props.onContactAdded(name);
    setName('');
  };

  return (
    <form className="contact-add-form d-flex"
          onSubmit={onSubmit}>

      <input type="text"
              className="form-control"
              onChange={onNameChange}
              placeholder="Add contact"
              value={name} />
      <button
        className="btn btn-outline-success">
        Add Contact
      </button>
    </form>
  );
}

export default ContactAddForm;