import React from 'react';

interface ListItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
    className?: string;
    disabled?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
                                                      children,
                                                      onClick,
                                                      isSelected = false,
                                                      className = '',
                                                      disabled = false,
                                                  }) => {
    const baseStyles = 'list-group-item p-2 border-b border-gray-200 last:border-b-0 list-none';
    const selectedStyles = isSelected ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-700';
    const hoverStyles = disabled ? '' : 'hover:bg-gray-100 hover:cursor-pointer';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <li
            className={`${baseStyles} ${selectedStyles} ${hoverStyles} ${disabledStyles} ${className}`}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {children}
        </li>
    );
};