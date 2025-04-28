import {
  Col,
  Container,
  Row,
} from "reactstrap";
import AgentBox from "../components/Common/AgentBox";
import SkeletonAgentBox from "../components/Common/skeleton/AgentBox";
import Topsection from "../components/Common/Topsection";
import Layout from "../components/Layout";
import orderBy from "lodash.orderby";
import { ApiGet } from "../helper/ApiData";
import ScrollAnimation from "react-animate-on-scroll";
import { useEffect, useState } from "react";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";

const delayByAgentIndex = {
  0: 0.5,
  1: 0.7,
  2: 0.9,
  3: 1,
  4: 1.3
}

function Agents({ agents }) {

  const [metaDetails, setMetaDetails] = useState({
    pageName: "Our Agents"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Our Agents');
  //   setMetaDetails(metadetail)
  // }, [])

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection
        pageTitle="Our Agents"
        titleLight
        backgroundImage="/assets/images/agent-hero-bg.jpg"
      />
      <div className="section">
        <Container>
          <Row>
            <Col md={12}>
              {!agents.length ? (
                <ul className="agents-list">
                  <SkeletonAgentBox count={10} />
                </ul>
              ) : (
                <ul className="agents-list">
                  {agents.map((agent, i) => {
                    return (
                      <li key={i}>
                        <ScrollAnimation animateIn="custom-fadeInUp" duration={(!i ? 0.5 : (0.5 + ((i + 1) * 0.1)))} animateOnce>
                          <div className="mb-4">
                            <AgentBox agent={agent} />
                          </div>
                        </ScrollAnimation>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Col>
            {/* <Col md={3}>
                        <div className="sidebar sticky">
                                <Widget title="Find Agent">
                                    <FormGroup>
                                        <Input type="text" className="standard-input" placeholder="Enter Agent Name" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="select" name="select" className="standard-input">
                                            <option>All Categories</option>
                                            <option>Buying</option>
                                            <option>Renting</option>
                                            <option>Recent Sales</option>
                                            <option>Find Offices</option>
                                            <option>Find Agents</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="select" name="select" className="standard-input">
                                            <option>All Cities</option>
                                            <option>Afghanistan</option>
                                            <option>Albania</option>
                                            <option>Algeria</option>
                                            <option>Brazil</option>
                                            <option>Burundi</option>
                                            <option>Bulgaria</option>
                                            <option>California</option>
                                            <option>Germany</option>
                                            <option>Grenada</option>
                                            <option>Guatemala</option>
                                            <option>Iceland</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="primary" block className="py-3"> <i className="fa fa-search mr-2" aria-hidden="true"></i> SEARCH</Button>
                                    </FormGroup>
                                </Widget>
                            </div>
                        </Col> */}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const agentsResponse = await ApiGet(`agents/list`);
    const agents = orderBy(
      agentsResponse.data.data.items,
      [(obj) => obj.agent_priority],
      "asc"
    );
    return {
      props: {
        agents,
      },
      revalidate: 60 * 60 * 12,
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        agents: [],
      },
      revalidate: 60 * 60 * 12,
    };
  }
};

export default Agents;