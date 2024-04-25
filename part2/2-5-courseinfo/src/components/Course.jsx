import Header from './Header'
import Content from './Content'
import Sum from './Sum'

const Course = ({course}) => {
    return(
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Sum parts={course.parts} />
        </>
    )
}

export default Course