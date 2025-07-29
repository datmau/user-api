import { suma } from './suma';

describe('Función suma', () => {
  test('suma 1 + 2 para obtener 3', () => {
    // Arrange
    const a = 1;
    const b = 2;
    const resultadoEsperado = 3;
    
    // Act
    const resultado = suma(a, b);
    
    // Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  test('Si ingreso una letra en lugar de un número, debe lanzar un error', () => {
    // Arrange
    const a = 'a' as unknown as number; // Pasamos una letra como parámetro
    const b = 2; // Este sí es un número válido

    // Act & Assert
    expect(() => suma(a, b)).toThrow('Invalid arguments');
  });

  test('Si ambos parámetros son números válidos, debe retornar la suma', () => {
    // Arrange
    const a = 5;
    const b = 3;
    const resultadoEsperado = 8;

    // Act
    const resultado = suma(a, b);

    // Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  test('Si el segundo parámetro es una letra, debe lanzar un error', () => {
    // Arrange
    const a = 5;
    const b = 'xyz' as unknown as number; // Letra en el segundo parámetro

    // Act & Assert
    expect(() => suma(a, b)).toThrow('Invalid arguments');
  });
});
