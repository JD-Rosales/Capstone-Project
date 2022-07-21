import './DeleteModal.css'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

const DeleteModal = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (e) => {

    setIsLoading(true)
    await axios.delete(props.API_URL,{
      headers: { Authorization: `Bearer ${props.token}` }
    }).then((res) => {
      setIsLoading(false)
      props.fetch()
      handleParenChange(e)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    });
  }

  const handleParenChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <div className='delete-modal'>
      <div className='content'>
        <button onClick={handleParenChange}>X</button>

        <div>
          <h2>Delete</h2>
          <span>Are you sure you want to remove this?</span>

          <div>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleParenChange}>No</button>
          </div>
        </div>
      </div>

      {isLoading ? <Spinner />:""}
    </div>
  )
}

export default DeleteModal