import * as React from "react"
import Svg, { SvgProps, Path, Polyline, Circle, Line } from "react-native-svg"

function HelpIcon({ size, color }) {
    return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
            <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1" fill="none" />
            <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </Svg>
    )
}

export default HelpIcon