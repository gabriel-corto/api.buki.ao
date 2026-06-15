export const generateTeacherId = () => {
  const prefix = 'TEACHER';
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    random += alphabet[randomIndex];
  }

  return `${prefix}-${random}`;
};

export const generateBukiId = () => {
  const prefix = 'BUKI';
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    random += alphabet[randomIndex];
  }

  return `${prefix}-${random}`;
};
