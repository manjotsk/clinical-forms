import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
import { connect } from 'dva';
import DynamicDropdownFormItems from './DynamicDropdownFormItems';

const SelectBar = ({ label, onClick, subText }) => (
  <div
    onClick={onClick}
    className="block flex-none justify-center rounded-md content-center h-10 max-w-sm text-center bg-gray-200 container m-2 hover:bg-blue-100 cursor-pointer"
  >
    <span className="text-2xl">{`${label} `}</span>
    {!!subText && <span className="text-md">({subText})</span>}
  </div>
);

const CreateForm = ({ dispatch, availableFormFields }) => {
  useEffect(() => {
    dispatch({
      type: 'formFields/fetchAllFormFields',
    });
    return () => {};
  }, []);
  const [form] = Form.useForm();

  const [selectedFieldType, setSelectedFieldType] = useState('');

  const typeofFields = [
    {
      label: 'Dropdown List',
    },
    {
      label: 'Text',
    },
    {
      label: 'Multiline Text',
    },
    {
      label: 'Numeric',
    },
    {
      label: 'Decimal',
    },
    {
      label: 'Checkbox',
    },
    {
      label: 'Regex',
    },
  ];

  const addNewField = () => {
    form.submit();
    setSelectedFieldType('')
  };

  const renderFormForFieldTypes = ({fieldType}) => {
    switch (fieldType) {
      case 'Dropdown List': {
        return (
          <>
            <Form.Item label="Field Name" name="fieldName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <DynamicDropdownFormItems />
          </>
        );
      }
      case 'Numeric': {
        return (
          <Form.Item label="Field Name" name="fieldName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        );
      }
      case 'Decimal': {
        return (
          <Form.Item label="Field Name" name="fieldName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        );
      }
      default: {
        return (
          <Form.Item label="Field Name" name="fieldName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        );
      }
    }
  };

  return (
    <div>
      <span className="text-4xl">Form Fields</span>
      <div>
        <div className="bg-blue-300 column-left justify-center rounded-md border-green-1000 border-solid">
          {availableFormFields.length ? (
            <span className=" justify-center">Available Fields</span>
          ) : (
            <span>Click on any field type to create a form field.</span>
          )}
          {availableFormFields.map(({ fieldName, fieldType }) => (
            <SelectBar label={fieldName} subText={fieldType} />
          ))}
        </div>
        <div className="bg-green-300 column-right justify-center rounded-md border-green-1000 border-solid">
          {typeofFields.map(({ label }) => (
            <SelectBar
              onClick={() => {
                // create Form Fields
                form.setFieldsValue({ fieldType: label });
                setSelectedFieldType({ fieldType: label });
              }}
              label={label}
            />
          ))}
        </div>
      </div>
      <Modal
        title="Add new Field"
        visible={selectedFieldType}
        onOk={addNewField}
        onCancel={() => setSelectedFieldType({})}
      >
        <Form
          form={form}
          onFinish={values => {
            dispatch({
              type: 'formFields/createFormField',
              payload: values,
            }).then(() => {
              setSelectedFieldType({});
            });
          }}
        >
          {renderFormForFieldTypes(selectedFieldType)}
          {/* <Form.Item label="Field Name" name="fieldName" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            style={{ display: 'none' }}
            label="Field Type"
            name="fieldType"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(
  ({ formFields }) => ({ availableFormFields: formFields.availableFormFields || [] }),
  dispatch => ({ dispatch }),
)(CreateForm);
