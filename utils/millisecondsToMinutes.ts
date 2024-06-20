export default function millisecondsToMinutesSeconds(milliseconds: number) {
  // Convert milliseconds to seconds
  let totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // Ensure seconds are formatted to two digits
  let formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Return formatted time
  return `${minutes}:${formattedSeconds}`;
}
