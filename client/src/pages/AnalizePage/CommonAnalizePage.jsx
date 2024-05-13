import Page from "../../components/Page"
import FormCommonAnalize from "../../forms/FormCommonAnalize"
import Container from "../../ui/Container"
import Wrapper from "../../ui/Wrapper"

const CommonAnalizePage = (props) => {
    return <Page hasNav>
        <Container>
            <Wrapper fullPageOptions={{ hasNav: true }} align="center" justify="center">
                <FormCommonAnalize />
            </Wrapper>
        </Container>

    </Page>
}
export default CommonAnalizePage