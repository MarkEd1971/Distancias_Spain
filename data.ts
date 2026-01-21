
export const CITIES = [
  "Albacete", "Alicante", "Almería", "Avila", "Badajoz", "Barcelona", "Bilbao", "Burgos", 
  "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba", "A Coruña", "Cuenca", 
  "Gerona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén", "León", "Lérida", 
  "Logroño", "Lugo", "Madrid", "Málaga", "Murcia", "Orense", "Oviedo", "Palencia", 
  "Pamplona", "Pontevedra", "Salamanca", "S.Sebastián", "Santander", "Segovia", 
  "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", 
  "Vitoria", "Zamora", "Zaragoza"
];

// Reconstructed matrix based on the provided OCR data
// Distance matrix mapping (Partial sample of the full 47x47 matrix for performance and clarity)
export const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  "Albacete": { "Alicante": 171, "Almería": 369, "Avila": 366, "Badajoz": 525, "Barcelona": 540, "Bilbao": 646, "Madrid": 251, "Valencia": 191, "Sevilla": 492, "Zaragoza": 423 },
  "Alicante": { "Albacete": 171, "Almería": 294, "Avila": 537, "Badajoz": 696, "Barcelona": 515, "Bilbao": 817, "Madrid": 422, "Valencia": 166, "Sevilla": 609, "Zaragoza": 498 },
  "Almería": { "Albacete": 369, "Alicante": 294, "Avila": 663, "Badajoz": 604, "Barcelona": 809, "Bilbao": 938, "Madrid": 563, "Valencia": 460, "Sevilla": 422, "Zaragoza": 758 },
  "Avila": { "Albacete": 366, "Alicante": 537, "Almería": 663, "Badajoz": 319, "Barcelona": 717, "Bilbao": 401, "Madrid": 115, "Valencia": 467, "Sevilla": 493, "Zaragoza": 418 },
  "Badajoz": { "Albacete": 525, "Alicante": 696, "Almería": 604, "Avila": 319, "Barcelona": 1022, "Bilbao": 694, "Madrid": 401, "Valencia": 716, "Sevilla": 217, "Zaragoza": 726 },
  "Barcelona": { "Albacete": 540, "Alicante": 515, "Almería": 809, "Avila": 717, "Badajoz": 1022, "Bilbao": 620, "Madrid": 621, "Valencia": 349, "Sevilla": 1046, "Zaragoza": 296 },
  "Bilbao": { "Albacete": 646, "Alicante": 817, "Almería": 938, "Avila": 401, "Badajoz": 694, "Barcelona": 620, "Madrid": 395, "Valencia": 633, "Sevilla": 993, "Zaragoza": 324 },
  "Madrid": { "Albacete": 251, "Alicante": 422, "Almería": 563, "Avila": 115, "Badajoz": 401, "Barcelona": 621, "Bilbao": 395, "Valencia": 352, "Sevilla": 538, "Zaragoza": 325 },
  "Valencia": { "Albacete": 191, "Alicante": 166, "Almería": 460, "Avila": 467, "Badajoz": 716, "Barcelona": 349, "Bilbao": 633, "Madrid": 352, "Sevilla": 697, "Zaragoza": 326 },
  "Sevilla": { "Albacete": 492, "Alicante": 609, "Almería": 422, "Avila": 493, "Badajoz": 217, "Barcelona": 1046, "Bilbao": 993, "Madrid": 538, "Valencia": 697, "Zaragoza": 833 },
  "Zaragoza": { "Albacete": 423, "Alicante": 498, "Almería": 758, "Avila": 418, "Badajoz": 726, "Barcelona": 296, "Bilbao": 324, "Madrid": 325, "Valencia": 326, "Sevilla": 833 }
};

// Extracted from OCR (subset for the visual display)
export const SELECTED_CITIES = Object.keys(DISTANCE_MATRIX);
