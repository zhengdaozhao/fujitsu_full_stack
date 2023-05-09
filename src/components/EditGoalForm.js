import React,  {Component} from 'react';
import { Formik,Field } from 'formik';
import { Input, Tag, Button,notification } from 'antd';
const inputTextArea ={marginBottom: '10px',width:'100%'};

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export default class EditGoalForm extends Component {   
    render () {
        const { submitter, initialValues } = this.props;
        const iniPre=initialValues.preChange
        const iniPost=initialValues.postChange
        const iniAuth=initialValues.author
        return (
          <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={values => {
            let errors = {};
            if (!values.author) {
              errors.preChange = 'author name required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (iniPre==values.preChange && iniPost==values.postChange && iniAuth==values.author){
              openNotificationWithIcon('warning', 'No update happen', `because the data you submitted don't have any change with before`);
            }else{
            // console.log(values)
              submitter(values);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            isValid,
            handleBlur,
            handleSubmit,
            isSubmitting,
            submitForm
          }) => (
            <form onSubmit={handleSubmit}>

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
                    placeholder="code sample before transform" 
              />
              <Input
                style={{marginBottom: '5px'}}
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
                placeholder="author"
              />
              {errors.author && touched.author && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.author}</Tag>}

              <Button 
                onClick = {() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid) } 
                style={{backgroundColor:'#0EA293'}}
                >
                  Submit
              </Button>
            </form>
          )}
        </Formik>
      )
    }
}