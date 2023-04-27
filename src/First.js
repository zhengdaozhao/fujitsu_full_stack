import './App.css';
import 'antd/dist/reset.css';
import { Button, Space } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Title style={{color:'red',marginBottom:'30px'}}>Fujitsu大型机IBM化</Title>
      <Space direction="vertical"
       style={{width: '30%',}}>
      <Button style={{color:'black',marginBottom:'30px',background:'green'}} type="primary" block>JCL CONVERT</Button>
      <Button type="primary" block>PGM CONVERT</Button>
      </Space>
    </div>
  );
}
export default App;