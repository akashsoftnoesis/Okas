import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Topsection from '../components/Common/Topsection'
import Layout from '../components/Layout'
import MetaHandler, { getMetaDetails } from '../helper/utils/commonMetaApi'

export default function Career() {

    const [metaDetails, setMetaDetails] = useState({
        pageName: "Career"
    })

    //eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async () => {
    //   const metadetail = await getMetaDetails('Career');
    //   setMetaDetails(metadetail)
    // }, [])

    return (
        <Layout>
            <MetaHandler props={metaDetails} />
            <Topsection
                titleLight
                pageTitle="Career"
                backgroundImage="/assets/images/career-bg.jpg"
            />
            <div className="section bg-gray-100">
                <Container>
                    <h4 className="text-center pt-4 font2">No Jobs available</h4>
                </Container>
            </div>
        </Layout>
    )
}
