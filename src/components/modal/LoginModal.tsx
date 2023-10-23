import React, {useState} from 'react';
import Modal from 'react-modal';
import InputMask from "react-input-mask";
import {StringFormFieldState} from "src/types/interfaces";
import {useGeneratePasswordMutation, useLoginMutation} from "src/store/api/spring.api";

interface LoginModalProps {
    isOpen: boolean;
    toggle: (state: boolean) => void;
    updateAuth: () => void;
}

function LoginModal(props: LoginModalProps) {
    const [generatePassword] = useGeneratePasswordMutation();
    const [login] = useLoginMutation();

    const [error, setError] = useState<string>();
    const [email, setEmail] =
        useState<{ value: string, valid: boolean, entered: boolean }>(
            {value: "", valid: true, entered: false});
    const [password, setPassword] = useState<StringFormFieldState>({value: "", valid: true})

    const emailSubmitHandler = () => {
        const emailValid = email.value.length > 0 && /^(.+)@(.+)$/.test(email.value);
        setEmail({...email, ...{valid: emailValid}});

        if (emailValid) {
            generatePassword({email: email.value})
                .unwrap()
                .then(() => {
                    setEmail({...email, ...{entered: true}});
                })
                .catch((error) => setError(error.data.message));
        }
    }

    const passwordSubmitHandler = () => {
        const emailValid = email.value.length > 0 && /^(.+)@(.+)$/.test(email.value);
        setEmail({...email, ...{valid: emailValid}});
        const passwordValid = password.value.length > 0 && !password.value.includes("_");
        setPassword({...password, ...{valid: passwordValid}});

        if (emailValid && passwordValid) {
            login({email: email.value, password: password.value})
                .unwrap()
                .then((response) => {
                    localStorage.setItem("jwtToken", response.jwtToken);
                    props.updateAuth();
                    props.toggle(false);
                })
                .catch((error) => setError(error.data.message))
        }
    }

    // prevent scrolling
    document.body.style.overflow = props.isOpen ? "hidden" : "unset";

    return (
        <div>
            <Modal
                preventScroll={true}
                appElement={document.querySelector("body") as HTMLElement}
                isOpen={props.isOpen}
                onRequestClose={() => props.toggle(false)}
                className="loginModal"
                overlayClassName="loginModal__overlay"
            >
                <section className="loginModal__checkout checkout">
                    <h2 className="loginModal__title">Войдите в аккаунт</h2>

                    <input type="email"
                           disabled={email.entered}
                           onChange={(event) => setEmail({
                               value: event.target.value.trim(),
                               valid: true,
                               entered: false
                           })}
                           placeholder="Email"
                           className={`loginModal__input form-input ${email.valid ? "" : "validateFailed"}`}
                    />

                    {email.entered && (
                        <InputMask
                            disabled={!email.entered}
                            onChange={(event) => {
                                setPassword({
                                    value: event.target.value.trim().replaceAll(' ', ''),
                                    valid: true
                                });
                                setError(undefined);
                            }}
                            mask="9 9 9 9 9 9"
                            placeholder="Код, отправленный на email"
                            className={`loginModal__input form-input ${password.valid ? "" : "validateFailed"}`}
                        />
                    )
                    }

                    {error && (
                        <div className="loginModal__error-message">{error}</div>
                    )}

                    {!email.entered ? (
                            <button className="loginModal__button black-button"
                                    onClick={emailSubmitHandler}>
                                Отправить код на почту
                            </button>
                        ) :
                        (
                            <button className="loginModal__button black-button"
                                    onClick={passwordSubmitHandler}>
                                Войти
                            </button>
                        )}
                </section>
            </Modal>
        </div>
    );
}

export default LoginModal;