'use client';

import { isAbsolute } from 'path';
import React, { useState, useEffect } from 'react';

// array of valid characters to capture.
const keys: string[] = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', 'Backspace'
];

// Props, parameters to pass in
interface KeyProps {
  // The current pressed key is passed here to be used elsewhere/ does function stuff. Callback function
  onPress: (pressedKey: string | null) => void;
}

// Handles the input capture
const KeyInput: React.FC<KeyProps> = ({ onPress}) => {
  const [currentPressed, setCurrent] = useState<string | null>(null);

  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // is called when any key is pressed
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isActive) {
        setIsActive(true);
      }

      // if the key the user has pressed gives a valid character the char will be captured.
      if (keys.includes(event.key) && !event.repeat) {
        setCurrent(event.key);
      }
    };

    // is called when the user lets go of the key. Needs this because without it if the user presses the same key multiple
    // times in a row it won't update the user string.
    const onKeyUp = (event: KeyboardEvent) => {
      setCurrent(null)
    }

    // adds event listeners where they detect the keyboard events so that the above functions are called.
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp)
    return () => {
      // Removes the listners when the useEffect is no longer needed. I honestly don't know if this is actually used.
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp)

    };
    // Dependency. This is to tell the useEffect when to update or rerender.
  }, [currentPressed, count]);

  useEffect(() => {
    if (count > 60) return;

    if (currentPressed) {
      // gives the user entered key/character to the onPress function to use for test.
      onPress(currentPressed);
      setCurrent(null);
    }
  }, [currentPressed, count]);

  useEffect(() => {
    if (isActive) {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }
  }, [isActive, count]);

  // returns null because this function does not update the ui directly.
  return null;
};

export default KeyInput;
