import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const AddPetPage = () => {
  const [petName, setPetName] = useState('')
  const [petBirthday, setPetBirthday] = useState('')
  const [petEmail, setPetEmail] = useState('')
  const navigate = useNavigate()

  const isFormValid = () => {

    if (!petName || !petBirthday || !petEmail) {
      alert("Please fill in all fields");
      return false;
    }

    const currentDate = new Date ()
    const selectedDate = new Date(petBirthday)
    if (selectedDate > currentDate) {
      alert("Please select a valid date")
      return false
    }

    if (petEmail.indexOf('@') === -1) {
      console.error("Please enter a valid email address");
      return false;
    }

    return true
  }

  const handleAddPet = async () => {
    try {

      if(!isFormValid()) {
        return
      }

      const dobTimestamp = new Date(petBirthday).getTime()

      const resp = await fetch("https://vetbee-backend.glitch.me/v1/pets", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: petName,
          dob: dobTimestamp,
          client_email: petEmail,
        }),
      })

      const data = await resp.json()

      if(resp.ok) {
        console.log('Pet added successfully')
        navigate('/')
      } else {
        console.error('Failed to add pet', data)
      }
    } catch (error) {
      console.error('Error adding pet:', error)
    }
  }

  return (
    <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Header/>
    <div className="addPetPageDiv">
      <h1 className="addPetPageH1">Add Your Pet</h1>
      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="form">
        <label htmlFor="petName">PetName:</label>
        <input
         type="text"
         id="petName"
         value={petName}
         placeholder="Lockis"
         onChange={(e) => setPetName(e.target.value)}
         />

          <label htmlFor="petBirthday">Pet Birthday:</label>
          <input
            type="date"
            id="petBirthday"
            value={petBirthday}
            onChange={(e) => setPetBirthday(e.target.value)}
          />

          <label htmlFor="petEmail">Pet Email:</label>
          <input
            type="email"
            id="petEmail"
            value={petEmail}
            placeholder="lockis@gmail.com"
            onChange={(e) => setPetEmail(e.target.value)}
          />

          <motion.button 
          className="addPetButton" 
          type="button" 
          whileTap={{ scale: 0.9 }}
          onClick={handleAddPet}>Add Pet</motion.button>
      </motion.form>
    </div>
    </motion.div>
    </>
  )
}

export default AddPetPage