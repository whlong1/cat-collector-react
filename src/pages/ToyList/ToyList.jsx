import './ToyList.css'

// Components
import ToyCard from '../../components/ToyCard/ToyCard'
import PageHeader from '../../components/PageHeader/PageHeader'

const ToyList = (props) => {
  return (
    <>
      <PageHeader title="All Cat Toys" />
      <section className="toy-card-container">
        {props.toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} isCard={true} />
        ))}
      </section>
    </>
  )
}

export default ToyList

