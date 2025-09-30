import React from 'react'
import { Form, Row, Col, Upload } from 'antd'
import { InboxOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const DocumentsUploadForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Resume/CV" name="resume">
            <Dragger multiple={false} showUploadList={{ showRemoveIcon: true }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drop files here or click to upload</p>
              <p className="ant-upload-hint">PDF, DOC, DOCX up to 10MB</p>
            </Dragger>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="ID Document" name="idDocument">
            <div style={{ border: '2px dashed #d9d9d9', borderRadius: 8, padding: 24, textAlign: 'center' }}>
              <FileTextOutlined style={{ fontSize: 24, color: 'rgba(0,0,0,0.45)' }} />
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Upload ID</div>
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Photo" name="photo">
            <div style={{ border: '2px dashed #d9d9d9', borderRadius: 8, padding: 24, textAlign: 'center' }}>
              <UserOutlined style={{ fontSize: 24, color: 'rgba(0,0,0,0.45)' }} />
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Upload Photo</div>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default DocumentsUploadForm


