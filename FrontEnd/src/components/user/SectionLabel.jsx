import React from 'react';

const SectionLabel = ({ label, className = "" }) => {
  return (
    <div className={`px-5 pt-6 pb-3 ${className}`}>
      <div className="flex items-center gap-3">
        <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-orange-400/70">
          {label}
        </p>
        <div className="flex-1 h-px bg-gradient-to-r from-orange-400/20 to-transparent" />
      </div>
    </div>
  );
};

export default SectionLabel;
