import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function UnploadIcon(props) {
    return (
        <Svg width={props.size}
            height={props.size} viewBox="0 0 24 24"
            fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-upload-cloud">
            <Polyline points="16 16 12 12 8 16"/>
            <Line x1="12" y1="12" x2="12" y2="21"/>
            <Path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
            <Polyline points="16 16 12 12 8 16"/>
                 
        </Svg>
    )
}

export default UnploadIcon


