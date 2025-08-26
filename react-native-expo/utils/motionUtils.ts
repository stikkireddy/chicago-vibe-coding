/**
 * Determine movement description based on gyroscope data
 */
export function getMovementDescription(x: number, y: number, z: number): string {
  const threshold = 0.5;
  let movements: string[] = [];

  if (Math.abs(x) > threshold) {
    movements.push(x > 0 ? 'tilting_forward' : 'tilting_backward');
  }
  if (Math.abs(y) > threshold) {
    movements.push(y > 0 ? 'rolling_right' : 'rolling_left');
  }
  if (Math.abs(z) > threshold) {
    movements.push(z > 0 ? 'turning_right' : 'turning_left');
  }

  return movements.length > 0 ? movements.join('_') : 'stable';
}

/**
 * Calculate movement intensity based on gyroscope magnitude
 */
export function getMovementIntensity(x: number, y: number, z: number): 'low' | 'medium' | 'high' {
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  
  if (magnitude < 0.5) return 'low';
  if (magnitude < 2.0) return 'medium';
  return 'high';
}