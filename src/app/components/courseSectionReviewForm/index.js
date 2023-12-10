import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import SectionTitle from "../sectionTitle"

export default function CourseSectionReviewForm(props) {
  // FORM VALIDATION
  const ReviewSchema = Yup.object().shape({
    // comment: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email").required("Required"),
    // message: Yup.string().required("Required"),
  })

  return (
    <div className="">
      <Formik
        // BLANK TEXT WHEN THE FORM FIRST GETS LOADED
        initialValues={{
          comment: "",
        }}
        validationSchema={ReviewSchema}
        onSubmit={async (values) => {
          // // trigger Netlify Function to send an email to my personal email from no-reply@briankim.pro
          // const res = await fetch("./.netlify/functions/triggerEmail", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     senderName: values.name,
          //     senderEmail: values.email,
          //     message: values.message,
          //   }),
          // })

          // if (res.status === 200) {
          //   // props.setFormIsSent(true)
          // } else {
          //   // ERROR MAY BE CAUSED BY NETWORK OR API REQUEST FAILURE
          //   alert(
          //     "NETWORK ERROR: Your contact email is not sent. Please email me directly."
          //   )
          // }
          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <Form
            // className={styles.formInnerContainer}
            className="w-full"
            name="contact"
            method="POST"
            data-netlify="true"
          >
            {/* SENDER MESSAGE FIELD */}
            <div className="mb-8">
              <SectionTitle>Year*</SectionTitle>
              <SectionTitle>Semester*</SectionTitle>
              <SectionTitle>Section*</SectionTitle>
              <SectionTitle>Course Rating*</SectionTitle>
              <SectionTitle>Level of Difficulty*</SectionTitle>
              <SectionTitle>Grade</SectionTitle>
              <SectionTitle>Comment</SectionTitle>
              <Field
                name="message"
                as="textarea"
                className="border w-full p-2 outline-none"
              />
              {/* {errors.message && touched.message ? (
                <p >{errors.message}</p>
              ) : null} */}
            </div>

            {/* FORM SUBMIT BUTTON */}
            {/* <div className={styles.submitButtonContainer}>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div> */}

            {/* SUBMIT BUTTON */}
            <div className="w-full text-center">
              <button
                type="submit"
                className="text-xl p-3 bg-violet text-white rounded-lg"
              >
                Submit review
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
