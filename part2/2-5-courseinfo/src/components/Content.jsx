import Part from "./Part"

const Content = ({parts}) => {
    return (
        <ul>
            {parts.map(item => 
                <Part key={item.id} {...item} />
            )}
        </ul>
    )
}

export default Content