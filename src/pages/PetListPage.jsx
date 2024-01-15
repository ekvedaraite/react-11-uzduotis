import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const PetListPage = () => {
    const [pets, setPets] = useState([])

    const fetchPets = async () => {
      try {
        const resp = await fetch("https://vetbee-backend.glitch.me/v1/pets", {
          method: 'GET',
      })
      const data = await resp.json()
      setPets(data)
      } catch (error) {
        console.log('Error fetch pets:', error)
      }
    }

    useEffect(() => {
      fetchPets()
    }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    const handleDeletePet = async (petId) => {
      try {
        const resp = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${petId}`, {
          method: 'DELETE',
        })
        if (resp.ok) {
          setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId))
        } else {
          const data = await resp.json()
          console.error('Failed to delete pet', data)
        }
      } catch (error) {
        console.error('Error deleting pet:', error)
      }
    }

  return (
    <>
    <Header/>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="petListPageDiv">
            <div className="h1AndButton">
            <h1 className="petListPageH1">Pet List</h1>
            <Link to="/add-pet">
            <button className="button">Add pet</button>
            </Link>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cardContainer">
          {pets.map((pet) => (
            <motion.div 
            className="card" 
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            >
              <p className="name">{pet.name}</p>
              <p className="date">{formatDate(pet.dob)}</p>
              <p className="email">{pet.client_email}</p>
              <div className="buttons">
              <Link to={`/pet-logs/${pet.id}?dob=${formatDate(pet.dob)}`}>
                <button className="viewLogBtn">view log</button>
              </Link>
                <button className="deleteBtn" onClick={() => handleDeletePet(pet.id)}>delete</button>
              </div>
              </motion.div>
          ))}
        </motion.div>
      </div>
      </motion.div>
    </>
  )
}

export default PetListPage