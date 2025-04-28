import Link from "next/link"
import { memo } from "react";
import { titleToSlug } from "../../helper/utils/common.util";
import ImageComponent from "./ImageComponent";

function AgentBox({ agent }) {

    const mobileNumberObj = agent.phoneNumbers.find(obj => obj.typeCode === 'M');
    const mobileNumberLink = `${mobileNumberObj ? 'tel:' + mobileNumberObj.number : 'javascript:void(0)'}`;
    const agentName = `${agent.firstName} ${agent.lastName}`;
    const agentRoute = `/agents/${agent.id}-${titleToSlug(agentName)}`;
    return (
        <div className="agent-box text-center mb-5">
            <Link passHref href={agentRoute}>
                <a>
                    <div className="agent-img">
                                <ImageComponent src={agent.photo.thumb_360} layout='fill' alt="" />
                    </div>
                </a>
            </Link>
            <div className="agent-info">
                <h6><Link href={agentRoute}>{agentName}</Link></h6>
                <span>{agent.position ? agent.position : '-'}</span>
                <ul className="personal-info">
                    <li><a target="_blank" rel="noreferrer" href={mobileNumberLink}>{mobileNumberObj?.number ? mobileNumberObj?.number : '03 8390 0699'}</a></li>
                    <li><a target="_blank" rel="noreferrer" href={`mailto:${agent.email}`} className="personal-mail">{agent.email}</a></li>
                </ul>
            </div>
        </div>
    )
}

export default memo(AgentBox, (prev, next) => prev.agent.id === next.agent.id)
