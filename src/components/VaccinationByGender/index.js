import './index.css'
import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts'

const VaccinationByGender=(props)=>{
    const {data} = props
    return(
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                cx="50%"
                cy="40%"
                data={data}
                startAngle={180}
                endAngle={0}
                outerRadius="68%"
                innerRadius='38%'
                dataKey="count"
                >
                <Cell dataKey='Male' name="Male" fill="#f54394"  />
                <Cell dataKey='Female' name="Female" fill="#5a8dee" />
                <Cell dataKey='Others' name="Others" fill="#2cc6c6" />
                </Pie>
                <Legend 
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                    margin:'20px'
                }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default VaccinationByGender