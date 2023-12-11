import { Field } from "formik";
import SectionTitle from "@components/sectionTitle";

export default function DropdownQuestion(props){
  return (
    <div className={props.styles}>
      <SectionTitle className={props.titleStyles}>{props.title}</SectionTitle>
      <Field as="select" name={props.name} className={props.fieldStyles}>
        {props.options.map((option, index)=> (
          <option key={index} value={option}>{option}</option>
        ))}
      </Field>
    </div>
  )
}