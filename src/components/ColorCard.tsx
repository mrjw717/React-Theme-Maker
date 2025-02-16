import React, { useRef } from 'react';
import { X, Sun, Moon, GripVertical } from 'lucide-react';
import { adjustColor } from '../utils/colorUtils';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

interface ColorCardProps {
  colorName: string;
  colorValue: string;
  onDelete: (colorName: string) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ colorName, colorValue, onDelete, index, moveCard }) => {
  const capitalizedColorName = colorName.charAt(0).toUpperCase() + colorName.slice(1);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id: colorName, type: 'card', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as any).x - hoverBoundingRect.left;
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      // Only allow move when the mouse has crossed half of the items height or width
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      if (dragIndex < hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      className="w-full rounded-md shadow-md border border-gray-300 p-4 relative cursor-grab"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Drag Handle */}
      <div className="absolute top-2 left-2 text-gray-600 p-1 z-10">
        <GripVertical size={20} className="cursor-grab" />
      </div>

      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-1 z-10"
        onClick={() => onDelete(colorName)}
      >
        <X size={16} />
      </button>

      {/* Color Information */}
      <div className="mb-2 grid grid-cols-2 gap-2 pt-6">
        <div className="text-left font-bold">{capitalizedColorName}</div>
        <div className="text-right text-sm">{colorValue}</div>
      </div>

      {/* Core Color */}
      <div
        className="rounded-md flex flex-col justify-center items-center"
        style={{ backgroundColor: colorValue, height: '150px', color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
      >
      </div>

      {/* Gradient Display */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {/* Light Gradient */}
        <div className="flex flex-col">
          <div className="text-center text-sm mb-1">Light Gradient</div>
          <div className="rounded-md flex flex-col justify-center items-center h-24 cursor-pointer" style={{ background: `linear-gradient(to right, ${colorValue}, #FFFFFF)` }}>
          </div>
          <div className="flex items-center justify-between mt-1 text-gray-600 hover:text-gray-800">
            <Sun size={16} className="mr-1" /> Cycle Light
            <span className="text-sm">12/12</span>
          </div>
        </div>

        {/* Dark Gradient */}
        <div className="flex flex-col">
          <div className="text-center text-sm mb-1">Dark Gradient</div>
          <div className="rounded-md flex flex-col justify-center items-center h-24 cursor-pointer" style={{ background: `linear-gradient(to right, ${colorValue}, #000000)` }}>
          </div>
          <div className="flex items-center justify-between mt-1 text-gray-600 hover:text-gray-800">
            <Moon size={16} className="mr-1" /> Cycle Dark
            <span className="text-sm">12/12</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorCard;
