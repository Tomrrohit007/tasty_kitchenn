import './index.css'
import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts'

const VaccinationByAge=(props)=>{
    const {data} = props
    return(
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                cx="50%"
                cy="40%"
                data={data}
                startAngle={0}
                endAngle={360}
                outerRadius="64%"
                dataKey="count"
                >
                <Cell dataKey='18-44' name="18-44" fill=" #5a8dee"  />
                <Cell dataKey='44-60' name="44-60" fill=" #a3df9f" />
                <Cell dataKey='Above 60' name="Above 60" fill="#64c2a6" />
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

export default VaccinationByAge