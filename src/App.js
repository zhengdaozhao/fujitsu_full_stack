import React, { useState } from 'react';
import './App.css'
import {  Layout, Menu } from 'antd';
import * as Icon from "@ant-design/icons";
import logo from './assets/logo/ibm-2.jpg'
import { useNavigate, Routes, Route,Navigate } from 'react-router-dom';
import Trans from './components/Trans';
import Home from './components/Home';
const { Header, Content ,Footer} = Layout;

function getItem (label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
// 创建icon图标元素
const iconToElement = (name) =>
    React.createElement(Icon && (Icon)[name], {
        style: { fontSize:'4vw',marginTop:10 },
        color:"#FF8400"
    })

const zpd=[{name:'home',iconName:'HomeTwoTone'},{name:'变换条件管理',iconName:'EditTwoTone'}];
const zqd = [
  getItem('变换', '/home', iconToElement('HomeOutlined')),
  // getItem('Home', '/home', <HomeTwoTone />),
  getItem('变换条件管理', '/trans', iconToElement('EditOutlined')),
  // getItem('Exit', '/login', iconToElement('LogoutOutlined'))
];


function App() {
  const navigate = useNavigate()

  const onClick = (e) => {
    navigate(e.key, { replace: true })
  }

  return (
    <Layout>
      <Header className='gloalHeader'
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height:'80px',
          background:'#0F6292',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 180,
            // height: 31,
            // margin: '16px 24px 16px 0',
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <img src={logo} style={{width:180,height:80,objectFit:'cover'}}></img>
        </div>
        <Menu 
          // defaultSelectedKeys={['1']} 
          mode="horizontal" 
          items={zqd} 
          onClick={onClick} 
          // style={{background:'#867070',fontSize:20,color:'white'}}
          style={{background:'#0F6292',fontSize:'2vw',color:'white'}}
        />
      </Header>
      <Content
        className="site-layout"
      >
        <div className='content-div'
          style={{
            padding: 24,
            height: 520,
            width:'100%',
            // minHeight:'97%',
            overflow:'scroll',
            // background: '#FAEDCD',
            background: '#F1F6F9',
          }}
        >
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/trans" element={<Trans />} />
              {/* <Route exact path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </div>
      </Content>
      <Footer style={{textAlign:'center',background:'#0F6292',height:60,color:'white'}}>
        Fujitsu大型机IBM化
      </Footer>
    </Layout>
    
  );
}

export default App;