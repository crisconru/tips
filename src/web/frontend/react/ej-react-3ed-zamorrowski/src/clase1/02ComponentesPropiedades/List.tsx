import React from "react"

interface Props {
    children?: React.ReactNode
}

const List = ({children}: Props) => <ul>{children}</ul>

export default List