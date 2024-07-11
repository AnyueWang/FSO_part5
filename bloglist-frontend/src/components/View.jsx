import PropTypes from 'prop-types'
import React from 'react'

const View = React.forwardRef((props, ref) => {
  return (
    <button style={{ marginLeft: 10 }} onClick={props.toggleVisibility}>{props.buttonTag}</button>
  )
})

View.propTypes = {
  buttonTag: PropTypes.string.isRequired
}

export default View