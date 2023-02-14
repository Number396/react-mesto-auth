import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name-input"
                id="name"
                placeholder="Имя"
                className="popup__input popup__input_type_name"
                required
                minLength="2"
                maxLength="40"
                onChange={handleNameChange}
                value={name || ''}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                type="text"
                name="occupation-input"
                id="about"
                placeholder="Профессия"
                className="popup__input popup__input_type_occupation"
                required
                minLength="2"
                maxLength="200"
                onChange={handleDescriptionChange}
                value={description || ''}
            />
            <span className="popup__input-error occupation-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;