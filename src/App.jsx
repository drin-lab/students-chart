import  { useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {useSpring, animated} from '@react-spring/web';


const AnimatedBar = ({x,y,width, height, fill,i,value})=>
{const springProps = useSpring({
  from:{width:0, value:0 },
  to:{width,value},
  config:{tension:120, friction:50},
  delay:i * 70});
   return(
  <g>
  <animated.rect
  x={x}
  y={y}
  width={springProps.width}
  height={height}
  fill={fill}
  />
    <animated.text
        x={springProps.width.to(w => x + w + 5)}
        y={y + height / 2}
        dy="0.35em"
        fontSize={12}
      >
        {springProps.value.to(v=> Math.round(v))}
      </animated.text>
  </g>
)
}

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];


export default function BarChart(){

const margin = {top:60, right:40, bottom:40, left:110}
const chartWidth = 700
const chartHeight = 500

const xScale = d3.scaleLinear()
.domain([0,d3.max(data, d=>d.students)??0])
.range([margin.left, chartWidth - margin.right ])

const yScale = d3.scaleBand()
.domain(data.map(d=>d.country))
.range([margin.top, chartHeight - margin.bottom])
.padding(0.2)

const xAxisRef = useRef(null)
const yAxisRef = useRef(null)

useEffect(()=>{
  d3.select(xAxisRef.current).call(d3.axisBottom(xScale)).attr('font-family',null)
  d3.select(yAxisRef.current).call(d3.axisLeft(yScale)).attr('font-family',null)},[])

  return(
<div 
style={{
  display:'inline-block',
  border:'1px solid #d4d4d8',
  borderRadius: 16,
  padding:16,
  backgroundColor:'#f8f7f4',
  fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif",
}}>
<style>
      {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');`}
    </style>
<svg width={chartWidth} height={chartHeight}>
<text x={chartWidth/2} y={margin.top/2} dominantBaseline="middle" textAnchor="middle" fontSize={18} fontWeight='bold' >Students per Country</text>
<g ref={xAxisRef} transform={`translate(0, ${chartHeight - margin.bottom})`}/>
<g ref={yAxisRef} transform={`translate(${margin.left},0)`}/>  

{data.map((d,i)=>(
<AnimatedBar
key={i}
i={i}
x={margin.left}
y={yScale(d.country)}
height={yScale.bandwidth()}
width={xScale(d.students)- margin.left}
fill={d.students >50?'#00ff83':d.students >10?'#000000':'#a69eb0'}
label={d.country}
value={d.students}
/>))}
</svg>
</div>)}