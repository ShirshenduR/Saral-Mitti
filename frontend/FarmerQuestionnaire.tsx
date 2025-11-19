// FarmerQuestionnaire.tsx
// Farmer Context Questionnaire - किसान संदर्भ प्रश्नावली
// Collects critical information before soil analysis

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sprout,
  TrendingDown,
  Calendar,
  Droplet,
  TestTube,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  X
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES
// ========================================

export interface FarmerContext {
  // Location data
  state: string;
  district: string;
  town: string;
  village?: string;
  waterSource: 'river' | 'borewell' | 'canal' | 'rainwater' | 'pond' | 'other';
  waterSourceDetails?: string;

  // Crop history
  last3Crops: string[];
  currentCrop?: string;
  plannedCrop?: string;

  // Yield trends
  yieldTrend: 'increasing' | 'stable' | 'decreasing' | 'first-time';
  yieldDetails?: string;

  // Testing reason
  testReason: 'routine' | 'low-yield' | 'disease' | 'new-crop' | 'other';
  testReasonDetails?: string;

  // Fertilizer/Pesticide history (last 6 months)
  recentFertilizers: string[];
  recentPesticides: string[];

  // Current season
  season: 'kharif' | 'rabi' | 'zaid' | 'summer';
}

interface LocationData {
  states: { [key: string]: string[] };
  districts: { [key: string]: string[] };
}

// ========================================
// LOCATION DATA - All Indian States and Major Districts
// ========================================
const locationData: LocationData = {
  states: {
    'Andhra Pradesh': ['आंध्र प्रदेश'],
    'Arunachal Pradesh': ['अरुणाचल प्रदेश'],
    'Assam': ['असम'],
    'Bihar': ['बिहार'],
    'Chhattisgarh': ['छत्तीसगढ़'],
    'Delhi': ['दिल्ली'],
    'Goa': ['गोवा'],
    'Gujarat': ['गुजरात'],
    'Haryana': ['हरियाणा'],
    'Himachal Pradesh': ['हिमाचल प्रदेश'],
    'Jharkhand': ['झारखंड'],
    'Karnataka': ['कर्नाटक'],
    'Kerala': ['केरल'],
    'Madhya Pradesh': ['मध्य प्रदेश'],
    'Maharashtra': ['महाराष्ट्र'],
    'Manipur': ['मणिपुर'],
    'Meghalaya': ['मेघालय'],
    'Mizoram': ['मिजोरम'],
    'Nagaland': ['नागालैंड'],
    'Odisha': ['ओडिशा'],
    'Punjab': ['पंजाब'],
    'Rajasthan': ['राजस्थान'],
    'Sikkim': ['सिक्किम'],
    'Tamil Nadu': ['तमिलनाडु'],
    'Telangana': ['तेलंगाना'],
    'Tripura': ['त्रिपुरा'],
    'Uttar Pradesh': ['उत्तर प्रदेश'],
    'Uttarakhand': ['उत्तराखंड'],
    'West Bengal': ['पश्चिम बंगाल'],
    'Jammu and Kashmir': ['जम्मू और कश्मीर'],
    'Ladakh': ['लद्दाख'],
    'Chandigarh': ['चंडीगढ़'],
    'Dadra and Nagar Haveli and Daman and Diu': ['दादरा और नगर हवेली और दमन और दीव'],
    'Lakshadweep': ['लक्षद्वीप'],
    'Puducherry': ['पुडुचेरी']
  },
  districts: {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    'Arunachal Pradesh': ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Lower Dibang Valley', 'Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'],
    'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup (Rural)', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
    'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Korea', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
    'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    'Mizoram': ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip'],
    'Nagaland': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'Tarn Taran'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
    'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
    'Jammu and Kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Dadra & Nagar Haveli', 'Daman', 'Diu'],
    'Lakshadweep': ['Lakshadweep'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  }
};

// Common crops in India
const commonCrops = [
  'Rice (धान)', 'Wheat (गेहूं)', 'Sugarcane (गन्ना)', 'Cotton (कपास)',
  'Maize (मक्का)', 'Pulses (दालें)', 'Groundnut (मूंगफली)', 
  'Soybean (सोयाबीन)', 'Mustard (सरसों)', 'Bajra (बाजरा)',
  'Jowar (ज्वार)', 'Potato (आलू)', 'Onion (प्याज)', 'Tomato (टमाटर)',
  'Vegetables (सब्जियां)', 'Other (अन्य)'
];

