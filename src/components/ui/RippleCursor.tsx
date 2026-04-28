'use client';

import React, { useReducer, useEffect, RefObject } from 'react';

// Define the shape of a ripple object
interface Ripple {
  id: string;
  x: number;
  y: number;
}

// Props for the RippleCursor component
interface RippleCursorProps {
  maxSize?: number; // Maximum size of the ripple
  duration?: number; // Duration of the ripple animation in milliseconds
  blur?: boolean; // Whether the ripple has a blur effect
  containerRef: RefObject<HTMLElement | null>; // Reference to the section container
}

// Type for the reducer's state
type RippleState = Ripple[];

// Type for the reducer's actions
type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string };

// Reducer function
const rippleReducer = (
  state: RippleState,
  action: RippleAction
): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-30); // Limit ripple count
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

// Component definition
const RippleCursor: React.FC<RippleCursorProps> = ({
  maxSize = 150,
  duration = 1000,
  blur = true,
  containerRef,
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);

  // Event handler for mouse movements
  const handleMouseMove = (e: MouseEvent): void => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Only add ripple if mouse is inside the container
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const ripple: Ripple = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      dispatch({ type: 'ADD_RIPPLE', payload: ripple });

      // Remove ripple after the animation duration
      setTimeout(() => {
        dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
      }, duration);
    }
  };

  // Effect to attach and detach the mousemove event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [duration, containerRef]);

  return (
    <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0'>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className='absolute rounded-full bg-primary bg-opacity-20 shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.1)] animate-ripple'
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${maxSize}px`,
            height: `${maxSize}px`,
            animationDuration: `${duration}ms`,
            filter: blur ? 'blur(8px)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;
