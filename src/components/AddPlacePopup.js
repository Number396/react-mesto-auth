import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }

    }, [isOpen])


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add"
            btnText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="place-input"
                id="placeInput"
                placeholder="Наименование места"
                className="popup__input popup__input_type_place"
                required
                minLength="2"
                maxLength="30"
                onChange={handleNameChange}
                value={name || ''}

            />
            <span className="popup__input-error place-input-error"></span>
            <input
                type="url"
                name="link-input"
                id="linkInput"
                placeholder="Введите ссылку"
                className="popup__input popup__input_type_link"
                required
                onChange={handleLinkChange}
                value={link || ''}
            />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;