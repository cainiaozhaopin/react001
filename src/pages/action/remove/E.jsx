import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import styleObj from './B.module.css'
class Remove extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        
        this.setState({

            ModalText: '确定删除吗？',
            confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            
          },()=>{
            this.props.remove()
          });
        }, 500);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
    
      render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
          <>
            <Button type="primary" onClick={this.showModal} icon={<CloseOutlined />} className={styleObj.button1} >
              {/* <EditOutlined /> */}
            </Button>
            <Modal
              title="Title"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              width={300}
              okText={"确定"}
              cancelText={"取消"}
            >
              <p>确定删除吗？</p>
            </Modal>
          </>
        );
      }
}

export default Remove;