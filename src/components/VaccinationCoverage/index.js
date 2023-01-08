import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    Tooltip
  } from "recharts"


const VaccinationCoverage=(props)=>{
    const {data} = props
      return (
        <ResponsiveContainer width='100%' height={370}>
          <BarChart
            data={data}
            width={10000}
            height={500}
          >
            <XAxis dataKey='vaccineDate' />
            <YAxis />
            <Legend />
            <Tooltip />
            

            <Bar dataKey='dose1' name="Dose 1" fill=" #5a8dee" barSize={40} />
            <Bar dataKey='dose2' name="Dose 2" fill="#f54394" barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      )
    }

export default VaccinationCoverage
