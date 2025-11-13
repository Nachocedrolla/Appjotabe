import React from 'react';
import Card from './Card';
import ChecklistItem from './ChecklistItem';
import StatusSelect from './StatusSelect';
import ConditionSelect from './ConditionSelect';

interface ChecklistSectionProps {
  title: string;
  items: { id: string; label: string; type?: string }[];
  checklistData: Record<string, string>;
  onChecklistChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  highlightFirst?: boolean;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  title,
  items,
  checklistData,
  onChecklistChange,
  highlightFirst = false,
}) => {
  return (
    <Card title={title}>
      <div className="space-y-3">
        {items.map((item, index) => {
          if (item.type === 'status') {
            return (
              <StatusSelect
                key={item.id}
                id={item.id}
                label={item.label}
                value={checklistData[item.id] || ''}
                onChange={onChecklistChange}
              />
            );
          }
          if (item.type === 'condition') {
            return (
              <ConditionSelect
                key={item.id}
                id={item.id}
                label={item.label}
                value={checklistData[item.id] || ''}
                onChange={onChecklistChange}
              />
            );
          }
          return (
            <ChecklistItem
              key={item.id}
              id={item.id}
              label={item.label}
              selectedValue={checklistData[item.id] || ''}
              onChange={onChecklistChange}
              isHighlighted={highlightFirst && index === 0}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default ChecklistSection;