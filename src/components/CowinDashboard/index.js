import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusContant = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class CowinDashboard extends Component {
  state = {
    isLoading: true,
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusContant.intial,
  }

  componentDidMount() {
    this.getData()
  }

  renderLoader = () => {
    return (
      <div className="loader-cont" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }
  renderSuccess = () => {
    const {
      vaccinationByAge,
      vaccinationByGender,
      last7DaysVaccination,
    } = this.state
    return (
      <>
        <div className="bar-chart-cont">
          <h1 className="graph-heading">Vaccination Coverage</h1>
          <VaccinationCoverage data={last7DaysVaccination} />
        </div>
        <div className="pie-chart-cont">
          <h1 className="graph-heading">Vaccination by gender</h1>
          <VaccinationByGender data={vaccinationByGender} />
        </div>
        <div className="pie-chart-cont">
          <h1 className="graph-heading">Vaccination by age</h1>
          <VaccinationByAge data={vaccinationByAge} />
        </div>
      </>
    )
  }

  renderFailure = () => {
    return (
      <div className="failure-cont">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Something went wrong</h1>
      </div>
    )
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    let data = await response.json()

    const vaccinationByAge = data.vaccination_by_age
    const vaccinationByGender = data.vaccination_by_gender
    const last7DaysVaccination = data.last_7_days_vaccination.map(each => ({
      dose1: each.dose_1,
      dose2: each.dose_2,
      vaccineDate: each.vaccine_date,
    }))
    if (response.ok) {
      this.setState({
        last7DaysVaccination,
        vaccinationByGender,
        vaccinationByAge,
        apiStatus: apiStatusContant.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failed, isloading: false})
    }
  }

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSuccess()
      case apiStatusContant.failed:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-cont">
        <div className="context">
          <div className="logo-cont">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <p className="name">Co-WIN</p>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
        </div>
        {isLoading ? this.renderLoader() : this.renderAllView()}
      </div>
    )
  }
}

export default CowinDashboard
