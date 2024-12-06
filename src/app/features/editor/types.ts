import { fabric } from 'fabric';

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';

export const FILL_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)';

export const CIRCLE_OPT = {
  radius: 150,
  height: 100,
  width: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: 1,
  selectable: true,
  hasControls: true,
};

export type BuildEditorProps = {
  canvas: fabric.Canvas | null;
  // circle: fabric.Circle;
};

export interface Editor {
  addCircle: () => void;
}
