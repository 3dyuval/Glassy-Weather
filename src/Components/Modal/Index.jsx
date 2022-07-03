import { useSearchParams } from "react-router-dom"
import ReactDOM from "react-dom"
import components from "../Layout/Components"

function ModalContainer() {

    // Modal is active when url is ending with ?modal=something
    let [searchParams, setSearchParams] = useSearchParams()
    let modal = searchParams.get('modal')
    function handleModalClose() {
        setSearchParams('')
    }


    if (modal !== null) {
        const ModalComponent = components[modal]
        return ReactDOM.createPortal(<div>
            <div className="modal-wrapper" onClick={handleModalClose}>
            </div>
            <div className="modal-body"  >
                <div className="modal-content">
                    <ModalComponent />
                </div>
            </div>
        </div>, document.getElementById('modal-root'))
    } else {
        return null
    }
}

export default ModalContainer
