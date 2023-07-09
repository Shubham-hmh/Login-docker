import React from 'react'

const CustomInput = (props) => {
  const { type, name, placeholder, value, classname, onChange, onBlur } = props;
  return (
    <div>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} className={`form-control ${classname}`} />
    </div>
  )
}

export default CustomInput