import { Component } from "react"
import Slider from "react-slick"
import PlanetItem from "../PlanetItem"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

class PlanetsSlider extends Component{
    render(){
        const {planetsList} = this.props
        console.log(planetsList)
        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            autoplay:true,
            autoplaySpeed:1000
        }

        return(
            <div className="main-cont">
                <h1 className="heading">PLANETS</h1>
                <Slider {...settings} >
                {planetsList.map(each=><PlanetItem each={each} key={each.id} />)}
                </Slider>
            </div>
        )
    }
}

export default PlanetsSlider