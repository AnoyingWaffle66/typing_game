'use client';

import React, { useState } from 'react';
import KeyInput from './keyInput';
import test from 'node:test';

const KeyPressDisplay: React.FC = () => {
  const [typedText, setTypedText] = useState<string>('');
  const [testStarted, setTestStarted] = useState<boolean>(false);

  const handleKeyPress = (key: string | null) => {
    if (key) {
      setTypedText((prevText) => prevText + key);
    }
  };

  const toggleTest = () => {
    if (!testStarted)
    {
      setTestStarted(true);
    }
    else 
    {
      setTestStarted(false);
    }
  };

  return (
    <div>
      <button onClick={toggleTest}>
        {testStarted ? 'Stop Test' : 'Start Test'}
      </button>
      {testStarted && (
        <div>
          <h3>Typed Text:</h3>
          <p>{typedText || 'Start typing...'}</p>
          <KeyInput onPress={handleKeyPress} testStarted={testStarted} />
        </div>
      )}
    </div>
  );
};

export default KeyPressDisplay;
