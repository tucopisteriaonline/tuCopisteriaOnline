import * as React from "react"
import Svg, { SvgProps, Path, Polyline } from "react-native-svg"


function CheckIcon(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
            <Polyline points="20 6 9 17 4 12" stroke={props.color} strokeWidth={2}/>
        </Svg>
    )
}

export default CheckIcon