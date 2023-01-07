import {BarChart, Bar, XAxis, YAxis, Legend, Tooltip} from 'recharts'

const VaccinationCoverage = props => {
  const {data} = props
  return (
    <BarChart data={data} width={10000} height={300}>
      <XAxis dataKey="vaccineDate" />
      <YAxis />
      <Legend />
      <Tooltip />

      <Bar dataKey="dose1" name="Dose 1" fill=" #5a8dee" barSize={40} />
      <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize={40} />
    </BarChart>
  )
}

export default VaccinationCoverage
