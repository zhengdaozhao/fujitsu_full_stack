import React, { useState,useEffect,Fragment } from 'react';
import api from '../api/axiosConfig';
import Container from './Container';
import moment from 'moment';
import './Trans.css'

import {
  Table,
  Avatar,
  Spin,
  Modal,
  Space,
  Empty,
  Button,
  notification, 
  Descriptions,
  Popconfirm
} from 'antd'
import { PageHeader } from '@ant-design/pro-layout';
import AddGoalForm from './AddGoalForm'
import EditGoalForm from './EditGoalForm';


function Trans() {
    const [selectedGoal,setSelGoal]=useState([]);
    const [isFetching,setFetch]=useState(false);
    const [isModalOpen,setModal]=useState(false);
    const [isEditing,setEdit]=useState(false);
    const [isEditModalOpen,setEditModal]=useState(false);


    const [goals,setGoals]=useState([]);
    const [goal,setGoal]=useState([]);

    const formatterTime = (val) => {
      return val ? moment(val).format('YYYY-MM-DD') : ''
    }

    const openAddGoalModal = () => setModal(true);
    const closeAddGoalModal = () => setModal(false);
    const openEditGoalModal = () => setEditModal(true);
    const closeEditGoalModal = () => {
      setSelGoal([]);
      setEditModal(false);
    }
    const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

    const commonElements = () => (
        <div>
            <Modal title='Add new Goal' 
                    open={isModalOpen}
                    onOk={closeAddGoalModal}
                    onCancel={closeAddGoalModal}
                    width={1000}>
                <AddGoalForm
                  submitter={AddGoalFormSubmitter}
                 />
            </Modal>


            <Modal
                title='UPDATE DATA'
                open={isEditModalOpen}
                onOk={closeEditGoalModal}
                onCancel={closeEditGoalModal}
                width={1000}>
                
                <PageHeader style={{backgroundColor:'#F4EEE0',marginBottom:'10px'}} title={`${selectedGoal.keyword + '-' + selectedGoal.operation}`}>
                    <Descriptions size="small" column={3}>
                    <Descriptions.Item label="last author">{`${selectedGoal.author}`}</Descriptions.Item>
                    <Descriptions.Item label="Group">
                    <a>IBM dalian mainframe team</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Creation Time">{`${selectedGoal.updateDate}`}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                
                <EditGoalForm 
                    initialValues={selectedGoal} 
                    submitter={updateGoalFormSubmitter}/>
            </Modal>
            <div className="footer">
                <Container>
                    {goals.length !== undefined ? 
                    <Avatar
                        style={{backgroundColor:'#f56a00',marginRight:'5px',fontSize:'12px'}}
                        size='large'>{goals.length}</Avatar> : null
                    }
                <Button onClick={openAddGoalModal} type='primary' style={{fontSize:'12px'}}>Add New Goal +</Button>
                </Container>
            </div>

        </div>
    )

    let editGoal = (selectedGoal) => {
        setSelGoal(selectedGoal);
        openEditGoalModal();
    }

    let updateGoalFormSubmitter = (Goal) => {
        setEdit(true);
        updateGoal(Goal);
    }
    
    let AddGoalFormSubmitter = (Goal) => {
        setEdit(true);
        AddGoal(Goal);
    }
    
    const deleteOneGoal = async (GoalId) => {
      try
      {
        const res = await api.delete(`/api/goals/${GoalId}`);
        openNotificationWithIcon('success', 'Goal deleted', `${GoalId} was deleted`);
        getGoals();
      } 
      catch(err)
      {
        openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
        console.log(err);
      }
    }

    const AddGoal = async (Goal) =>{
        try
        {
          const res = await api.post("/api/goals",Goal);
          openNotificationWithIcon('success', 'Goal added', `1 record was added`);
          closeAddGoalModal();
          getGoals();
          setEdit(false);
        } 
        catch(err)
        {
          console.log(err);
          openNotificationWithIcon('error', 'error', `(${err.response.data.keyword}) ${err.response.data.operation}`);
          setEdit(false);
        }
    }

    const updateGoal = async (Goal) =>{
        try
        {
          const res = await api.put("/api/goals",Goal);
          openNotificationWithIcon('success', 'Goal updated', `1 record was updated`);
          closeEditGoalModal();
          getGoals();
          setEdit(false);
        } 
        catch(err)
        {
          console.log(err);
          openNotificationWithIcon('error', 'error', `(${err.response.data.keyword}) ${err.response.data.operation}`);
          setEdit(false);
        }
    }

    // search all data
    const getGoals = async () =>{
      try
      {
        setFetch(true);
        const res = await api.get("/api/goals");
        setGoals(res.data);
        setFetch(false)
      } 
      catch(err)
      {
        setFetch(false)
        console.log(err);
      }
  }

    useEffect(()=>{
        getGoals();
    },[]);

    if(isFetching | isEditing ){
      return(
          <Container>
          <Space direction="vertical" style={{ width: '100%' }}>
              <Spin tip="Loading" size="large" />
          </Space>
          </Container>
      )
    }    

    if (goals && goals.length) {
            const column = [
                {
                title:'keyword',
                dataIndex:'keyword',
                width: 100,
                key:'keyword',
                className:'laoyaoziling',
                },
                {
                title:'operation',
                dataIndex:'operation',
                width: 60,
                className:'laoyaoziling',
                key:'operation'
                },
                {
                title:'before change',
                className:'zpd laoyaoziling',
                dataIndex:'preChange',
                width:260,
                key:'preChange'
                },
                {
                title:'after change',
                className:'zpd laoyaoziling',
                dataIndex:'postChange',
                width:330,
                key:'postChange'
                },
                {
                title:'author',
                className:'laoyaoziling',
                dataIndex:'author',
                width:60,
                key:'author'
                },
                {
                title:'change date',
                dataIndex:'updateDate',
                className:'laoyaoziling',
                width:120,
                render: formatterTime,
                key:'updateDate'
                },
                {
                  title: 'Action',
                  className:'laoyaoziling',
                  key: 'action',
                  render: (text, record) => (
                    <Fragment>
                      <Popconfirm
                        title={`delete ${record.keyword + '-' + record.operation}`} 
                        description="Are you sure to delete?"
                        onConfirm={() => deleteOneGoal(record.keyword + ':' + record.operation)} okText='Yes' cancelText='No'
                      >
                        <Button type="primary" danger style={{fontSize:'12px'}}>Delete</Button>
                      </Popconfirm>

                      <Button style={{marginLeft: '5px',backgroundColor:'green',fontSize:'12px'}} type='primary' onClick={() => editGoal(record)}>Update</Button>
                    </Fragment>
                  ),
                }                
            ];
            return (
                <Container>
                  <Table  style={{marginBottom:'100px',width:"86%"}}
                            dataSource={goals} 
                            columns={column} 
                            pagination={false}
                            rowClassName={
                              (record, index) => {
                                let className = ''
                                className = index % 2 ===0 ? 'ou' : 'ji'
                                return className
                              }
                            }
                            // rowKey={(record,index)=>index}/>
                            rowKey='postChange' />
                  {commonElements()}
              </Container>
            ); 
        }

    return ( 
      <Container>
        <Empty description={<h1>no students found</h1>}/>
        {commonElements()}
      </Container>
    );
}

export default Trans;