import { ChromePicker, CirclePicker } from 'react-color';
import { rgbaObjectToString } from '../utils';

import { colors } from '../types';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      {/* ChromePicker */}
      <div className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
        <ChromePicker
          color={value}
          onChange={(color) => {
            const formattedValue = rgbaObjectToString(color.rgb);
            onChange(formattedValue);
          }}
          className="!bg-transparent"
        />
      </div>

      {/* CirclePicker */}
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
