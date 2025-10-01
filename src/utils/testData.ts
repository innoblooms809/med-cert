// Test data structure based on your JSON
export interface TestQuestion {
  type: 'coding' | 'mcq' | 'theory' | 'output' | 'scenario';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  inputOutput?: string;
  solutionApproach?: string;
  sampleSolution?: string;
  complexity?: string;
  code?: string;
  expectedOutput?: string;
  idealSolution?: string;
  keyConsiderations?: string[];
}

export interface Test {
  id: string;
  title: string;
  desc: string;
  domain: string;
  img: string;
  totalQuestions: number;
  duration: number;
  questions: TestQuestion[];
}

// Medical Test Data based on your JSON structure
export const doctorTests: Test[] = [
  {
    id: "dentist-mock",
    title: "Dentist Mock Test",
    desc: "Comprehensive dentistry knowledge assessment",
    domain: "Dentist",
    img: "/images/dentist.jpg",
    totalQuestions: 15,
    duration: 30,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "What is the primary cause of dental caries?",
        options: [
          "Bacteria and sugar interaction",
          "Vitamin deficiency", 
          "Genetic factors",
          "Hard brushing"
        ],
        answer: "Bacteria and sugar interaction",
        explanation: "Dental caries are primarily caused by bacteria in dental plaque metabolizing sugars and producing acids that demineralize tooth enamel."
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: "Which tooth is most commonly affected by periodontal disease?",
        options: [
          "Incisors",
          "Canines", 
          "Premolars",
          "First molars"
        ],
        answer: "First molars",
        explanation: "First molars are most commonly affected due to their early eruption and complex anatomy making them more susceptible to plaque accumulation."
      },
      {
        type: "theory",
        difficulty: "medium",
        question: "Explain the procedure and importance of root canal treatment.",
        answer: "Root canal treatment involves:\n1. Removal of infected pulp tissue from the pulp chamber and root canals\n2. Cleaning and shaping of the root canal system\n3. Disinfection using irrigants\n4. Obturation with gutta-percha\n\nImportance:\n- Preserves natural tooth\n- Prevents spread of infection\n- Eliminates pain\n- Maintains jaw bone integrity"
      },
      {
        type: "scenario",
        difficulty: "hard",
        question: "A 45-year-old patient presents with severe tooth pain, swelling, and fever. Radiograph shows periapical radiolucency. What is your diagnosis and treatment plan?",
        idealSolution: "Diagnosis: Acute apical abscess with systemic involvement.\n\nTreatment Plan:\n1. Emergency management: Incision and drainage if fluctuant swelling exists\n2. Antibiotic therapy (Amoxicillin 500mg TDS for 5 days)\n3. Analgesics for pain management\n4. Root canal treatment or extraction based on tooth restorability\n5. Follow-up after 48 hours",
        keyConsiderations: [
          "Assess systemic involvement and need for hospitalization",
          "Evaluate tooth restorability before deciding RCT vs extraction",
          "Consider patient's medical history for antibiotic selection",
          "Monitor for spread of infection to fascial spaces"
        ]
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: "What is the recommended fluoride concentration in toothpaste for adults?",
        options: [
          "250-500 ppm",
          "1000-1500 ppm", 
          "2000-2500 ppm",
          "5000+ ppm"
        ],
        answer: "1000-1500 ppm",
        explanation: "1000-1500 ppm fluoride is recommended for effective caries prevention in adults while being safe for daily use."
      }
    ]
  },
  {
    id: "gynecologist-mock",
    title: "Gynecologist Mock Test", 
    desc: "Gynecology and obstetrics knowledge evaluation",
    domain: "Gynecologist",
    img: "/images/gynecology.jpg",
    totalQuestions: 12,
    duration: 25,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "What is the normal duration of a menstrual cycle?",
        options: [
          "21-35 days",
          "14-21 days",
          "35-42 days", 
          "42-50 days"
        ],
        answer: "21-35 days",
        explanation: "A normal menstrual cycle typically ranges from 21 to 35 days, with 28 days being average."
      },
      {
        type: "mcq", 
        difficulty: "medium",
        question: "Which hormone is primarily responsible for ovulation?",
        options: [
          "Estrogen",
          "Progesterone",
          "Luteinizing Hormone (LH)",
          "Follicle Stimulating Hormone (FSH)"
        ],
        answer: "Luteinizing Hormone (LH)",
        explanation: "LH surge triggers ovulation approximately 24-36 hours after its peak, causing the mature follicle to release the egg."
      },
      {
        type: "theory",
        difficulty: "hard", 
        question: "Describe the management of pre-eclampsia in pregnancy.",
        answer: "Management of pre-eclampsia:\n\nMild pre-eclampsia:\n- Regular monitoring of BP and urine protein\n- Fetal surveillance with NST and ultrasound\n- Delivery at 37 weeks\n\nSevere pre-eclampsia:\n- Hospitalization\n- Antihypertensive therapy (Labetalol, Nifedipine)\n- Magnesium sulfate for seizure prophylaxis\n- Delivery after stabilization, regardless of gestational age\n- Corticosteroids if <34 weeks for fetal lung maturity"
      },
      {
        type: "scenario",
        difficulty: "medium",
        question: "A 28-year-old pregnant patient at 32 weeks presents with BP 150/95 mmHg, 2+ proteinuria, and mild edema. What is your immediate management?",
        idealSolution: "Immediate Management:\n1. Admit to hospital for close monitoring\n2. Start antihypertensive therapy (Labetalol 100mg BD)\n3. Administer Magnesium sulfate loading dose 4g IV followed by 1g/hour infusion\n4. Monitor fetal heart rate continuously\n5. Blood investigations: CBC, LFT, RFT, uric acid\n6. Consider delivery if condition worsens or after 34 weeks with steroid coverage",
        keyConsiderations: [
          "Assess for symptoms of severe features (headache, visual disturbances, epigastric pain)",
          "Monitor for HELLP syndrome",
          "Evaluate fetal well-being with biophysical profile",
          "Consider transfer to tertiary care if facilities inadequate"
        ]
      }
    ]
  },
  {
    id: "general-physician-mock",
    title: "General Physician Assessment",
    desc: "Comprehensive general medicine knowledge test",
    domain: "General Physician", 
    img: "/images/physician.jpg",
    totalQuestions: 20,
    duration: 40,
    questions: [
      {
        type: "mcq",
        difficulty: "easy", 
        question: "What is the first-line treatment for type 2 diabetes?",
        options: [
          "Insulin",
          "Metformin",
          "Sulfonylureas", 
          "GLP-1 agonists"
        ],
        answer: "Metformin",
        explanation: "Metformin is the first-line pharmacological treatment for type 2 diabetes due to its efficacy, safety profile, and cardiovascular benefits."
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: "Which vitamin deficiency causes megaloblastic anemia?",
        options: [
          "Vitamin B12",
          "Vitamin C", 
          "Vitamin D",
          "Vitamin K"
        ],
        answer: "Vitamin B12",
        explanation: "Vitamin B12 deficiency impairs DNA synthesis in red blood cell precursors, leading to megaloblastic anemia characterized by large, immature RBCs."
      },
      {
        type: "theory",
        difficulty: "hard",
        question: "Explain the stepwise management of hypertension according to JNC-8 guidelines.",
        answer: "JNC-8 Hypertension Management:\n\nStep 1: Lifestyle modifications for all patients\n\nStep 2: Initiate pharmacotherapy for:\n- ≥60 years: BP ≥150/90 mmHg\n- <60 years: BP ≥140/90 mmHg\n- Diabetes/CKD: BP ≥140/90 mmHg\n\nFirst-line drugs:\n- General non-black population: Thiazide, ACEI, ARB, or CCB\n- Black population: Thiazide or CCB\n\nStep 3: Add second drug from different class if goal BP not achieved\n\nStep 4: Add third drug (usually thiazide if not already used)"
      },
      {
        type: "scenario", 
        difficulty: "medium",
        question: "A 65-year-old male presents with chest pain radiating to left arm, sweating, and nausea for 30 minutes. ECG shows ST elevation in anterior leads. What is your immediate management?",
        idealSolution: "Immediate Management (STEMI protocol):\n1. MONA protocol: Morphine, Oxygen, Nitroglycerin, Aspirin\n2. Dual antiplatelet therapy: Aspirin 325mg + Clopidogrel 600mg loading\n3. Immediate reperfusion therapy:\n   - Primary PCI within 90 minutes if available\n   - Thrombolysis within 30 minutes if PCI not available\n4. Anticoagulation: Heparin or LMWH\n5. Beta-blockers if no contraindications\n6. Statin therapy\n7. Monitor in CCU",
        keyConsiderations: [
          "Time is muscle - minimize door-to-balloon or door-to-needle time",
          "Assess contraindications for thrombolysis",
          "Monitor for complications: arrhythmias, heart failure, cardiogenic shock",
          "Consider transfer to PCI-capable center if within 120 minutes"
        ]
      }
    ]
  },
  {
    id: "dermatologist-mock",
    title: "Dermatology Specialist Test",
    desc: "Skin diseases and treatment knowledge assessment", 
    domain: "Dermatologist",
    img: "/images/dermatology.jpg",
    totalQuestions: 10,
    duration: 20,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "Which of the following is the most common type of skin cancer?",
        options: [
          "Melanoma",
          "Basal cell carcinoma", 
          "Squamous cell carcinoma",
          "Merkel cell carcinoma"
        ],
        answer: "Basal cell carcinoma",
        explanation: "Basal cell carcinoma is the most common type of skin cancer, accounting for about 80% of all skin cancers, typically occurring on sun-exposed areas."
      },
      {
        type: "theory",
        difficulty: "medium",
        question: "Describe the clinical features and treatment of psoriasis vulgaris.",
        answer: "Clinical Features of Psoriasis Vulgaris:\n- Well-demarcated erythematous plaques with silvery scales\n- Commonly affects elbows, knees, scalp, and lower back\n- Auspitz sign: pinpoint bleeding when scale removed\n- Koebner phenomenon: lesions at sites of trauma\n\nTreatment:\nTopical: Corticosteroids, vitamin D analogs, coal tar\nPhototherapy: NB-UVB, PUVA\nSystemic: Methotrexate, Cyclosporine, Acitretin\nBiologics: TNF-alpha inhibitors, IL-17/23 inhibitors"
      }
    ]
  },
  {
    id: "ent-specialist-mock", 
    title: "ENT Specialist Examination",
    desc: "Ear, Nose and Throat disorders assessment",
    domain: "ENT Specialist",
    img: "/images/ent.jpg",
    totalQuestions: 8,
    duration: 15,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "What is the most common cause of acute otitis media in children?",
        options: [
          "Viral infection",
          "Bacterial infection",
          "Fungal infection", 
          "Allergic reaction"
        ],
        answer: "Bacterial infection",
        explanation: "Acute otitis media is most commonly caused by bacterial pathogens, with Streptococcus pneumoniae, Haemophilus influenzae, and Moraxella catarrhalis being the most frequent organisms."
      },
      {
        type: "scenario",
        difficulty: "medium", 
        question: "A 35-year-old teacher presents with hoarseness of voice for 3 months. She has no pain or swallowing difficulty. What is your differential diagnosis and workup?",
        idealSolution: "Differential Diagnosis:\n1. Vocal cord nodules/polyps\n2. Laryngopharyngeal reflux\n3. Functional voice disorder\n4. Early laryngeal malignancy\n5. Vocal cord paralysis\n\nWorkup:\n1. Detailed history: voice use pattern, reflux symptoms, smoking/alcohol\n2. Indirect laryngoscopy or flexible nasopharyngolaryngoscopy\n3. Voice therapy assessment\n4. Consider CT neck if malignancy suspected\n5. pH monitoring if reflux suspected",
        keyConsiderations: [
          "Assess risk factors for malignancy (smoking, alcohol)",
          "Evaluate voice usage pattern (teacher is high-risk for nodules)",
          "Consider trial of voice therapy and reflux management",
          "Low threshold for scope examination given duration of symptoms"
        ]
      }
    ]
  },
  {
    id: "homoeopath-mock",
    title: "Homoeopathy Practice Test",
    desc: "Homoeopathic principles and remedy knowledge",
    domain: "Homoeopath", 
    img: "/images/homoeopathy.jpg",
    totalQuestions: 6,
    duration: 12,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "Who is considered the founder of homoeopathy?",
        options: [
          "Hippocrates",
          "Samuel Hahnemann", 
          "Paracelsus",
          "Galen"
        ],
        answer: "Samuel Hahnemann",
        explanation: "Samuel Hahnemann, a German physician, founded homoeopathy in the late 18th century and formulated its fundamental principles."
      },
      {
        type: "theory",
        difficulty: "medium",
        question: "Explain the principle of 'Similia Similibus Curentur' with an example.",
        answer: "Principle: 'Like cures like' - a substance that causes symptoms in a healthy person can cure similar symptoms in a sick person.\n\nExample: \n- Allium cepa (red onion) causes watery eyes and runny nose\n- Therefore, it is used to treat colds with similar symptoms: watery eyes, runny nose, sneezing\n- The substance is highly diluted (potentized) according to homoeopathic principles"
      }
    ]
  },
  {
    id: "ayurveda-mock",
    title: "Ayurveda Knowledge Test", 
    desc: "Ayurvedic principles and treatment assessment",
    domain: "Ayurveda",
    img: "/images/ayurveda.jpg",
    totalQuestions: 7,
    duration: 14,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "How many fundamental principles (Doshas) are there in Ayurveda?",
        options: [
          "Two",
          "Three", 
          "Four",
          "Five"
        ],
        answer: "Three",
        explanation: "Ayurveda recognizes three fundamental biological principles or Doshas: Vata (air/space), Pitta (fire/water), and Kapha (water/earth), which govern all physiological and psychological functions."
      },
      {
        type: "theory",
        difficulty: "medium", 
        question: "Describe the concept of Agni in Ayurveda and its importance in health.",
        answer: "Agni (Digestive Fire) Concept:\n\nAgni refers to the metabolic and digestive fire that governs:\n- Digestion and absorption of food\n- Transformation of nutrients into bodily tissues\n- Elimination of waste products\n- Maintenance of cellular metabolism\n\nTypes of Agni:\n1. Jatharagni - main digestive fire in stomach\n2. Bhutagni - elemental fire for nutrient transformation  \n3. Dhatvagni - tissue-level metabolic fires\n\nImportance: Balanced Agni ensures proper digestion, prevents toxin (Ama) formation, and maintains overall health. Impaired Agni leads to disease."
      }
    ]
  }
];

