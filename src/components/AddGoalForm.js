import { Formik,Field} from 'formik';
import { Input,Button,Tag } from "antd";

const inputBootomMargin ={marginBottom: '10px'};
const inputTextArea ={marginBottom: '10px',width:'100%'};
const tagStyle={backgroundColor: 'red',color:'white',...inputBootomMargin};


const AddGoalForm = (props) => (
            <Formik
              initialValues={{ keyword: '', operation: '', preChange: '', postChange: '', author: ''}}
              validate={values => {
                const errors = {};

                if (!values.keyword) {
                    errors.keyword='keyword Required'
                }
                if (!values.operation) {
                    errors.operation='operation Required'
                }

                if (!values.author) {
                    errors.author='author name Required'
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                // alert(JSON.stringify(values, null, 2));
                  props.submitter(values);
                  setSubmitting(false);
                }    
              }
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    style={inputBootomMargin}
                    name="keyword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.keyword}
                    placeholder='this is keyword'
                  />
                  {errors.keyword && touched.keyword && 
                    <Tag style={tagStyle}>{errors.keyword}</Tag>}

                  <Input
                    style={inputBootomMargin}
                    name="operation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.operation}
                    placeholder='this is operation'
                  />
                  {errors.operation && touched.operation && 
                    <Tag style={tagStyle}>{errors.operation}</Tag>}

                  <Field
                    style={inputTextArea}
                    as="textarea"
                    name="preChange" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.preChange}
                    placeholder="code sample before transform" 
                    />

                  <Field
                    style={inputTextArea}
                    as="textarea"
                    name="postChange" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postChange}
                    placeholder="code sample after transform" 
                    />

                  <Input
                    style={inputBootomMargin}
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    placeholder='author name'
                  />
                  {errors.author && touched.author && 
                    <Tag style={tagStyle}>{errors.author}</Tag>}

                  <Button 
                    onClick={()=>submitForm()} 
                    type="primary"
                    disabled={isSubmitting | (touched && !isValid)}>
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
        );

//     }
// }

export default AddGoalForm;
