import laudePointData from "../laude-points.json";

export default function calculateLaudePoints(transcript: string) {
  let points = 0;
  for (const [key, value] of Object.entries(laudePointData)) {
    if (transcript.toLowerCase().includes(key.toLowerCase())) {
      points += value;
    }
  }

  return points;
}
