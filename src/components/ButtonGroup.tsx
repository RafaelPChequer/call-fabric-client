import React from 'react';

interface ButtonGroupProps {
  buttons: { label: string; onClick: () => void; className: string }[];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
      <div className="flex flex-wrap gap-2">
        {buttons.map((btn, index) => (
            <button
                key={index}
                className={`btn ${btn.className}`}
                onClick={btn.onClick}
            >
              {btn.label}
            </button>
        ))}
      </div>
  );
};