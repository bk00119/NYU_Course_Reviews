import SectionTitle from "../sectionTitle";

export default function FixedQuestion(props){
  return (
    <div className="flex">
      <SectionTitle>{props.title}:</SectionTitle>
      <h4 className="text-xl ml-4">{props.val}</h4>

    </div>
  )
}