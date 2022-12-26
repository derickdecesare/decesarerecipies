import React from 'react'

export default function TypeSelect({type, setType, setChatHistory, setMessage, setResponse}) {
  console.log(type)
 

  function setTypeRefresh(e) {
    setType(e.target.value)
    setChatHistory('')
    setMessage('')
    setResponse('')
    
  }

  return (
    <div className=' flex flex-row justify-center' >
      <label htmlFor="site" className="block text-sm font-medium  text-gray-900">
        
      </label>
      <select
        id="site"
        name="site"
        className=' block sm:w-half outline outline-gray-500 w-half rounded-md focus:outline-indigo-500 py-2 pl-3 pr-10 text-base focus:border-blue-600 focus:ring-indigo-500 sm:text-sm'
        value={type}
        
        onChange={setTypeRefresh}
      >
        <option>Keto</option>
        <option>Low Carb</option>
        <option>Normal</option>
        
        
        
      </select>
    </div>
  )
}
