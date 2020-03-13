import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const SelectBar = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="block flex-none justify-center rounded-md content-center h-10 max-w-sm text-center bg-gray-200 container m-2 hover:bg-blue-100 cursor-pointer"
  >
    <span className="text-2xl">{label}</span>
  </div>
);

const CreateForm = ({ form }) => {
  const [selectedFieldType, setSelectedFieldType] = useState('');
  const addedFields = [
    {
      fieldName: 'PersonName',
    },
  ];
  const typeofFields = [
    {
      label: 'Dropdown List',
    },
    {
      label: 'Text',
    },
    {
      label: 'Moltiline Text',
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

  const addNewField = () => {};
  return (
    <div>
      <span className="text-4xl">Form Fields</span>
      <div>
        <div className="bg-green-300 column-left justify-center rounded-md border-green-1000 border-solid">
          {addedFields.map(({ fieldName }) => (
            <SelectBar label={fieldName} />
          ))}
        </div>
        <div className="bg-green-300 column-right justify-center rounded-md border-green-1000 border-solid">
          {typeofFields.map(({ label }) => (
            <SelectBar
              onClick={type => {
                setSelectedFieldType(type);
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
        onCancel={() => setSelectedFieldType('')}
      >
        <Form>
          <Form.Item label="Field Name" name="field_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateForm;
