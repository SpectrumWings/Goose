import React from 'react'

const CancelButton = (props) => {
    return (
        <div>
            <button
                className='button_cancel'
                onClick={props.cancel}
            />
        </div>
    )
}

export default CancelButton
