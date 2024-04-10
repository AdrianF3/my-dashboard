import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface DataPoint {
    date: string;
    Daily: number;
    Cumulative: number;
    Difference: number;
    Expected: number;
    // Add any additional keys here if your data structure expands
}

interface HabitGraphDataProps {
    chartWidth: number;
    graphData: DataPoint[];
}

const colors = {
    Expected: "#8884d8",
    Cumulative: "#82ca9d",
    Daily: "#ffc658",
    Difference: "#ff7300",
    // Define more colors if you add more data keys
};

const HabitGraphData: React.FC<HabitGraphDataProps> = ({ chartWidth, graphData }) => {
    console.log('graphData', graphData);

    // This function dynamically generates Line components based on the data keys
    const renderLines = () => {
        // Check if graphData is not empty before proceeding
        if (graphData.length === 0) {
            return null; // Return null or some placeholder if graphData is empty
        }
    
        const keys = Object.keys(graphData[0]).filter(key => key !== 'date');
        return keys.map(key => (            
            <Line
                key={key}
                type="monotone"
                dataKey={key}
                // stroke={colors[key]}
                stroke={colors[key as keyof typeof colors]}
                activeDot={{ r: 8 }}
            />
        ));
    };
    

    return (
        <section>
            <div className="my-4">
                <h3 className="text-xl font-semibold mb-2">Progress Graph</h3>
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    <LineChart
                        width={chartWidth}
                        height={300}
                        data={graphData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {renderLines()}
                    </LineChart>
                </div>
            </div>
        </section>
    );
};

export default HabitGraphData;
