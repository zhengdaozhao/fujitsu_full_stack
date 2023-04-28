import React,{useState,useEffect} from 'react';
import { Button, Space, Form, Input,Spin,notification } from 'antd';
import api from '../api/axiosConfig'
// import Counter from './Counter';
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const { TextArea } = Input;

function Home() {
    let request={inputFolder:'',outputFolder:''}
    const [inputname, setInput] = useState("");
    const [outputname, setOutput] = useState("");
    const [back, setback] = useState("");
    const [form] = Form.useForm();
    const [isFetching,setFetch]=useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const changJcl = async () => {
        if (inputname=='' || outputname=='') {
            openNotificationWithIcon('error', 'empty is not allow', `input the folder name to box`);
        } else {
            setback('');
            // const zparam=inputname + '+' + outputname;
            request.inputFolder=inputname
            request.outputFolder=outputname
            try
            {
                setFetch(true);
                setDisabledInput(true)
                // const res = await api.get(`/api/goals/trans/${zparam}`);
                const res = await api.post('/api/goals/trans',request);
                setback(res.data)
                setFetch(false)
                setDisabledInput(false)
            } 
            catch(err)
            {
                setFetch(false)
                setDisabledInput(false)
                console.log(err);
            };
        }
    }

    useEffect(() => {
        form.setFieldsValue({message: back})
    }, [back])

    return ( 
    <div style={{marginTop:'10px',textAlign: 'center' }}>

    <Form
        name="basic"
        initialValues={{//初始值
            remember: true,
            message:back
        }}
        form={form}//这里需要注册一下form
        // labelCol={{
        //   span: 8,
        // }}
        wrapperCol={{
        span: 50,
        }}
        style={{
        maxWidth: 600,
        marginLeft:280
        }}
  
    >
        <h1 style={{color:'blue'}}>JCL CONVERT</h1>
        <Form.Item
        //   label="INPUT文件夹"
            name="inputname"
            style={{ textAlign:'left' }}
            rules={[
                {
                required: true,
                message: 'the input folder cannot be empty!',
                },
            ]}
        >
            <Input disabled={disabledInput} placeholder="the INPUT folder name" onChange={e => setInput(e.target.value)} />
        </Form.Item>
    <Form.Item
    //   label="OUTPUT文件夹"
      name="outputname"
      style={{ textAlign:'left' }}
      rules={[
        {
          required: true,
          message: 'the output folder cannot be empty!!',
        },
      ]}
    >
      <Input disabled={disabledInput} placeholder="the OUTPUT folder name"  onChange={e => setOutput(e.target.value)}/>
    </Form.Item>

    <Form.Item
    >
      <Button type="primary" htmlType="submit" onClick={changJcl} style={{width:'100%'}}>
        CONVERT
      </Button>
    </Form.Item>
    {isFetching ?
         <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="the transfrom process is running..." size="large" />
        </Space> 
     : null } 
     <Form.Item
      name="message"
      rules={[
        {
          required: false,
          
        },
      ]}
    >
        <TextArea
        showCount
        maxLength={1000}
        style={{
            height: 180,
            marginBottom: 24,
        }}
        onChange={e => setMessage(e.target.value)}
        placeholder="the return message will display here"
        disabled={true}
        />
    </Form.Item>

  </Form>
</div>
  
     );
}

export default Home;