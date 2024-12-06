import { ChromePicker, CirclePicker } from 'react-color';

import { colors } from '../types';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={() => {}}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(x) => {
          console.log(x);
        }}
        className="border rounded-lg"
      />
    </div>
  );
};
