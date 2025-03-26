import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Shortcuts from './Shortcuts';

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Shortcuts />);