// Common fertilizers
const commonFertilizers = [
  'Urea (यूरिया)', 'DAP', 'NPK', 'SSP', 'MOP',
  'Organic compost (जैविक खाद)', 'Vermicompost (केंचुआ खाद)',
  'None (कोई नहीं)', 'Other (अन्य)'
];

// Common pesticides
const commonPesticides = [
  'Insecticides (कीटनाशक)', 'Fungicides (फफूंदनाशक)',
  'Herbicides (खरपतवारनाशक)', 'Organic pesticides (जैविक)',
  'None (कोई नहीं)', 'Other (अन्य)'
];

// ========================================
// SEASON DETECTION
// ========================================
function getCurrentSeason(): 'kharif' | 'rabi' | 'zaid' | 'summer' {
  const month = new Date().getMonth(); // 0-11
  
  // Kharif (Monsoon): June-October (5-9)
  if (month >= 5 && month <= 9) return 'kharif';
  
  // Rabi (Winter): October-March (9-2)
  if (month >= 9 || month <= 2) return 'rabi';
  
  // Zaid (Summer): March-June (2-5)
  if (month >= 2 && month <= 5) return 'zaid';
  
  // Summer: April-June (3-5)
  return 'summer';
}

function getSeasonIcon(season: string) {
  switch (season) {
    case 'kharif': return <CloudRain className="w-5 h-5" />;
    case 'rabi': return <Snowflake className="w-5 h-5" />;
    case 'zaid': return <Sun className="w-5 h-5" />;
    case 'summer': return <Sun className="w-5 h-5" />;
    default: return <Calendar className="w-5 h-5" />;
  }
}

function getSeasonName(season: string, lang: 'en' | 'hi') {
  const names = {
    kharif: { en: 'Kharif (Monsoon)', hi: 'खरीफ (मानसून)' },
    rabi: { en: 'Rabi (Winter)', hi: 'रबी (सर्दी)' },
    zaid: { en: 'Zaid (Summer)', hi: 'जायद (गर्मी)' },
    summer: { en: 'Summer', hi: 'गर्मी' }
  };
  return names[season as keyof typeof names]?.[lang] || season;
}

// ========================================
// MAIN COMPONENT
// ========================================
interface FarmerQuestionnaireProps {
  onComplete: (context: FarmerContext) => void;
  onSkip?: () => void;
  language?: 'en' | 'hi';
}

