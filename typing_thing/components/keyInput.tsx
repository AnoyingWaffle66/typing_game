'use client';

import { setPriority } from 'os';
import React, { useState, useEffect } from 'react';

// array of valid characters to capture.
const keys: string[] = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
];

// Props, parameters to pass in
interface KeyProps {
  // lets the function know to start capturing user input
  testStarted: boolean;
  // The current pressed key is stored here to be used elsewhere
  onPress: (pressedKey: string | null) => void;
}

// Handles the input capture
const KeyInput: React.FC<KeyProps> = ({ testStarted, onPress }) => {
  const [currentPressed, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!testStarted) return;


    const onKeyDown = (event: KeyboardEvent) => {
      
      if (keys.includes(event.key)) {
        setCurrent(event.key);
        
      }
      
    };

    const onKeyUp = (event: KeyboardEvent) => {
      setCurrent(null)
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp)

    };
  }, [testStarted, currentPressed]);

  useEffect(() => {
    if (currentPressed) {
      onPress(currentPressed);
    }
  }, [currentPressed]);

  return null;
};

export default KeyInput;
