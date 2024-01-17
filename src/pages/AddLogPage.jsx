import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AddLogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [petName, setPetName] = useState('')

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const petResp = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`, {
          method: 'GET',
        })
        const petData = await petResp.json()
        setPetName(petData.name)
      } catch (error) {
        console.error('Error fetching pet details:', error)
      }
    }

    fetchPetDetails()
  }, [id])

  const handleAddLog = async () => {
  
    try {
      const resp = await fetch(`https://vetbee-backend.glitch.me/v1/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pet_id: id,
          status: status,
          description: description,
        }),
      })
  
      if (resp.ok) {
        navigate(`/pet-logs/${id}`)
      } else {
        const data = await resp.json()
        console.error('Failed to add log. Server response:', data)
      }
    } catch (error) {
      console.error('Error adding log:', error)
    }
  }
  
  
  return (
    <>
      <Header />
      <div className="addLogPageDiv">
        <h1 className="addLogPageH1">{petName && `${petName}`} Log</h1>
        <div className="logForm">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            value={status}
            placeholder="Huberium Celliulitus"
            onChange={(e) => setStatus(e.target.value)}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            placeholder="Removed some fat..."
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="buttonContainer">
            <motion.button
              className="addLogButton"
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handleAddLog}
            >
              Add log
            </motion.button>
            <motion.button
              className="goBackButton"
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/pet-logs/${id}`)}
            >
              Go Back
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLogPage