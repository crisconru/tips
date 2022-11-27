import React from "react"

interface Props {
    show: boolean
    children?: React.ReactNode
}

const ConditionalRender = ({show, children}: Props) => <>{show && children}</>
export default ConditionalRender