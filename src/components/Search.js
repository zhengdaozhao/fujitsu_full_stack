import { Button, Checkbox, Form, Input,notification} from 'antd';
import api from '../api/axiosConfig'
import './Search.css'
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const Search = (Props) => (
<Form
    name="basic"
    layout="inline"
    style={{
      maxWidth: '85%',
      backgroundColor:'#A9907E',
      
      outline:'thick double #32a1ce',
      padding:'5px',
      marginBottom:'15px',
      marginLeft:'5px',
    }}
    initialValues={{
      remember: true,
      keyword:'',
      operation:'',
      preChange:'',
      postChange:'',
      author:'',
      updateDate:''
    }}
    autoComplete="off"
    onFinish={values=>Props.submitter(values)}
  >
    <Form.Item
      label={<label style={{ color:'white'}}>Filter</label>}
      name="keyword"
    >
      <Input placeholder="keyword" className='zhd'/>
    </Form.Item>

    <Form.Item
      name="operation"
    >
      <Input placeholder="operation" className='zhd' />
    </Form.Item>

    <Form.Item
      name="preChange"
    >
      <Input  placeholder="preChange" className='zhd'/>
    </Form.Item>

    <Form.Item
      name="postChange"
    >
      <Input placeholder="postChange" className='zhd'/>
    </Form.Item>

    <Form.Item
      name="author"
    >
      <Input placeholder="author" className='zhd'/>
    </Form.Item>

    <Form.Item
      name="updateDate"
    >
      <Input placeholder="updateDate" className='zhd'/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 1,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Search
      </Button>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 1,
        span: 12,
      }}
    >
      <Button onClick={Props.resetter} style={{background:'#863A6F',color:'white'}}>
        Reset
      </Button>
    </Form.Item>


  </Form>
);
export default Search;