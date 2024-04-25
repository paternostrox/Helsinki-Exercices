const Sum = ({parts}) => {

    let sum = parts.reduce((acc, item) => acc += item.exercises, 0)

    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    )
}

export default Sum