import React from 'react';
import { SVG } from '../../../shared/ui';
// import { SVG } from './index';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputName: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <label>
      <div className="icon">
        <SVG.PersonsIcon color="#DB3702" />
      </div>
      <div className="field">
        <p>Имя</p>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ваше имя"
        />
      </div>
    </label>
  );
};