import React, { useState } from 'react';
import './Accordion.scss';
import { SVG } from '../svg/SVG';

interface AccordionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="title">
          {icon && <div className="icon">{icon}</div>}
          <span>{title}</span>
        </div>

        <div className="rotete-270"><SVG.ArrowIcon size='24' /></div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;