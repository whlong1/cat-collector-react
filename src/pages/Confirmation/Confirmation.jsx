import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'

// Components
import PageHeader from '../../components/PageHeader/PageHeader'

const Confirmation = (props) => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const resource = props.deleteCat ? 'cats' : 'toys'

  const handleDelete = () => {
    props.deleteCat && props.deleteCat(id)
    props.deleteToy && props.deleteToy(id)
    navigate(`/${resource}`)
  }

  return (
    <>
      <PageHeader title="Delete Confirmation" />
      <section className="confirmation">
        <h2>Are you sure you want to delete {state?.name}?</h2>
        <Link className="btn submit" to={`/${resource}/${id}`}>Cancel</Link>
        <button onClick={handleDelete} type="button" className="btn danger">Yes - Delete!</button>
      </section>
    </>
  )
}

export default Confirmation