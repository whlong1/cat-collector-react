import '../../styles/Form.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Services
import { getOne } from '../../services/toys'

// Components
import ToyInput from './ToyInput'

// Image Assets
import NerdCat from '../../assets/nerd-cat.svg'

const ToyForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    id ? props.updateToy(form) : props.addToy(form)
    navigate(`/toys`)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchOne = async () => {
      const toyData = await getOne(id)
      setForm({
        id: toyData.id,
        name: toyData.name,
        color: toyData.color,
        description: toyData.description,
      })
    }
    id ? fetchOne() : setForm({ color: '#ff0000' })
    return () => setForm({})
  }, [id])

  return (
    <>
      <div className="page-header">
        {id
          ? <h1>Edit Toy</h1>
          : <><h1>Add Toy</h1><img src={NerdCat} alt="A cat using a computer" /></>
        }
      </div>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <ToyInput form={form} handleChange={handleChange} />
          <button type="submit" className="btn submit">Submit!</button>
        </form>
      </section>
    </>
  )
}

export default ToyForm