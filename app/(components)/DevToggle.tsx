'use client';

import { ChangeEvent, useEffect, useState } from 'react';

const DevToggle = () => {
  const [devOn, setDevOn] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<number>(1);

  useEffect(() => {
    setDevOn(localStorage.getItem('dev') ? true : false);
    const mode = localStorage.getItem('mode');
    if (mode) {
      setSelectedMode(Number(mode));
    } else {
      setSelectedMode(1);
      localStorage.setItem('mode', '1');
    }
  }, []);

  const onDevToggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      localStorage.setItem('dev', '1');
    } else {
      localStorage.removeItem('dev');
    }
    setDevOn(event.target.checked);
  };

  const onModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedMode(Number(event.target.value));
      localStorage.setItem('mode', event.target.value);
    }
  };

  return (
    <div className='flex flex-col gap-2 justify-center'>
      <div className='flex flex-row gap-2 items-center'>
        <input
          className='!h-auto'
          type='checkbox'
          id='dev-toggle'
          aria-label='Toggle for development mode'
          name='dev-toggle'
          checked={devOn}
          onChange={onDevToggle}
        />
        <label htmlFor='dev-toggle'>Dev Mode</label>
      </div>
      {devOn && (
        <fieldset
          id='response-mode'
          className='p-4 bg-white text-black leading-none rounded-lg opacity-50'
        >
          <h2 className='mb-4'>Server Response Mode</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
              <input
                className='!h-auto'
                type='checkbox'
                id='response-success'
                aria-label='Toggle for response success mode'
                name='response-success'
                onChange={onModeChange}
                checked={selectedMode === 1}
                value='1'
              />
              <label htmlFor='response-success'>success</label>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <input
                className='!h-auto'
                type='checkbox'
                id='response-nomatch'
                aria-label='Toggle for response no match mode'
                name='response-nomatch'
                onChange={onModeChange}
                checked={selectedMode === 2}
                value='2'
              />
              <label htmlFor='response-nomatch'>no-match</label>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <input
                className='!h-auto'
                type='checkbox'
                id='response-overload'
                aria-label='Toggle for overloaded mode'
                name='response-overload'
                onChange={onModeChange}
                checked={selectedMode === 3}
                value='3'
              />
              <label htmlFor='response-overload'>overloaded</label>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <input
                className='!h-auto'
                type='checkbox'
                id='response-error'
                aria-label='Toggle for server error mode'
                name='response-error'
                onChange={onModeChange}
                checked={selectedMode === 4}
                value='4'
              />
              <label htmlFor='response-error'>error</label>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default DevToggle;
