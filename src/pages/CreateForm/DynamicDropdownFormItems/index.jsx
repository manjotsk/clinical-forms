import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const DynamicDropdownFormItems = () => {
  const [fields, setFields] = useState({});
  return (
    <>
      {Object.keys(fields).map((key, index) => (
        <>
          <Form.Item label={`Label -${index}`} key={key}>
            <Input />
          </Form.Item>
          <Form.Item label={`Value -${index}`} key={key}>
            <Input />
          </Form.Item>
          <Button
            onClick={() => {
              let a = fields;
              delete a[key];
              setFields({ ...a });
            }}
          >
            -
          </Button>
        </>
      ))}
      <Button
        onClick={() => {
          setFields({
            ...fields,
            [`${Math.random()}`]: {
              keyLabel: '',
              keyValue: '',
              labelLabel: '',
              labelValue: '',
            },
          });
        }}
      >
        +
      </Button>
    </>
  );
};

export default DynamicDropdownFormItems;
