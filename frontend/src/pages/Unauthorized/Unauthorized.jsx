import './Unauthorized.css'

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <span className='code'>403</span>
      <span className='heading'>Unauthorized</span>
      <div>
        <a href="/login">Log<span>i</span>n</a>
        <p>&nbsp; as Administrator to Continue</p>
      </div>
    </div>
  )
}

export default Unauthorized