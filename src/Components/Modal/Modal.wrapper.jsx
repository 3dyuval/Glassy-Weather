import ReactDOM from "react-dom"
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


function Modal({ children }) {

    const [modalState, setModalState] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setModalState(true)
    }, [])

    function handleCloseModal() {
        setModalState(false)
        navigate(-1)
    }

    const modal = (
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

    if (!modalState) return null
    return ReactDOM.createPortal(modal, document.body)

}

export default Modal