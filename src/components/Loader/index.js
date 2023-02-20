import Loader from "react-loader-spinner";

const LoaderComp = () =>{
    return <div className="loader-cont">
        <Loader type="TailSpin"
          height="80"
          width="80"
          color="#F7931E"
          ariaLabel="tail-spin-loading"
          radius={1}
          visible={true} />
    </div>
  }

export default LoaderComp