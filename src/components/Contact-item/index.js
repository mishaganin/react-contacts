import React, { useState } from 'react'

function ContactItem({ name, onDeleted, onEdited, isEditMode, onKeyDown, id }) {
    const [inputValue, setInputValue] = useState(name);

    function handleInputChange(e) {
      setInputValue(e.target.value);
    }

    let displayElement = "";

    if (!isEditMode) {
      displayElement = <span onDoubleClick={() => onEdited(id, 'HEEEEY!')}>
                          {name}
                          <button type="button"
                            className="btn btn-outline-danger btn-sm float-right"
                            onClick={onDeleted}>
                            <i className="fa fa-trash-o" />
                          </button>
                        </span>
    }
    else {
      displayElement = <input value={inputValue} onChange={handleInputChange} onKeyDown={(e) => {
                                                                                          if (e.keyCode === 13) {
                                                                                            onKeyDown({ id, inputValue });
                                                                                          }
                                                                                        }}/>
    }
    return <div>{displayElement}</div>
}

export default ContactItem;