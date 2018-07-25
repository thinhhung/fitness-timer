export const formatTwoDigitsNumber = number => number < 10 ? `0${number}` : number;

export const milisecondsToSeconds = (miliseconds) => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = (miliseconds / 1000) % 60;
  const seconds100 = (miliseconds / 10) % 100;
  return `${formatTwoDigitsNumber(minutes)}:${formatTwoDigitsNumber(seconds)}.${formatTwoDigitsNumber(seconds100)}`;
};

export const milisecondsToMinutes = (miliseconds) => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = (miliseconds / 1000) % 60;
  return `${formatTwoDigitsNumber(minutes)}:${formatTwoDigitsNumber(seconds)}`;
};