export const nurseTests: Test[] = [
  {
    id: "nursing-fundamentals",
    title: "Nursing Fundamentals",
    desc: "Basic nursing concepts and patient care",
    domain: "Nurse",
    img: "/images/nursing.jpg", 
    totalQuestions: 10,
    duration: 20,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "What is the normal range for adult blood pressure?",
        options: [
          "<120/80 mmHg",
          "<130/85 mmHg", 
          "<140/90 mmHg",
          "<150/95 mmHg"
        ],
        answer: "<120/80 mmHg",
        explanation: "Normal blood pressure for adults is defined as systolic <120 mmHg and diastolic <80 mmHg according to current guidelines."
      },
      {
        type: "scenario",
        difficulty: "medium",
        question: "A post-operative patient develops sudden shortness of breath, chest pain, and tachycardia. What is your immediate nursing response?",
        idealSolution: "Immediate Nursing Response:\n1. Call for help and activate rapid response team\n2. Assess ABCs: Airway, Breathing, Circulation\n3. Administer high-flow oxygen via non-rebreather mask\n4. Monitor vital signs and oxygen saturation\n5. Position patient in semi-Fowler's position\n6. Prepare emergency equipment: crash cart, defibrillator\n7. Assist with diagnostic tests: ECG, ABG, chest X-ray\n8. Administer medications as ordered (anticoagulants, analgesics)",
        keyConsiderations: [
          "Consider pulmonary embolism in post-operative patients",
          "Monitor for signs of hemodynamic instability", 
          "Document all assessments and interventions",
          "Provide emotional support to patient and family"
        ]
      }
    ]
  }
];

