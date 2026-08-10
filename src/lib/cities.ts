export type City = {
  id: string
  name: string
  timeZone: string
  country?: string
}

/** Popular places with nicer display names (can share a timezone). */
const FRIENDLY_CITIES: City[] = [
  // Europe
  { id: 'london', name: 'London', timeZone: 'Europe/London', country: 'United Kingdom' },
  { id: 'manchester', name: 'Manchester', timeZone: 'Europe/London', country: 'United Kingdom' },
  { id: 'edinburgh', name: 'Edinburgh', timeZone: 'Europe/London', country: 'United Kingdom' },
  { id: 'dublin', name: 'Dublin', timeZone: 'Europe/Dublin', country: 'Ireland' },
  { id: 'paris', name: 'Paris', timeZone: 'Europe/Paris', country: 'France' },
  { id: 'lyon', name: 'Lyon', timeZone: 'Europe/Paris', country: 'France' },
  { id: 'marseille', name: 'Marseille', timeZone: 'Europe/Paris', country: 'France' },
  { id: 'berlin', name: 'Berlin', timeZone: 'Europe/Berlin', country: 'Germany' },
  { id: 'munich', name: 'Munich', timeZone: 'Europe/Berlin', country: 'Germany' },
  { id: 'hamburg', name: 'Hamburg', timeZone: 'Europe/Berlin', country: 'Germany' },
  { id: 'frankfurt', name: 'Frankfurt', timeZone: 'Europe/Berlin', country: 'Germany' },
  { id: 'amsterdam', name: 'Amsterdam', timeZone: 'Europe/Amsterdam', country: 'Netherlands' },
  { id: 'rotterdam', name: 'Rotterdam', timeZone: 'Europe/Amsterdam', country: 'Netherlands' },
  { id: 'brussels', name: 'Brussels', timeZone: 'Europe/Brussels', country: 'Belgium' },
  { id: 'luxembourg', name: 'Luxembourg', timeZone: 'Europe/Luxembourg', country: 'Luxembourg' },
  { id: 'zurich', name: 'Zurich', timeZone: 'Europe/Zurich', country: 'Switzerland' },
  { id: 'geneva', name: 'Geneva', timeZone: 'Europe/Zurich', country: 'Switzerland' },
  { id: 'vienna', name: 'Vienna', timeZone: 'Europe/Vienna', country: 'Austria' },
  { id: 'prague', name: 'Prague', timeZone: 'Europe/Prague', country: 'Czechia' },
  { id: 'budapest', name: 'Budapest', timeZone: 'Europe/Budapest', country: 'Hungary' },
  { id: 'warsaw', name: 'Warsaw', timeZone: 'Europe/Warsaw', country: 'Poland' },
  { id: 'krakow', name: 'Kraków', timeZone: 'Europe/Warsaw', country: 'Poland' },
  { id: 'kyiv', name: 'Kyiv', timeZone: 'Europe/Kyiv', country: 'Ukraine' },
  { id: 'bucharest', name: 'Bucharest', timeZone: 'Europe/Bucharest', country: 'Romania' },
  { id: 'sofia', name: 'Sofia', timeZone: 'Europe/Sofia', country: 'Bulgaria' },
  { id: 'athens', name: 'Athens', timeZone: 'Europe/Athens', country: 'Greece' },
  { id: 'istanbul', name: 'Istanbul', timeZone: 'Europe/Istanbul', country: 'Turkey' },
  { id: 'ankara', name: 'Ankara', timeZone: 'Europe/Istanbul', country: 'Turkey' },
  { id: 'helsinki', name: 'Helsinki', timeZone: 'Europe/Helsinki', country: 'Finland' },
  { id: 'stockholm', name: 'Stockholm', timeZone: 'Europe/Stockholm', country: 'Sweden' },
  { id: 'oslo', name: 'Oslo', timeZone: 'Europe/Oslo', country: 'Norway' },
  { id: 'copenhagen', name: 'Copenhagen', timeZone: 'Europe/Copenhagen', country: 'Denmark' },
  { id: 'reykjavik', name: 'Reykjavik', timeZone: 'Atlantic/Reykjavik', country: 'Iceland' },
  { id: 'lisbon', name: 'Lisbon', timeZone: 'Europe/Lisbon', country: 'Portugal' },
  { id: 'madrid', name: 'Madrid', timeZone: 'Europe/Madrid', country: 'Spain' },
  { id: 'barcelona', name: 'Barcelona', timeZone: 'Europe/Madrid', country: 'Spain' },
  { id: 'rome', name: 'Rome', timeZone: 'Europe/Rome', country: 'Italy' },
  { id: 'milan', name: 'Milan', timeZone: 'Europe/Rome', country: 'Italy' },
  { id: 'naples', name: 'Naples', timeZone: 'Europe/Rome', country: 'Italy' },
  { id: 'moscow', name: 'Moscow', timeZone: 'Europe/Moscow', country: 'Russia' },
  { id: 'saint-petersburg', name: 'Saint Petersburg', timeZone: 'Europe/Moscow', country: 'Russia' },
  { id: 'belgrade', name: 'Belgrade', timeZone: 'Europe/Belgrade', country: 'Serbia' },
  { id: 'zagreb', name: 'Zagreb', timeZone: 'Europe/Zagreb', country: 'Croatia' },
  { id: 'sarajevo', name: 'Sarajevo', timeZone: 'Europe/Sarajevo', country: 'Bosnia' },
  { id: 'skopje', name: 'Skopje', timeZone: 'Europe/Skopje', country: 'North Macedonia' },
  { id: 'tirane', name: 'Tirana', timeZone: 'Europe/Tirane', country: 'Albania' },
  { id: 'riga', name: 'Riga', timeZone: 'Europe/Riga', country: 'Latvia' },
  { id: 'tallinn', name: 'Tallinn', timeZone: 'Europe/Tallinn', country: 'Estonia' },
  { id: 'vilnius', name: 'Vilnius', timeZone: 'Europe/Vilnius', country: 'Lithuania' },
  { id: 'minsk', name: 'Minsk', timeZone: 'Europe/Minsk', country: 'Belarus' },
  { id: 'chisinau', name: 'Chișinău', timeZone: 'Europe/Chisinau', country: 'Moldova' },
  { id: 'malta', name: 'Valletta', timeZone: 'Europe/Malta', country: 'Malta' },
  { id: 'nicosia', name: 'Nicosia', timeZone: 'Asia/Nicosia', country: 'Cyprus' },

  // Middle East & Central Asia
  { id: 'dubai', name: 'Dubai', timeZone: 'Asia/Dubai', country: 'UAE' },
  { id: 'abu-dhabi', name: 'Abu Dhabi', timeZone: 'Asia/Dubai', country: 'UAE' },
  { id: 'doha', name: 'Doha', timeZone: 'Asia/Qatar', country: 'Qatar' },
  { id: 'riyadh', name: 'Riyadh', timeZone: 'Asia/Riyadh', country: 'Saudi Arabia' },
  { id: 'jeddah', name: 'Jeddah', timeZone: 'Asia/Riyadh', country: 'Saudi Arabia' },
  { id: 'kuwait', name: 'Kuwait City', timeZone: 'Asia/Kuwait', country: 'Kuwait' },
  { id: 'manama', name: 'Manama', timeZone: 'Asia/Bahrain', country: 'Bahrain' },
  { id: 'muscat', name: 'Muscat', timeZone: 'Asia/Muscat', country: 'Oman' },
  { id: 'tehran', name: 'Tehran', timeZone: 'Asia/Tehran', country: 'Iran' },
  { id: 'baghdad', name: 'Baghdad', timeZone: 'Asia/Baghdad', country: 'Iraq' },
  { id: 'beirut', name: 'Beirut', timeZone: 'Asia/Beirut', country: 'Lebanon' },
  { id: 'amman', name: 'Amman', timeZone: 'Asia/Amman', country: 'Jordan' },
  { id: 'jerusalem', name: 'Jerusalem', timeZone: 'Asia/Jerusalem', country: 'Israel' },
  { id: 'tel-aviv', name: 'Tel Aviv', timeZone: 'Asia/Jerusalem', country: 'Israel' },
  { id: 'tashkent', name: 'Tashkent', timeZone: 'Asia/Tashkent', country: 'Uzbekistan' },
  { id: 'almaty', name: 'Almaty', timeZone: 'Asia/Almaty', country: 'Kazakhstan' },
  { id: 'astana', name: 'Astana', timeZone: 'Asia/Almaty', country: 'Kazakhstan' },
  { id: 'baku', name: 'Baku', timeZone: 'Asia/Baku', country: 'Azerbaijan' },
  { id: 'tbilisi', name: 'Tbilisi', timeZone: 'Asia/Tbilisi', country: 'Georgia' },
  { id: 'yerevan', name: 'Yerevan', timeZone: 'Asia/Yerevan', country: 'Armenia' },
  { id: 'kabul', name: 'Kabul', timeZone: 'Asia/Kabul', country: 'Afghanistan' },

  // South Asia
  { id: 'new-delhi', name: 'New Delhi', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'mumbai', name: 'Mumbai', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'bengaluru', name: 'Bengaluru', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'hyderabad', name: 'Hyderabad', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'chennai', name: 'Chennai', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'kolkata', name: 'Kolkata', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'pune', name: 'Pune', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'ahmedabad', name: 'Ahmedabad', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'jaipur', name: 'Jaipur', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'kochi', name: 'Kochi', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'chandigarh', name: 'Chandigarh', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'gurgaon', name: 'Gurugram', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'noida', name: 'Noida', timeZone: 'Asia/Kolkata', country: 'India' },
  { id: 'karachi', name: 'Karachi', timeZone: 'Asia/Karachi', country: 'Pakistan' },
  { id: 'lahore', name: 'Lahore', timeZone: 'Asia/Karachi', country: 'Pakistan' },
  { id: 'islamabad', name: 'Islamabad', timeZone: 'Asia/Karachi', country: 'Pakistan' },
  { id: 'dhaka', name: 'Dhaka', timeZone: 'Asia/Dhaka', country: 'Bangladesh' },
  { id: 'colombo', name: 'Colombo', timeZone: 'Asia/Colombo', country: 'Sri Lanka' },
  { id: 'kathmandu', name: 'Kathmandu', timeZone: 'Asia/Kathmandu', country: 'Nepal' },
  { id: 'thimphu', name: 'Thimphu', timeZone: 'Asia/Thimphu', country: 'Bhutan' },
  { id: 'male', name: 'Malé', timeZone: 'Indian/Maldives', country: 'Maldives' },

  // East & Southeast Asia
  { id: 'tokyo', name: 'Tokyo', timeZone: 'Asia/Tokyo', country: 'Japan' },
  { id: 'osaka', name: 'Osaka', timeZone: 'Asia/Tokyo', country: 'Japan' },
  { id: 'kyoto', name: 'Kyoto', timeZone: 'Asia/Tokyo', country: 'Japan' },
  { id: 'seoul', name: 'Seoul', timeZone: 'Asia/Seoul', country: 'South Korea' },
  { id: 'busan', name: 'Busan', timeZone: 'Asia/Seoul', country: 'South Korea' },
  { id: 'beijing', name: 'Beijing', timeZone: 'Asia/Shanghai', country: 'China' },
  { id: 'shanghai', name: 'Shanghai', timeZone: 'Asia/Shanghai', country: 'China' },
  { id: 'guangzhou', name: 'Guangzhou', timeZone: 'Asia/Shanghai', country: 'China' },
  { id: 'shenzhen', name: 'Shenzhen', timeZone: 'Asia/Shanghai', country: 'China' },
  { id: 'chengdu', name: 'Chengdu', timeZone: 'Asia/Shanghai', country: 'China' },
  { id: 'hong-kong', name: 'Hong Kong', timeZone: 'Asia/Hong_Kong', country: 'China' },
  { id: 'macau', name: 'Macau', timeZone: 'Asia/Macau', country: 'China' },
  { id: 'taipei', name: 'Taipei', timeZone: 'Asia/Taipei', country: 'Taiwan' },
  { id: 'singapore', name: 'Singapore', timeZone: 'Asia/Singapore', country: 'Singapore' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur', country: 'Malaysia' },
  { id: 'jakarta', name: 'Jakarta', timeZone: 'Asia/Jakarta', country: 'Indonesia' },
  { id: 'bali', name: 'Denpasar', timeZone: 'Asia/Makassar', country: 'Indonesia' },
  { id: 'bangkok', name: 'Bangkok', timeZone: 'Asia/Bangkok', country: 'Thailand' },
  { id: 'ho-chi-minh', name: 'Ho Chi Minh City', timeZone: 'Asia/Ho_Chi_Minh', country: 'Vietnam' },
  { id: 'hanoi', name: 'Hanoi', timeZone: 'Asia/Ho_Chi_Minh', country: 'Vietnam' },
  { id: 'manila', name: 'Manila', timeZone: 'Asia/Manila', country: 'Philippines' },
  { id: 'cebu', name: 'Cebu', timeZone: 'Asia/Manila', country: 'Philippines' },
  { id: 'phnom-penh', name: 'Phnom Penh', timeZone: 'Asia/Phnom_Penh', country: 'Cambodia' },
  { id: 'vientiane', name: 'Vientiane', timeZone: 'Asia/Vientiane', country: 'Laos' },
  { id: 'yangon', name: 'Yangon', timeZone: 'Asia/Yangon', country: 'Myanmar' },
  { id: 'ulaanbaatar', name: 'Ulaanbaatar', timeZone: 'Asia/Ulaanbaatar', country: 'Mongolia' },

  // Oceania
  { id: 'sydney', name: 'Sydney', timeZone: 'Australia/Sydney', country: 'Australia' },
  { id: 'melbourne', name: 'Melbourne', timeZone: 'Australia/Melbourne', country: 'Australia' },
  { id: 'brisbane', name: 'Brisbane', timeZone: 'Australia/Brisbane', country: 'Australia' },
  { id: 'perth', name: 'Perth', timeZone: 'Australia/Perth', country: 'Australia' },
  { id: 'adelaide', name: 'Adelaide', timeZone: 'Australia/Adelaide', country: 'Australia' },
  { id: 'canberra', name: 'Canberra', timeZone: 'Australia/Sydney', country: 'Australia' },
  { id: 'hobart', name: 'Hobart', timeZone: 'Australia/Hobart', country: 'Australia' },
  { id: 'auckland', name: 'Auckland', timeZone: 'Pacific/Auckland', country: 'New Zealand' },
  { id: 'wellington', name: 'Wellington', timeZone: 'Pacific/Auckland', country: 'New Zealand' },
  { id: 'christchurch', name: 'Christchurch', timeZone: 'Pacific/Auckland', country: 'New Zealand' },
  { id: 'fiji', name: 'Suva', timeZone: 'Pacific/Fiji', country: 'Fiji' },
  { id: 'honolulu', name: 'Honolulu', timeZone: 'Pacific/Honolulu', country: 'USA' },
  { id: 'guam', name: 'Hagåtña', timeZone: 'Pacific/Guam', country: 'Guam' },

  // Africa
  { id: 'cairo', name: 'Cairo', timeZone: 'Africa/Cairo', country: 'Egypt' },
  { id: 'alexandria', name: 'Alexandria', timeZone: 'Africa/Cairo', country: 'Egypt' },
  { id: 'lagos', name: 'Lagos', timeZone: 'Africa/Lagos', country: 'Nigeria' },
  { id: 'abuja', name: 'Abuja', timeZone: 'Africa/Lagos', country: 'Nigeria' },
  { id: 'nairobi', name: 'Nairobi', timeZone: 'Africa/Nairobi', country: 'Kenya' },
  { id: 'johannesburg', name: 'Johannesburg', timeZone: 'Africa/Johannesburg', country: 'South Africa' },
  { id: 'cape-town', name: 'Cape Town', timeZone: 'Africa/Johannesburg', country: 'South Africa' },
  { id: 'durban', name: 'Durban', timeZone: 'Africa/Johannesburg', country: 'South Africa' },
  { id: 'casablanca', name: 'Casablanca', timeZone: 'Africa/Casablanca', country: 'Morocco' },
  { id: 'rabat', name: 'Rabat', timeZone: 'Africa/Casablanca', country: 'Morocco' },
  { id: 'algiers', name: 'Algiers', timeZone: 'Africa/Algiers', country: 'Algeria' },
  { id: 'tunis', name: 'Tunis', timeZone: 'Africa/Tunis', country: 'Tunisia' },
  { id: 'addis-ababa', name: 'Addis Ababa', timeZone: 'Africa/Addis_Ababa', country: 'Ethiopia' },
  { id: 'accra', name: 'Accra', timeZone: 'Africa/Accra', country: 'Ghana' },
  { id: 'dakar', name: 'Dakar', timeZone: 'Africa/Dakar', country: 'Senegal' },
  { id: 'abidjan', name: 'Abidjan', timeZone: 'Africa/Abidjan', country: "Côte d'Ivoire" },
  { id: 'dar-es-salaam', name: 'Dar es Salaam', timeZone: 'Africa/Dar_es_Salaam', country: 'Tanzania' },
  { id: 'kampala', name: 'Kampala', timeZone: 'Africa/Kampala', country: 'Uganda' },
  { id: 'kigali', name: 'Kigali', timeZone: 'Africa/Kigali', country: 'Rwanda' },
  { id: 'lusaka', name: 'Lusaka', timeZone: 'Africa/Lusaka', country: 'Zambia' },
  { id: 'harare', name: 'Harare', timeZone: 'Africa/Harare', country: 'Zimbabwe' },
  { id: 'maputo', name: 'Maputo', timeZone: 'Africa/Maputo', country: 'Mozambique' },
  { id: 'port-louis', name: 'Port Louis', timeZone: 'Indian/Mauritius', country: 'Mauritius' },

  // North America
  { id: 'new-york', name: 'New York', timeZone: 'America/New_York', country: 'USA' },
  { id: 'boston', name: 'Boston', timeZone: 'America/New_York', country: 'USA' },
  { id: 'philadelphia', name: 'Philadelphia', timeZone: 'America/New_York', country: 'USA' },
  { id: 'washington-dc', name: 'Washington, D.C.', timeZone: 'America/New_York', country: 'USA' },
  { id: 'miami', name: 'Miami', timeZone: 'America/New_York', country: 'USA' },
  { id: 'atlanta', name: 'Atlanta', timeZone: 'America/New_York', country: 'USA' },
  { id: 'charlotte', name: 'Charlotte', timeZone: 'America/New_York', country: 'USA' },
  { id: 'detroit', name: 'Detroit', timeZone: 'America/Detroit', country: 'USA' },
  { id: 'chicago', name: 'Chicago', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'dallas', name: 'Dallas', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'houston', name: 'Houston', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'austin', name: 'Austin', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'minneapolis', name: 'Minneapolis', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'nashville', name: 'Nashville', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'new-orleans', name: 'New Orleans', timeZone: 'America/Chicago', country: 'USA' },
  { id: 'denver', name: 'Denver', timeZone: 'America/Denver', country: 'USA' },
  { id: 'salt-lake-city', name: 'Salt Lake City', timeZone: 'America/Denver', country: 'USA' },
  { id: 'phoenix', name: 'Phoenix', timeZone: 'America/Phoenix', country: 'USA' },
  { id: 'los-angeles', name: 'Los Angeles', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'san-francisco', name: 'San Francisco', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'san-diego', name: 'San Diego', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'seattle', name: 'Seattle', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'portland', name: 'Portland', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'las-vegas', name: 'Las Vegas', timeZone: 'America/Los_Angeles', country: 'USA' },
  { id: 'anchorage', name: 'Anchorage', timeZone: 'America/Anchorage', country: 'USA' },
  { id: 'toronto', name: 'Toronto', timeZone: 'America/Toronto', country: 'Canada' },
  { id: 'montreal', name: 'Montreal', timeZone: 'America/Toronto', country: 'Canada' },
  { id: 'ottawa', name: 'Ottawa', timeZone: 'America/Toronto', country: 'Canada' },
  { id: 'vancouver', name: 'Vancouver', timeZone: 'America/Vancouver', country: 'Canada' },
  { id: 'calgary', name: 'Calgary', timeZone: 'America/Edmonton', country: 'Canada' },
  { id: 'edmonton', name: 'Edmonton', timeZone: 'America/Edmonton', country: 'Canada' },
  { id: 'winnipeg', name: 'Winnipeg', timeZone: 'America/Winnipeg', country: 'Canada' },
  { id: 'halifax', name: 'Halifax', timeZone: 'America/Halifax', country: 'Canada' },
  { id: 'mexico-city', name: 'Mexico City', timeZone: 'America/Mexico_City', country: 'Mexico' },
  { id: 'guadalajara', name: 'Guadalajara', timeZone: 'America/Mexico_City', country: 'Mexico' },
  { id: 'monterrey', name: 'Monterrey', timeZone: 'America/Monterrey', country: 'Mexico' },
  { id: 'cancun', name: 'Cancún', timeZone: 'America/Cancun', country: 'Mexico' },
  { id: 'tijuana', name: 'Tijuana', timeZone: 'America/Tijuana', country: 'Mexico' },
  { id: 'havana', name: 'Havana', timeZone: 'America/Havana', country: 'Cuba' },
  { id: 'kingston-jm', name: 'Kingston', timeZone: 'America/Jamaica', country: 'Jamaica' },
  { id: 'panama-city', name: 'Panama City', timeZone: 'America/Panama', country: 'Panama' },
  { id: 'san-jose-cr', name: 'San José', timeZone: 'America/Costa_Rica', country: 'Costa Rica' },
  { id: 'guatemala-city', name: 'Guatemala City', timeZone: 'America/Guatemala', country: 'Guatemala' },

  // South America
  { id: 'sao-paulo', name: 'São Paulo', timeZone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'rio', name: 'Rio de Janeiro', timeZone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'brasilia', name: 'Brasília', timeZone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'manaus', name: 'Manaus', timeZone: 'America/Manaus', country: 'Brazil' },
  { id: 'buenos-aires', name: 'Buenos Aires', timeZone: 'America/Argentina/Buenos_Aires', country: 'Argentina' },
  { id: 'cordoba-ar', name: 'Córdoba', timeZone: 'America/Argentina/Cordoba', country: 'Argentina' },
  { id: 'santiago', name: 'Santiago', timeZone: 'America/Santiago', country: 'Chile' },
  { id: 'lima', name: 'Lima', timeZone: 'America/Lima', country: 'Peru' },
  { id: 'bogota', name: 'Bogotá', timeZone: 'America/Bogota', country: 'Colombia' },
  { id: 'medellin', name: 'Medellín', timeZone: 'America/Bogota', country: 'Colombia' },
  { id: 'quito', name: 'Quito', timeZone: 'America/Guayaquil', country: 'Ecuador' },
  { id: 'caracas', name: 'Caracas', timeZone: 'America/Caracas', country: 'Venezuela' },
  { id: 'montevideo', name: 'Montevideo', timeZone: 'America/Montevideo', country: 'Uruguay' },
  { id: 'asuncion', name: 'Asunción', timeZone: 'America/Asuncion', country: 'Paraguay' },
  { id: 'la-paz', name: 'La Paz', timeZone: 'America/La_Paz', country: 'Bolivia' },
]

function titleFromZone(timeZone: string): string {
  const leaf = timeZone.split('/').pop() ?? timeZone
  return leaf.replaceAll('_', ' ').replaceAll('-', ' ')
}

function regionFromZone(timeZone: string): string | undefined {
  const region = timeZone.split('/')[0]
  const map: Record<string, string> = {
    Africa: 'Africa',
    America: 'Americas',
    Antarctica: 'Antarctica',
    Arctic: 'Arctic',
    Asia: 'Asia',
    Atlantic: 'Atlantic',
    Australia: 'Australia',
    Europe: 'Europe',
    Indian: 'Indian Ocean',
    Pacific: 'Pacific',
  }
  return map[region]
}

function buildCatalog(): City[] {
  const byId = new Map<string, City>()

  for (const city of FRIENDLY_CITIES) {
    byId.set(city.id, city)
  }

  // Fill gaps from every IANA zone the runtime knows (~400+).
  try {
    const zones =
      typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl
        ? (Intl as typeof Intl & { supportedValuesOf(key: string): string[] }).supportedValuesOf(
            'timeZone',
          )
        : []

    for (const timeZone of zones) {
      if (timeZone.startsWith('Etc/')) continue
      const id = timeZone.toLowerCase().replaceAll('/', '-').replaceAll('_', '-')
      if (byId.has(id)) continue
      // Skip if a friendly city already owns this exact zone as primary listing? Keep both —
      // friendly cities use custom ids; zone-derived fill missing places only.
      const alreadyNamed = [...byId.values()].some(
        (c) => c.timeZone === timeZone && c.name === titleFromZone(timeZone),
      )
      if (alreadyNamed) continue
      byId.set(id, {
        id,
        name: titleFromZone(timeZone),
        timeZone,
        country: regionFromZone(timeZone),
      })
    }
  } catch {
    // Older runtimes without supportedValuesOf — friendly list alone is fine.
  }

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export const CITY_CATALOG: City[] = buildCatalog()

const TZ_ALIASES: Record<string, string> = {
  'Asia/Calcutta': 'Asia/Kolkata',
  'Asia/Katmandu': 'Asia/Kathmandu',
  'America/Indianapolis': 'America/Indiana/Indianapolis',
  'US/Pacific': 'America/Los_Angeles',
  'US/Eastern': 'America/New_York',
  'US/Central': 'America/Chicago',
  'US/Mountain': 'America/Denver',
}

const TZ_HOME_PREFERENCE: Record<string, string> = {
  'Asia/Kolkata': 'new-delhi',
  'America/Los_Angeles': 'san-francisco',
  'Europe/Warsaw': 'warsaw',
  'Europe/Kyiv': 'kyiv',
}

export function detectHomeCity(): City {
  const raw = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tz = TZ_ALIASES[raw] ?? raw
  const preferredId = TZ_HOME_PREFERENCE[tz]
  if (preferredId) {
    const preferred = CITY_CATALOG.find((c) => c.id === preferredId)
    if (preferred) return preferred
  }
  const match = CITY_CATALOG.find((c) => c.timeZone === tz)
  if (match) return match
  const name = tz.split('/').pop()?.replaceAll('_', ' ') ?? 'Local'
  return {
    id: `local-${tz}`,
    name,
    timeZone: tz,
  }
}

export function defaultCities(home: City): City[] {
  const preferred = ['san-francisco', 'new-york', 'new-delhi', 'london', 'tokyo', 'warsaw']
  const extras: City[] = []
  for (const id of preferred) {
    const city = CITY_CATALOG.find((c) => c.id === id)
    if (!city) continue
    if (city.id === home.id || city.timeZone === home.timeZone) continue
    if (extras.some((e) => e.timeZone === city.timeZone)) continue
    extras.push(city)
    if (extras.length >= 3) break
  }
  return [home, ...extras]
}

function wordStartsWith(hay: string, q: string): boolean {
  return hay
    .split(/[\s,./_()'-]+/)
    .filter(Boolean)
    .some((w) => w.startsWith(q))
}

function scoreCity(city: City, q: string): number {
  const name = city.name.toLowerCase()
  const country = (city.country ?? '').toLowerCase()
  const zone = city.timeZone.toLowerCase()
  const zoneLeaf = (zone.split('/').pop() ?? zone).replaceAll('_', ' ')

  if (name === q) return 100
  if (name.startsWith(q)) return 90
  if (wordStartsWith(name, q)) return 85

  if (q.length <= 2) {
    if (country.startsWith(q) || zoneLeaf.startsWith(q)) return 40
    return 0
  }

  if (country.startsWith(q) || wordStartsWith(country, q)) return 55
  if (zoneLeaf.startsWith(q) || wordStartsWith(zoneLeaf, q)) return 50
  if (q.length >= 4 && name.includes(q)) return 35
  if (q.length >= 4 && country.includes(q)) return 25
  if (q.length >= 4 && zone.includes(q)) return 20
  return 0
}

export function searchCities(query: string, excludeIds: Set<string>): City[] {
  const q = query.trim().toLowerCase()
  const available = CITY_CATALOG.filter((c) => !excludeIds.has(c.id))

  if (!q) {
    // Prefer friendly curated names first when browsing empty search.
    const friendlyIds = new Set(FRIENDLY_CITIES.map((c) => c.id))
    return [
      ...available.filter((c) => friendlyIds.has(c.id)),
      ...available.filter((c) => !friendlyIds.has(c.id)),
    ].slice(0, 120)
  }

  return available
    .map((c) => ({ city: c, score: scoreCity(c, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.city.name.localeCompare(b.city.name))
    .slice(0, 100)
    .map((x) => x.city)
}
