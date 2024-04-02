import React from 'react';

interface ModuleSelectorProps {
  modules: string[];
  onSelect: (selectedOption: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ modules, onSelect }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="">Module</option>
      {modules.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
};

export default ModuleSelector