import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        if (isOpen) {
            // setName('');
            setValues('');
            // setLink('');
        }

    }, [isOpen])
    // debugger

    function handleNameChange(e) {
        // setName(e.target.value);
        handleChange(e);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values);
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
                name="placeinput"
                id="placeInput"
                placeholder="Наименование места"
                className="popup__input popup__input_type_place"
                required
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={values.placeinput || ''}

            />
            <span className="popup__input-error place-input-error"></span>
            <input
                type="url"
                name="linkinput"
                id="linkInput"
                placeholder="Введите ссылку"
                className="popup__input popup__input_type_link"
                required
                onChange={handleChange}
                value={values.linkinput || ''}
            />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;