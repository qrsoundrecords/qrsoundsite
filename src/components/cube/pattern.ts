/**
 * QR cube geometry helpers — deterministic, seeded per face so every section
 * keeps a stable "broken QR" pattern.
 */

export interface Cell {
  col: number; // 0..N-1
  row: number;
}

export interface FacePattern {
  n: number; // grid size
  cells: Cell[]; // raised blocks ("on" cells)
  finders: Cell[]; // 3 QR finder-block groups rendered always
}

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates an abstract QR-like pattern: three corner finder motifs plus a
 * seeded scatter of blocks (checker-symmetric so it reads as QR code).
 */
export function facePattern(faceIndex: number, n = 13): FacePattern {
  const rnd = mulberry(1013 + faceIndex * 7919);
  const cells: Cell[] = [];

  const finderHomes = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ];

  const inFinder = (c: number, r: number) =>
    finderHomes.some(([ox, oy]) => c >= ox && c < ox + 7 && r >= oy && r < oy + 7);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (inFinder(c, r)) continue;
      // QR data modules: ~46% fill feels right without being noisy
      const p = 0.42 + rnd() * 0.16;
      if (rnd() < p) cells.push({ col: c, row: r });
    }
  }

  return { n, cells, finders: finderHomes.map(([c, r]) => ({ col: c, row: r })) };
}

/** Local XY position of a cell on a face plane (face is size `size`). */
export function cellPosition(cell: Cell, n: number, size: number): [number, number] {
  const step = size / n;
  const x = -size / 2 + step * (cell.col + 0.5);
  const y = size / 2 - step * (cell.row + 0.5);
  return [x, y];
}

/**
 * Quaternion that rotates `faceNormal` to face the camera (0,0,1).
 * Returns the Euler rotation for the group.
 */
export function faceToCameraRotation(face: "front" | "right" | "back" | "left" | "top" | "bottom"): [number, number, number] {
  switch (face) {
    case "front": return [0, 0, 0];
    case "right": return [0, -Math.PI / 2, 0];
    case "back": return [0, Math.PI, 0];
    case "left": return [0, Math.PI / 2, 0];
    case "top": return [Math.PI / 2, 0, 0];
    case "bottom": return [-Math.PI / 2, 0, 0];
  }
}
