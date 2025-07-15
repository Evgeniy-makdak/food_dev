import React, { useState } from 'react';

import "./ExpandableText.scss"

interface ExpandableTextProps {
  text: string;
  maxLength: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 82 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.slice(0, maxLength) + `${maxLength < text.length ? '...' : ''}`;

  return (
    <div className="expandable-text">
      <p>
        {isExpanded ? text : truncatedText}
      </p>
      {
        maxLength < text.length && (
          <button className="btn--default" onClick={toggleExpansion}>
            <b>

              {isExpanded ? 'скрыть' : 'ещё'}
            </b>
          </button>
        )
      }

    </div>
  );
};

export default ExpandableText;