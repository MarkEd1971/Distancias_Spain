
export interface DistanceData {
  city: string;
  distances: Record<string, number>;
}

export interface CityStats {
  name: string;
  averageDistance: number;
  farthestCity: string;
  farthestDistance: number;
}
