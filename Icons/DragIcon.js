import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


function DragIcon(props) {
  return (
    <Svg
      viewBox="0 0 18 20"
      width={props.size}
      height={props.size}
      fill="none"
    >
     <Path d="M0 12.8571H7.85714V17.2643L6.00714 15.4214L5 16.4286L8.57143 20L12.1429 16.4286L11.1357 15.4214L9.28571 17.2643V12.8571H17.1429V11.4286H0V12.8571ZM5 3.57143L6.00714 4.57857L7.85714 2.73571V7.14286H0V8.57143H17.1429V7.14286H9.28571V2.73571L11.1357 4.57857L12.1429 3.57143L8.57143 0L5 3.57143Z" fill="#636363"/>

    </Svg>
  )
}

export default DragIcon

