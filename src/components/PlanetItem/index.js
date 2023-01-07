import './index.css'

const PlanetItem=(props)=>{
    const {each} = props
    const {name, description, imageUrl} = each
    return(
        <div className="item">
            <img src={imageUrl} alt={name} className="image"  />
            <h1 className="item-heading">{name}</h1>
            <p className="item-para">{description}</p>
        </div>
    )
}

export default PlanetItem