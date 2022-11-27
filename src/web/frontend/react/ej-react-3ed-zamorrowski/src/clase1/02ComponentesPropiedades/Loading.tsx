import React from "react"

interface Props {
    show?: boolean,
    children: React.ReactNode
}

const Loading = ({ show = false, children}: Props) => <>{show ? children : <p>Loading ...</p>}</>
export default Loading
