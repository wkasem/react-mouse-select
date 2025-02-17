import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { handleSelection } from './helpers/handleSelection';
import { mouseMoveCheckToStart } from './helpers/mouseMoveCheckToStart';
import { initScroll, clearTimer } from './helpers/scroll/';
import { MouseMovePosition, ReactMouseSelectProps } from './types';

let elements: HTMLCollection;
const defaultPositionState: MouseMovePosition = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const ReactMouseSelect = ({
  containerRef,
  sensitivity = 10,
  tolerance = 0,
  portalContainer = document.body,
  edgeSize = 100,
  onClickPreventDefault = false,
  notStartWithSelectableElements = false,
  saveSelectAfterFinish = false,
  itemClassName = 'mouse-select__selectable',
  selectedItemClassName = 'selected',
  frameClassName = 'mouse-select__frame',
  openFrameClassName = 'open',
  startSelectionCallback,
  finishSelectionCallback,
}: ReactMouseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [positions, setPositions] = useState(defaultPositionState);

  const borderRef = useRef<HTMLDivElement | null>(null);
  const myPositionRef = useRef<MouseMovePosition>(positions);
  const isOpenRef = useRef<boolean>(isOpen);

  const handleClick = (e: MouseEvent) => e.stopPropagation();

  const handleMoueMove = (e: MouseEvent) => {
    const { pageX, pageY } = e;
    const newState: Partial<MouseMovePosition> = {};

    if (!isOpenRef.current && mouseMoveCheckToStart(myPositionRef.current, pageX, pageY, sensitivity)) {

      if (onClickPreventDefault) {
        window.addEventListener('click', handleClick, { capture: true, once: true });
      }
      if (startSelectionCallback) startSelectionCallback(e);
      setIsOpen(true);
    }

    if (pageX >= myPositionRef.current.startX) {
      newState.width = pageX - myPositionRef.current.startX;
    } else if (pageX < myPositionRef.current.startX) {
      newState.width = myPositionRef.current.startX - pageX;
      newState.x = pageX;
    }

    if (pageY >= myPositionRef.current.startY) {
      newState.height = pageY - myPositionRef.current.startY;
    } else if (pageY < myPositionRef.current.startY) {
      newState.height = myPositionRef.current.startY - pageY;
      newState.y = pageY;
    }

    handleSelection(
      elements,
      { ...myPositionRef.current, ...newState },
      { tolerance, selectedItemClassName, isOpenRef, saveSelectAfterFinish }
    )
    setPositions((state) => ({ ...state, ...newState }));

    // scroll when approaching the edge
    if (edgeSize > 0) initScroll(e, edgeSize);
  };

  const handleMouseUp = (e: MouseEvent) => {
    setPositions(defaultPositionState);
    if (containerRef && containerRef?.current) containerRef.current.removeEventListener('mousemove', handleMoueMove);
    else document.removeEventListener('mousemove', handleMoueMove);

    window.removeEventListener('mouseup', handleMouseUp);

    if (borderRef.current) borderRef.current.removeEventListener('mousemove', handleMoueMove);

    let selectedElement: Element[] = [];
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];

      if (item.classList.contains(selectedItemClassName)) {
        selectedElement.push(item);
        if (!saveSelectAfterFinish) item.classList.remove(selectedItemClassName)
      }
    }

    if (finishSelectionCallback) finishSelectionCallback(selectedElement, e);
    setIsOpen(false);
    clearTimer();
  };

  const handleMouseDown = (e: MouseEvent) => {
    //  check that only the left mouse button is pressed
    if (e.button !== 0) return null;

    let startSelection: boolean = true;
    if (notStartWithSelectableElements) {
      // @ts-ignore
      const elementInitiator = e.composedPath().find((element) => element?.classList?.contains(itemClassName));
      if (elementInitiator) startSelection = false;
    }

    if (startSelection) {
      elements = document.getElementsByClassName(itemClassName);

      setPositions((state) => ({
        ...state,
        startX: e.pageX,
        startY: e.pageY,
        x: e.pageX,
        y: e.pageY,
      }));

      if (containerRef && containerRef.current) containerRef.current.addEventListener('mousemove', handleMoueMove);
      else document.addEventListener('mousemove', handleMoueMove);

      if (borderRef.current) borderRef.current.addEventListener('mousemove', handleMoueMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  useEffect(() => {
    const element = containerRef?.current;
    if (element) element.addEventListener('mousedown', handleMouseDown);

  }, []);

  useEffect(() => {
    myPositionRef.current = positions;
    isOpenRef.current = isOpen;
  }, [positions, isOpen]);

  const renderEl = () => {
    return (
      <div
        className={`${frameClassName} ${isOpen ? ` ${openFrameClassName}` : ''}`}
        style={{
          position: 'absolute',
          display: `${isOpen ? 'block': 'none'}`,
          top: `${positions.y}px`,
          left: `${positions.x}px`,
          width: `${positions.width}px`,
          height: `${positions.height}px`,
        }}
        ref={borderRef}
      />
    );
  };

  return ReactDOM.createPortal(renderEl(), portalContainer)
};
