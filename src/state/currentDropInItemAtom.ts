import { atom } from 'jotai';
import { WidgetTypes } from '../components/Widgets/widgetTypes';

export const currentDropInItemAtom = atom<WidgetTypes | undefined>(undefined);
