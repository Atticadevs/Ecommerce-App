import {it ,expect,describe} from 'vitest';
import { formatmoney } from './money';
//test#1
describe('suite:formatmoney',()=>{

it('formats 1999 cents as dollar $19.99',()=>{
  expect(formatmoney(1999)).toBe('$19.99')
});
// test#2
it('displays 2 decimals',()=>{
  expect (formatmoney(1090)).toBe('$10.90');
  expect (formatmoney(100)).toBe('$1.00'); //checks
});

})



