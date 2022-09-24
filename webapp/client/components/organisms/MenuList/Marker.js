// import React from 'react'
// import './Marker.scss'

// const Marker = (props) => {
//   const { color, name, id } = props
//   return (
//     <div
//       className='marker'
//       style={{ backgroundColor: color, cursor: 'pointer' }}
//       title={name}
//     >
//       <img src='https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png' />
//     </div>
//   )
// }

// export default Marker

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Pin = styled.div`
  position: absolute;
  top: -20px;
  width: 25px;
  height: 25px;
  padding: 0px 3px 3px 0;
  border-radius: 50% 50% 50% 0%;
  box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.5);
  background: red;
  transform: translate(-50%, -50%) rotateX(20deg) rotateZ(-45deg);
  transform-origin: 50% 50%;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

  & > span {
    display: none;
    position: absolute;
    left: 6px;
    top: 2px;
    transform: rotate(45deg);
    font-size: 16px;
  }
`

const Marker = ({ text, onClick }) => <Pin alt={text} onClick={onClick} />

Marker.defaultProps = {
  onClick: null,
}

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}

export default Marker
