import { useState } from 'react'

const AddLogForm = ({ id, onAddLog }) => {
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')

  const handleAddLog = async () => {
    try {
      const resp = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`, {
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
        onAddLog()
      } else {
        const data = await resp.json()
        console.error('Failed to add log. Server response:', data)
      }
    } catch (error) {
      console.error('Error adding log:', error)
    }
  }

  return (
    <div className="addLogForm">
      <label htmlFor="status">Status</label>
      <input
        type="text"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="button" onClick={handleAddLog}>
        Add Log
      </button>
    </div>
  )
}

export default AddLogForm
