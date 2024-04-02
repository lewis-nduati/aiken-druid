import React from 'react';

interface ModuleSelectorProps {
  scripts: string[];
  onSelect: (selectedOption: string) => void;
}

const ScriptSelector: React.FC<ModuleSelectorProps> = ({ scripts, onSelect }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="">Script</option>
      {scripts.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default ScriptSelector