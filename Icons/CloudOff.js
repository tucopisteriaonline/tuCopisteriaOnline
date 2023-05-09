
import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function CloudOff(props) {
    return (
        <Svg 
        width={props.size}
        height={props.size} 
        viewBox="0 0 24 24" fill="none"stroke={props.color}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-off">
            <Path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"/>
            <Line x1="1" y1="1" x2="23" y2="23"/>
        </Svg>
    )
}

export default CloudOff