export default function FarmerQuestionnaire({
  onComplete,
  onSkip,
  language = 'en'
}: FarmerQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [context, setContext] = useState<Partial<FarmerContext>>({
    season: getCurrentSeason(),
    last3Crops: [],
    recentFertilizers: [],
    recentPesticides: []
  });

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  // Update districts when state changes
  useEffect(() => {
    if (context.state) {
      setSelectedDistricts(locationData.districts[context.state] || []);
    }
  }, [context.state]);

  const updateContext = (field: keyof FarmerContext, value: any) => {
    setContext(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: 'last3Crops' | 'recentFertilizers' | 'recentPesticides', value: string) => {
    setContext(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value]
    }));
  };

  const removeFromArray = (field: 'last3Crops' | 'recentFertilizers' | 'recentPesticides', index: number) => {
    setContext(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 0: return context.testReason;
      case 1: return context.state && context.district && context.town;
      case 2: return context.waterSource;
      case 3: return (context.last3Crops?.length || 0) >= 1;
      case 4: return context.yieldTrend;
      case 5: return (context.recentFertilizers?.length || 0) >= 1;
      case 6: return true; // Season is auto-detected
      default: return true;
    }
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
    else handleComplete();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleComplete = () => {
    if (isStepValid()) {
      onComplete(context as FarmerContext);
    }
  };

  const t = {
    en: {
      title: 'Soil Analysis Context',
      subtitle: 'Help us understand your soil better',
      skip: 'Skip for now',
      next: 'Next',
      back: 'Back',
      complete: 'Complete',
      
      // Step 0: Test Reason
      testReasonTitle: 'Why are you testing your soil today?',
      testReasonSubtitle: 'This helps us prioritize the analysis',
      routine: 'Routine check',
      lowYield: 'Low yield observed',
      disease: 'Crop disease/problem',
      newCrop: 'Planning new crop',
      other: 'Other reason',
      
      // Step 1: Location
      locationTitle: 'Where is your farm located?',
      locationSubtitle: 'Helps identify regional soil patterns',
      selectState: 'Select State',
      selectDistrict: 'Select District',
      enterTown: 'Enter Town/Tehsil',
      enterVillage: 'Enter Village (Optional)',
      
      // Step 2: Water Source
      waterTitle: 'What is your water source?',
      waterSubtitle: 'Different sources affect soil salinity',
      river: 'River',
      borewell: 'Borewell',
      canal: 'Canal',
      rainwater: 'Rainwater',
      pond: 'Pond/Tank',
      
      // Step 3: Crop History
      cropHistoryTitle: 'Last 3-4 crops grown',
      cropHistorySubtitle: 'Shows nutrient depletion patterns',
      addCrop: 'Add crop',
      currentCropLabel: 'Current crop (if any)',
      plannedCropLabel: 'Planned next crop (if decided)',
      
      // Step 4: Yield Trend
      yieldTitle: 'Recent yield trends',
      yieldSubtitle: 'Indicates possible deficiencies',
      increasing: 'Increasing',
      stable: 'Stable',
      decreasing: 'Decreasing',
      firstTime: 'First-time farming',
      
      // Step 5: Fertilizer History
      fertilizerTitle: 'Recent fertilizers used (last 6 months)',
      fertilizerSubtitle: 'Rules out already-boosted nutrients',
      addFertilizer: 'Add fertilizer',
      pesticideLabel: 'Recent pesticides (optional)',
      addPesticide: 'Add pesticide',
      
      // Step 6: Season Confirmation
      seasonTitle: 'Current Season',
      seasonSubtitle: 'Determines critical nutrients',
      seasonDetected: 'We detected the current season as:',
      changeSeason: 'Change if incorrect'
    },
    hi: {
      title: 'मिट्टी विश्लेषण संदर्भ',
      subtitle: 'अपनी मिट्टी को बेहतर समझने में हमारी मदद करें',
      skip: 'अभी छोड़ें',
      next: 'आगे',
      back: 'पीछे',
      complete: 'पूर्ण करें',
      
      testReasonTitle: 'आज आप अपनी मिट्टी का परीक्षण क्यों कर रहे हैं?',
      testReasonSubtitle: 'यह विश्लेषण को प्राथमिकता देने में मदद करता है',
      routine: 'नियमित जांच',
      lowYield: 'कम उपज देखी गई',
      disease: 'फसल रोग/समस्या',
      newCrop: 'नई फसल की योजना',
      other: 'अन्य कारण',
      
      locationTitle: 'आपका खेत कहाँ स्थित है?',
      locationSubtitle: 'क्षेत्रीय मिट्टी पैटर्न की पहचान में मदद करता है',
      selectState: 'राज्य चुनें',
      selectDistrict: 'जिला चुनें',
      enterTown: 'शहर/तहसील दर्ज करें',
      enterVillage: 'गाँव दर्ज करें (वैकल्पिक)',
      
      waterTitle: 'आपके पानी का स्रोत क्या है?',
      waterSubtitle: 'विभिन्न स्रोत मिट्टी की लवणता को प्रभावित करते हैं',
      river: 'नदी',
      borewell: 'बोरवेल',
      canal: 'नहर',
      rainwater: 'वर्षा जल',
      pond: 'तालाब/टैंक',
      
      cropHistoryTitle: 'पिछली 3-4 फसलें उगाई गईं',
      cropHistorySubtitle: 'पोषक तत्वों की कमी के पैटर्न दिखाता है',
      addCrop: 'फसल जोड़ें',
      currentCropLabel: 'वर्तमान फसल (यदि कोई हो)',
      plannedCropLabel: 'अगली योजनाबद्ध फसल (यदि तय हो)',
      
      yieldTitle: 'हाल की उपज प्रवृत्तियाँ',
      yieldSubtitle: 'संभावित कमियों को इंगित करता है',
      increasing: 'बढ़ रहा है',
      stable: 'स्थिर',
      decreasing: 'घट रहा है',
      firstTime: 'पहली बार खेती',
      
      fertilizerTitle: 'हाल ही में उपयोग किए गए उर्वरक (पिछले 6 महीने)',
      fertilizerSubtitle: 'पहले से बढ़े हुए पोषक तत्वों को नियंत्रित करता है',
      addFertilizer: 'उर्वरक जोड़ें',
      pesticideLabel: 'हाल ही में कीटनाशक (वैकल्पिक)',
      addPesticide: 'कीटनाशक जोड़ें',
      
      seasonTitle: 'वर्तमान मौसम',
      seasonSubtitle: 'महत्वपूर्ण पोषक तत्व निर्धारित करता है',
      seasonDetected: 'हमने वर्तमान मौसम का पता लगाया:',
      changeSeason: 'यदि गलत हो तो बदलें'
    }
  };

  const strings = t[language];

  // ========================================
  // RENDER STEPS
  // ========================================
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <TestTube className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.testReasonTitle}</h2>
              <p className="text-muted">{strings.testReasonSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'routine', label: strings.routine, icon: Calendar },
                { value: 'low-yield', label: strings.lowYield, icon: TrendingDown },
                { value: 'disease', label: strings.disease, icon: AlertCircle },
                { value: 'new-crop', label: strings.newCrop, icon: Sprout },
                { value: 'other', label: strings.other, icon: TestTube }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateContext('testReason', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    context.testReason === option.value
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                  {context.testReason === option.value && <Check className="w-5 h-5 ml-auto text-accent" />}
                </button>
              ))}
            </div>
            
            {context.testReason === 'other' && (
              <textarea
                placeholder="Please describe..."
                value={context.testReasonDetails || ''}
                onChange={e => updateContext('testReasonDetails', e.target.value)}
                className="w-full p-3 rounded-lg border border-muted bg-surface resize-none"
                rows={3}
              />
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.locationTitle}</h2>
              <p className="text-muted">{strings.locationSubtitle}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{strings.selectState}</label>
              <select
                value={context.state || ''}
                onChange={e => updateContext('state', e.target.value)}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              >
                <option value="">{strings.selectState}</option>
                {Object.keys(locationData.states).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {context.state && (
              <div>
                <label className="block text-sm font-medium mb-2">{strings.selectDistrict}</label>
                <select
                  value={context.district || ''}
                  onChange={e => updateContext('district', e.target.value)}
                  className="w-full p-3 rounded-lg border border-muted bg-surface"
                >
                  <option value="">{strings.selectDistrict}</option>
                  {selectedDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            )}

            {context.district && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">{strings.enterTown}</label>
                  <input
                    type="text"
                    value={context.town || ''}
                    onChange={e => updateContext('town', e.target.value)}
                    placeholder={strings.enterTown}
                    className="w-full p-3 rounded-lg border border-muted bg-surface"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{strings.enterVillage}</label>
                  <input
                    type="text"
                    value={context.village || ''}
                    onChange={e => updateContext('village', e.target.value)}
                    placeholder={strings.enterVillage}
                    className="w-full p-3 rounded-lg border border-muted bg-surface"
                  />
                </div>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Droplet className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.waterTitle}</h2>
              <p className="text-muted">{strings.waterSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'river', label: strings.river },
                { value: 'borewell', label: strings.borewell },
                { value: 'canal', label: strings.canal },
                { value: 'rainwater', label: strings.rainwater },
                { value: 'pond', label: strings.pond },
                { value: 'other', label: strings.other }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateContext('waterSource', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    context.waterSource === option.value
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {context.waterSource === option.value && (
                    <Check className="w-5 h-5 mt-2 text-accent" />
                  )}
                </button>
              ))}
            </div>

            {context.waterSource === 'other' && (
              <input
                type="text"
                placeholder="Please specify..."
                value={context.waterSourceDetails || ''}
                onChange={e => updateContext('waterSourceDetails', e.target.value)}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Sprout className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.cropHistoryTitle}</h2>
              <p className="text-muted">{strings.cropHistorySubtitle}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{strings.addCrop}</label>
              <select
                onChange={e => {
                  if (e.target.value && (context.last3Crops?.length || 0) < 4) {
                    addToArray('last3Crops', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              >
                <option value="">{strings.addCrop}</option>
                {commonCrops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {(context.last3Crops?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {context.last3Crops?.map((crop, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent"
                  >
                    {crop}
                    <button
                      onClick={() => removeFromArray('last3Crops', index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">{strings.currentCropLabel}</label>
              <input
                type="text"
                value={context.currentCrop || ''}
                onChange={e => updateContext('currentCrop', e.target.value)}
                placeholder={strings.currentCropLabel}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{strings.plannedCropLabel}</label>
              <input
                type="text"
                value={context.plannedCrop || ''}
                onChange={e => updateContext('plannedCrop', e.target.value)}
                placeholder={strings.plannedCropLabel}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <TrendingDown className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.yieldTitle}</h2>
              <p className="text-muted">{strings.yieldSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'increasing', label: strings.increasing },
                { value: 'stable', label: strings.stable },
                { value: 'decreasing', label: strings.decreasing },
                { value: 'first-time', label: strings.firstTime }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateContext('yieldTrend', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    context.yieldTrend === option.value
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {context.yieldTrend === option.value && (
                    <Check className="w-5 h-5 mt-2 text-accent" />
                  )}
                </button>
              ))}
            </div>

            {context.yieldTrend === 'decreasing' && (
              <textarea
                placeholder="Please describe the decrease pattern..."
                value={context.yieldDetails || ''}
                onChange={e => updateContext('yieldDetails', e.target.value)}
                className="w-full p-3 rounded-lg border border-muted bg-surface resize-none"
                rows={3}
              />
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <TestTube className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.fertilizerTitle}</h2>
              <p className="text-muted">{strings.fertilizerSubtitle}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{strings.addFertilizer}</label>
              <select
                onChange={e => {
                  if (e.target.value) {
                    addToArray('recentFertilizers', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              >
                <option value="">{strings.addFertilizer}</option>
                {commonFertilizers.map(fert => (
                  <option key={fert} value={fert}>{fert}</option>
                ))}
              </select>
            </div>

            {(context.recentFertilizers?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {context.recentFertilizers?.map((fert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  >
                    {fert}
                    <button
                      onClick={() => removeFromArray('recentFertilizers', index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-muted">
              <label className="block text-sm font-medium mb-2">{strings.pesticideLabel}</label>
              <select
                onChange={e => {
                  if (e.target.value) {
                    addToArray('recentPesticides', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-3 rounded-lg border border-muted bg-surface"
              >
                <option value="">{strings.addPesticide}</option>
                {commonPesticides.map(pest => (
                  <option key={pest} value={pest}>{pest}</option>
                ))}
              </select>
            </div>

            {(context.recentPesticides?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {context.recentPesticides?.map((pest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                  >
                    {pest}
                    <button
                      onClick={() => removeFromArray('recentPesticides', index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{strings.seasonTitle}</h2>
              <p className="text-muted">{strings.seasonSubtitle}</p>
            </div>

            <div className="p-6 rounded-lg bg-accent/10 border border-accent/30 text-center">
              <p className="text-muted mb-3">{strings.seasonDetected}</p>
              <div className="flex items-center justify-center gap-3 text-2xl font-bold text-accent">
                {getSeasonIcon(context.season || 'kharif')}
                <span>{getSeasonName(context.season || 'kharif', language)}</span>
              </div>
            </div>

            <p className="text-sm text-muted text-center">{strings.changeSeason}</p>

            <div className="grid grid-cols-2 gap-3">
              {['kharif', 'rabi', 'zaid', 'summer'].map(season => (
                <button
                  key={season}
                  onClick={() => updateContext('season', season)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    context.season === season
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                >
                  {getSeasonIcon(season)}
                  <span className="font-medium">{getSeasonName(season, language)}</span>
                  {context.season === season && <Check className="w-5 h-5 text-accent" />}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // MAIN RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-bg text-text p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold mb-2">{strings.title}</h1>
          <p className="text-muted">{strings.subtitle}</p>
          {onSkip && (
            <button
              onClick={onSkip}
              className="mt-4 text-sm text-muted hover:text-accent underline"
            >
              {strings.skip}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted">
            <span>Step {step + 1} of 7</span>
            <span>{Math.round(((step + 1) / 7) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 7) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-surface rounded-xl p-6 shadow-lg mb-6"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 px-6 rounded-lg border border-muted hover:bg-surface 
                       transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              {strings.back}
            </button>
          )}
          
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center 
                     justify-center gap-2 transition-all ${
              isStepValid()
                ? 'bg-accent text-white hover:bg-accent-2'
                : 'bg-muted/30 text-muted cursor-not-allowed'
            }`}
          >
            {step === 6 ? strings.complete : strings.next}
            {step === 6 ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
