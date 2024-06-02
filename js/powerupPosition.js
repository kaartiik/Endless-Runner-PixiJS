export function POWERUPS(
  grid,
  powerupAlicia,
  powerupBakar,
  powerupComot,
  powerupJet,
  powerupZass
) {
  const powerupsArr = [
    {
      x: grid.matrix[4][5].x,
      y: grid.matrix[4][5].y,
      type: "Alicia_Jet_PU",
      transform: () => powerupAlicia(),
    },
    {
      x: grid.matrix[4][5].x,
      y: grid.matrix[4][5].y,
      type: "Alicia_Jet_PU",
      transform: () => powerupJet(),
    },
    {
      x: grid.matrix[4][5].x,
      y: grid.matrix[4][5].y,
      type: "Bakar_PU",
      transform: () => powerupBakar(),
    },
    {
      x: grid.matrix[4][5].x,
      y: grid.matrix[4][5].y,
      type: "Comot_PU",
      transform: () => powerupComot(),
    },
    {
      x: grid.matrix[4][5].x,
      y: grid.matrix[4][5].y,
      type: "Zass_PU",
      transform: () => powerupZass(),
    },
  ];

  return powerupsArr;
}
