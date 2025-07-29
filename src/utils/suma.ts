export function suma(a: number, b: number): number {
  // Validar que ambos parámetros sean números
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Invalid arguments');
  }
  
  return a + b;
}