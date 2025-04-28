import Image from "next/image";

export default function WhyChooseListing(props) {
  return (
    <div className="choose-box">
        <div className="icon-box">
          <Image width="60" height="60" src={props.image} alt=""/>
          </div>
        <div className="choose-box-info">
          <h4 className="font2">{props.title}</h4>
          <p>{props.desc}</p>
        </div>
    </div>
  )
}
