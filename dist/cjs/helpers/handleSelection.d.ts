/// <reference types="lodash" />
import { HandleSelectionOptions, MouseMovePosition } from '../types';
export declare const handleSelection: import("lodash").DebouncedFunc<(elements: HTMLCollection, currPositions: MouseMovePosition, options: HandleSelectionOptions) => void>;
