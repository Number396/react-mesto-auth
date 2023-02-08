import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const inputRef = useRef('');
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: inputRef.current.value, inputRef });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            btnText="Сохранить"
            // flsClass="popup__set"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="link-input"
                id="linkInputAvatar"
                placeholder="Введите ссылку"
                className="popup__input popup__input_type_link"
                required
                ref={inputRef}
            />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;