// Programming tests from your JSON
export const programmingTests: Test[] = [
  {
    id: "javascript-advanced",
    title: "Advanced JavaScript",
    desc: "Advanced JavaScript concepts and coding challenges",
    domain: "Programming",
    img: "/images/javascript.jpg",
    totalQuestions: 15,
    duration: 45,
    questions: [
      {
        type: "coding",
        difficulty: "medium",
        question: "Implement a `debounce` function in JavaScript.",
        inputOutput: "Input: Calling debounce(myFunction, 300) multiple times rapidly should only execute `myFunction` once after 300ms of inactivity.",
        solutionApproach: "Use `setTimeout` to delay function execution and `clearTimeout` to reset the timer if the function is called again within the delay period. Use a closure to maintain the timer ID.",
        sampleSolution: "function debounce(func, delay) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(context, args), delay);\n  };\n}",
        complexity: "O(1) per invocation (amortized), O(1) space for closure"
      },
      {
        type: "coding", 
        difficulty: "medium",
        question: "Write a polyfill for `Promise.all`.",
        inputOutput: "Input: An array of Promises. Output: A single Promise that resolves with an array of results when all input Promises resolve, or rejects with the first error.",
        solutionApproach: "Iterate through the array of promises, track resolved values and errors. Use a counter to know when all promises have settled.",
        sampleSolution: "function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    if (!Array.isArray(promises)) {\n      return reject(new TypeError('Argument must be an array'));\n    }\n    let results = [];\n    let completed = 0;\n    let total = promises.length;\n\n    if (total === 0) return resolve([]);\n\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise).then(value => {\n        results[index] = value;\n        completed++;\n        if (completed === total) {\n          resolve(results);\n        }\n      }).catch(reason => {\n        reject(reason);\n      });\n    });\n  });\n}",
        complexity: "O(N) time where N is the number of promises, O(N) space for results array"
      },
      {
        type: "mcq",
        difficulty: "medium", 
        question: "Which statement about `this` in JavaScript arrow functions is true?",
        options: [
          "Arrow functions bind `this` to the global object.",
          "Arrow functions have their own `this` context, which is determined by how they are called.",
          "Arrow functions inherit `this` from their lexical (enclosing) scope.",
          "Arrow functions cannot use `this`."
        ],
        answer: "Arrow functions inherit `this` from their lexical (enclosing) scope.",
        explanation: "Arrow functions do not have their own `this` binding. They capture the `this` value of the enclosing lexical context when they are created, and this binding cannot be changed."
      },
      {
        type: "output",
        difficulty: "medium",
        question: "What will be the output of the following code snippet?",
        code: "for (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 100);\n}",
        expectedOutput: "3\n3\n3", 
        explanation: "The `var` keyword creates a function-scoped variable, and `i` is mutable. By the time `setTimeout` callbacks execute (after the loop finishes), the value of `i` has already become 3. All three closures reference the same `i` which now holds 3."
      },
      {
        type: "scenario",
        difficulty: "hard",
        question: "You need to render a list of 10,000 items efficiently in a browser. Each item has a complex structure and rendering all at once causes performance issues. How would you approach this to ensure a smooth user experience?",
        idealSolution: "The primary approach to efficiently render large lists is **Virtualization (or Windowing)**. This technique only renders the items currently visible in the user's viewport, plus a small buffer of items above and below the viewport. As the user scrolls, new items are rendered and old, off-screen items are unmounted or recycled. This significantly reduces the number of DOM elements that the browser needs to manage, improving performance.",
        keyConsiderations: [
          "**Virtualization Libraries:** Use existing libraries like `react-window`, `react-virtualized` (for React), `vue-virtual-scroller` (for Vue), or custom implementations.",
          "**Item Height:** Fixed vs. dynamic item heights. Fixed heights are simpler to implement; dynamic heights require more complex calculations to determine item positions and visible range.",
          "**Scroll Position:** Accurately calculating which items are visible based on scroll position and container height.",
          "**Placeholder Elements:** Using placeholder elements to maintain scrollbar size and prevent jumpiness.",
          "**Data Management:** Ensuring efficient data access for the visible items.",
          "**Performance Tuning:** Debouncing scroll events, optimizing individual item rendering, avoiding unnecessary re-renders."
        ]
      }
    ]
  }
];

// Combine all tests
export const allTests = [...doctorTests, ...nurseTests, ...programmingTests];

// Helper function to filter questions by difficulty
export const filterQuestionsByDifficulty = (questions: TestQuestion[], difficulty: string): TestQuestion[] => {
  if (difficulty === 'all') return questions;
  return questions.filter(q => q.difficulty === difficulty);
};

// Helper function to get question type display name
export const getQuestionTypeDisplay = (type: string): string => {
  const typeMap: Record<string, string> = {
    'coding': 'Coding Challenge',
    'mcq': 'Multiple Choice', 
    'theory': 'Theory Question',
    'output': 'Output Prediction',
    'scenario': 'Scenario Based'
  };
  return typeMap[type] || type;
};

// Helper to get tests by domain
export const getTestsByDomain = (domain: string): Test[] => {
  return allTests.filter(test => test.domain === domain);
};