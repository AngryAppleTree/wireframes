import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
