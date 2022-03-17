import React, { useState, useEffect } from 'react'
import '../../SCSS/modal.scss'
import { useNavigate } from "react-router-dom";


function Modal({ children }) {

    const [modalState, setModalState] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setModalState(true)
    }, [])


    function handleCloseModal() {
        setModalState(false)
        navigate(-1)
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