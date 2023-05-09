

import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function CartIcon(props) {
    return (
        <Svg width={props.size}
            height={props.size} viewBox="0 0 24 24"
            fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-shopping-cart">
            <Circle cx="9" cy="21" r="1"/>
            <Circle cx="20" cy="21" r="1"/>
            <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                 
        </Svg>
    )
}

export default CartIcon