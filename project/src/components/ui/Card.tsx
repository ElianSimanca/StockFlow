import React from 'react';

interface CardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  className = '', 
  children, 
  icon, 
  footer 
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-lg font-medium text-white">{title}</h3>
          )}
          {icon && (
            <div className="text-[#2E8B57]">{icon}</div>
          )}
        </div>
      )}
      
      <div>{children}</div>
      
      {footer && (
        <div className="mt-4 pt-3 border-t border-[#333333] text-sm text-[#B3B3B3]">
          {footer}
        </div>
      )}
    </div>
  );
};