import React, { useState, useCallback } from 'react';
import ColorCard from './components/ColorCard';
import { getColorName } from './utils/colorNameFinder';
import { ChromePicker } from 'react-color';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [newColorsText, setNewColorsText] = useState('');
  const [customColors, setCustomColors] = useState(() => {
    const storedColors = localStorage.getItem('customColors');
    return storedColors ? JSON.parse(storedColors) : {};
  });
  const [showColors, setShowColors] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewColorsText(event.target.value);
  };

  const importColors = () => {
    const colorLines = newColorsText.split('\n').map(line => line.trim()).filter(line => line !== '');
    const newColors: { [key: string]: string } = {}; // Specify the type of newColors
    colorLines.forEach(colorValue => {
      const normalizedColorValue = colorValue.startsWith('#') ? colorValue : '#' + colorValue;
      let colorName = getColorName(normalizedColorValue);

      // Ensure unique color names
      let i = 1;
      let originalColorName = colorName;
      while (newColors[colorName]) {
        colorName = `${originalColorName} ${i}`;
        i++;
      }

      newColors[colorName] = normalizedColorValue;
    });
    setCustomColors(newColors);
    setShowColors(true);
    setNewColorsText('');
  };

  const deleteColor = (colorName: string) => {
    const { [colorName]: deletedColor, ...remainingColors } = customColors;
    setCustomColors(remainingColors);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const addSelectedColor = () => {
    const colorName = getColorName(selectedColor);
    setCustomColors(prevColors => ({
      ...prevColors,
      [colorName]: selectedColor,
    }));
    setShowColorPicker(false);
    setShowColors(true);
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCustomColors((prevColors) => {
      const colorArray = Object.entries(prevColors);
      const dragCard = colorArray[dragIndex];

      const newColorsArray = [...colorArray];
      newColorsArray.splice(dragIndex, 1);
      newColorsArray.splice(hoverIndex, 0, dragCard);

      const newColors = Object.fromEntries(newColorsArray);
      return newColors;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex font-sans">
        {/* Sidebar */}
        <div className="w-64 p-4 bg-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Import Colors</h2>
          <div className="mb-2">
            <label htmlFor="colorText" className="block text-gray-700 text-sm font-bold mb-2">
              Enter colors (one per line):
            </label>
            <textarea
              id="colorText"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
            value={newColorsText}
            onChange={handleTextChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={importColors}
        >
          Import Colors
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Core Color Palette</h1>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setShowColorPicker(true)}
            >
              Add Color
            </button>
          </div>

          {showColorPicker && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <ChromePicker color={selectedColor} onChange={handleColorChange} />
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                    onClick={() => setShowColorPicker(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={addSelectedColor}
                  >
                    Add Color
                  </button>
                </div>
              </div>
            </div>
          )}

          {showColors && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(customColors).map(([colorName, colorValue], index) => (
                  <div key={colorName} style={{ border: '3px dashed lightgray', padding: '0.5rem', borderRadius: '0.5rem', position: 'relative' }}>
                    <ColorCard
                      colorName={colorName}
                      colorValue={colorValue}
                      onDelete={deleteColor}
                      index={index}
                      moveCard={moveCard}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </DndProvider>
  );
}

export default App;
