

import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function CloseIcon(props) {
    return (
        <Svg width={props.size}
            height={props.size} viewBox="0 0 24 24"
            fill="none" stroke={props.color} stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-x">
           <Line x1="18" y1="6" x2="6" y2="18"/>
           <Line x1="6" y1="6" x2="18" y2="18"/>
        </Svg>
    )
}

export default CloseIcon


