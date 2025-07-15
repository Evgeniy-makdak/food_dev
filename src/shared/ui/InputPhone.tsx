import React from 'react';
import { SVG } from './index';

interface InputPhoneProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPhone: React.FC<InputPhoneProps> = ({ value, onChange }) => {
  return (
    <label>
      <div className="icon">
        <SVG.PhoneIcon fill="#DB3702" />
      </div>
      <div className="field tel">
        <p>Телефон</p>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="+7 (ххх) ххх хх хх"
        />
      </div>
    </label>
  );
};