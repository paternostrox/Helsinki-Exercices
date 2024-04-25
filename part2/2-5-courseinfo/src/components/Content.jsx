import Part from "./Part"

const Content = ({parts}) => {
    return (
        <ul style={{padding: 0}}>
            {parts.map(item => 
                <Part key={item.id} {...item} />
            )}
        </ul>
    )
}

export default Content