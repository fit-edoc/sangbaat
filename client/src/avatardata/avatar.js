

 const generateRandomName = () => Math.random().toString(36).substring(2, 10);


export const avatars = Array.from({ length: 10 }, (_, i) => ({
  avatar: `/images/${i + 1}.png`,
  name:`${generateRandomName()}`
}));


