import NerdCat from '../../assets/nerd-cat.svg'

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <img src={NerdCat} alt="A cat using a computer" />
    </div>
  )
}

export default PageHeader