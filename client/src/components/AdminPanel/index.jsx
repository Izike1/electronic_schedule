import Container from "../../ui/Container"
import Wrapper from "../../ui/Wrapper"
import classes from './admin-panel.module.scss'
const AdminPanel = ({ title, children, ...props }) => {
    return <Container>
        <Wrapper style={{
            borderBottom: '2px solid gray',
            paddingBottom: '10px'
        }} {...props} direaction="col" verticalMargin children_margin>
            <h4 className={classes.title}>{title}</h4>
            {children}
        </Wrapper>
    </Container>
}
export default AdminPanel