

import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function EyeIcon(props) {
    return (
        <Svg width={props.size}
            height={props.size}
            stroke={props.color} 
            viewBox="0 0 24 24" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
            <Path  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <Circle  cx="12" cy="12" r="3" />
        </Svg>
    )
}

export default EyeIcon
