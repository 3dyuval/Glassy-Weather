import React, { useState, useLayoutEffect, useEffect } from 'react'
import '../../SCSS/modal.scss'
import { useHistory } from "react-router-dom";


function Modal({ children }) {

    const [modalState, setModalState] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setModalState(true)
    }, [])


    function handleCloseModal() {
        setModalState(false)
        history.goBack()
    }

    if (!modalState) return null
    return (
        <div>
            <div className="modal-wrapper" onClick={handleCloseModal}>
            </div>
            <div className="modal-body"  >
                <div className="modal-content">
                    {children}
                </div>
            </div>

        </div>

    )
}

export default Modal