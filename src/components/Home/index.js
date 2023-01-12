import Header from "../Header"
import './index.css'


const Home=(props)=>{
    const onClickFindJObs=()=>{
        const {history} = props
        history.push('/jobs')
    }
        return(
            <div className="home-cont">
                <Header/>
                <div className="bottom-section-cont">
                    <div className="content-cont">
                        <h1 className="home-page-heading">
                            Find The Job That Fits Your Life
                        </h1>
                        <p className="home-page-para">Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</p>
                        <button className="find-job-btn" onClick={onClickFindJObs}>Find Jobs</button>
                    </div>
                </div>
            </div>
        )
    }
export default Home