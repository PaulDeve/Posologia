/**
 * EXAMPLE_DATA.JS
 * Datos de ejemplo para testing y demostración
 * NO INCLUIR EN PRODUCCIÓN - Solo para desarrollo
 */

const EXAMPLE_PATIENTS = [
  {
    id: "PAT-001",
    mrn: "H123456",
    name: "Juan Pérez García",
    age: 65,
    weight: 75,
    gender: "M",
    allergies: ["Penicilina"],
    conditions: ["Hipertensión", "Diabetes tipo 2"],
    createdAt: "2026-01-15T10:30:00Z"
  },
  {
    id: "PAT-002",
    mrn: "H123457",
    name: "María González López",
    age: 42,
    weight: 65,
    gender: "F",
    allergies: [],
    conditions: ["Asma"],
    createdAt: "2026-01-16T08:15:00Z"
  },
  {
    id: "PAT-003",
    mrn: "H123458",
    name: "Carlos Rodríguez Martínez",
    age: 8,
    weight: 28,
    gender: "M",
    allergies: ["Aspirina"],
    conditions: ["Epilepsia"],
    createdAt: "2026-01-17T14:45:00Z"
  },
  {
    id: "PAT-004",
    mrn: "H123459",
    name: "Ana Isabel Sánchez",
    age: 0.5, // 6 meses
    weight: 7.5,
    gender: "F",
    allergies: [],
    conditions: [],
    createdAt: "2026-01-18T09:00:00Z"
  }
];

const EXAMPLE_MEDICATION_RECORDS = [
  {
    id: 1,
    patientId: "PAT-001",
    patientName: "Juan Pérez García",
    medication: "Amoxicilina",
    dose: "500 mg",
    concentration: "500 mg",
    route: "IV",
    velocity: "62 gtt/min",
    timestamp: "2026-01-20T14:30:00Z",
    registeredBy: "Lic. María López",
    status: "administrada",
    notes: "Paciente tolera bien. Sin eventos adversos."
  },
  {
    id: 2,
    patientId: "PAT-001",
    patientName: "Juan Pérez García",
    medication: "Metoprolol",
    dose: "50 mg",
    concentration: "50 mg",
    route: "PO",
    timestamp: "2026-01-20T08:00:00Z",
    registeredBy: "Enfr. José Ruiz",
    status: "administrada",
    notes: "PA: 140/90"
  },
  {
    id: 3,
    patientId: "PAT-002",
    patientName: "María González López",
    medication: "Salbutamol",
    dose: "100 mcg",
    concentration: "100 mcg/dosis",
    route: "Inhalado",
    timestamp: "2026-01-20T10:15:00Z",
    registeredBy: "Lic. María López",
    status: "administrada",
    notes: "Crisis de asma controlada"
  },
  {
    id: 4,
    patientId: "PAT-003",
    patientName: "Carlos Rodríguez Martínez",
    medication: "Paracetamol",
    dose: "280 mg",
    concentration: "500 mg/5mL",
    route: "PO",
    timestamp: "2026-01-20T12:00:00Z",
    registeredBy: "Enfr. José Ruiz",
    status: "administrada",
    notes: "Fiebre 38.5°C. Después de dosis bajó a 37.8°C"
  },
  {
    id: 5,
    patientId: "PAT-004",
    patientName: "Ana Isabel Sánchez",
    medication: "Ceftriaxona",
    dose: "150 mg",
    concentration: "250 mg/vial",
    route: "IM",
    velocity: "0.5 mL/min",
    timestamp: "2026-01-20T09:30:00Z",
    registeredBy: "Dra. Patricia González",
    status: "administrada",
    notes: "Infección neonatal. Monitorizar"
  }
];

const EXAMPLE_GOTEO_CALCULATIONS = [
  {
    calculation: "Goteo IV - Juan Pérez",
    volume: 500,
    time: 120,
    hours: 2,
    minutes: 0,
    dropType: "macrogotero",
    factor: 15,
    dropsPerMinute: 62.5,
    mlPerHour: 250,
    timestamp: "2026-01-20T14:00:00Z",
    status: "ok"
  },
  {
    calculation: "Goteo IV - María González",
    volume: 1000,
    time: 180,
    hours: 3,
    minutes: 0,
    dropType: "microgotero",
    factor: 60,
    dropsPerMinute: 333,
    mlPerHour: 333,
    timestamp: "2026-01-20T10:00:00Z",
    status: "alerta_velocidad"
  },
  {
    calculation: "Goteo IV - Carlos Rodríguez",
    volume: 250,
    time: 60,
    hours: 1,
    minutes: 0,
    dropType: "macrogotero",
    factor: 15,
    dropsPerMinute: 62.5,
    mlPerHour: 250,
    timestamp: "2026-01-20T11:30:00Z",
    status: "ok"
  }
];

const EXAMPLE_ALERTS = [
  {
    id: 1,
    type: "dosis_excesiva",
    severity: "critical",
    medication: "Vancomicina",
    patient: "PAT-001",
    message: "Dosis 3000 mg excede rango seguro (max 2000)",
    timestamp: "2026-01-20T15:45:00Z",
    resolved: true,
    resolvedAt: "2026-01-20T16:00:00Z"
  },
  {
    id: 2,
    type: "incompatibilidad",
    severity: "warning",
    medications: ["Ampicilina", "Aminoglucósidos"],
    patient: "PAT-002",
    message: "Posible incompatibilidad en infusión simultánea",
    timestamp: "2026-01-20T14:20:00Z",
    resolved: false
  },
  {
    id: 3,
    type: "velocidad_excesiva",
    severity: "critical",
    medication: "Suero",
    patient: "PAT-004",
    message: "Velocidad 333 gtt/min excede máximo (150)",
    timestamp: "2026-01-20T10:15:00Z",
    resolved: true,
    resolvedAt: "2026-01-20T10:20:00Z"
  },
  {
    id: 4,
    type: "reevaluacion_requerida",
    severity: "warning",
    medication: "Dopamina",
    patient: "PAT-001",
    message: "Última evaluación hace 35 minutos (máx 30)",
    timestamp: "2026-01-20T15:30:00Z",
    resolved: false
  }
];

/**
 * Función para cargar datos de ejemplo en IndexedDB
 * Usar solo para TESTING/DESARROLLO
 * 
 * Uso:
 * await loadExampleData();
 */
async function loadExampleData() {
  console.log('📥 Cargando datos de ejemplo...');

  try {
    // Cargar pacientes
    for (const patient of EXAMPLE_PATIENTS) {
      await nurseDB.addPatient(patient);
    }
    console.log('✅ Pacientes cargados:', EXAMPLE_PATIENTS.length);

    // Cargar registros de medicación
    for (const record of EXAMPLE_MEDICATION_RECORDS) {
      await nurseDB.addMedicationRecord(record);
    }
    console.log('✅ Registros de medicación cargados:', EXAMPLE_MEDICATION_RECORDS.length);

    // Cargar alertas
    for (const alert of EXAMPLE_ALERTS) {
      await nurseDB.addClinicalAlert(alert);
    }
    console.log('✅ Alertas cargadas:', EXAMPLE_ALERTS.length);

    alertManager.showSuccess('Testing', 'Datos de ejemplo cargados ✓');
  } catch (error) {
    console.error('Error cargando datos de ejemplo:', error);
    alertManager.showDanger('Error', 'No se pudieron cargar datos de ejemplo');
  }
}

/**
 * Función para limpiar datos de ejemplo
 * 
 * Uso:
 * await clearExampleData();
 */
async function clearExampleData() {
  console.log('🗑️ Limpiando datos de ejemplo...');

  try {
    await nurseDB.clear();
    await app.loadBaseMedications();
    console.log('✅ Datos limpiados');
    alertManager.showSuccess('Testing', 'Datos de ejemplo eliminados ✓');
  } catch (error) {
    console.error('Error limpiando datos:', error);
  }
}

/**
 * Generar paciente aleatorio para stress testing
 */
function generateRandomPatient() {
  const names = [
    { first: 'Juan', last: 'García' },
    { first: 'María', last: 'López' },
    { first: 'Carlos', last: 'Rodríguez' },
    { first: 'Ana', last: 'Martínez' },
    { first: 'Pedro', last: 'Sánchez' },
    { first: 'Rosa', last: 'González' }
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  const age = Math.floor(Math.random() * 80) + 1;
  const weight = Math.floor(Math.random() * 50) + 50;

  return {
    id: `PAT-${Date.now()}`,
    mrn: `H${Math.floor(Math.random() * 999999)}`,
    name: `${name.first} ${name.last}`,
    age: age,
    weight: weight,
    gender: Math.random() > 0.5 ? 'M' : 'F',
    allergies: [],
    conditions: [],
    createdAt: new Date().toISOString()
  };
}

/**
 * Generar medicación aleatoria para stress testing
 */
async function generateRandomMedication(patientId, patientName) {
  const medications = await nurseDB.getAllMedications();
  const med = medications[Math.floor(Math.random() * medications.length)];

  return {
    patientId: patientId,
    patientName: patientName,
    medication: med.name,
    dose: `${med.concentration[0]} ${med.concentrationUnit}`,
    concentration: `${med.concentration[0]} ${med.concentrationUnit}`,
    route: med.routes[Math.floor(Math.random() * med.routes.length)],
    status: ['administrada', 'pendiente', 'omitida'][Math.floor(Math.random() * 3)],
    timestamp: new Date().toISOString(),
    registeredBy: 'Sistema Testing',
    notes: 'Medicación de prueba'
  };
}

/**
 * Cargar 100 medicaciones de prueba
 * Para stress testing de la BD
 */
async function generateStressTestData() {
  console.log('🔄 Generando datos para stress testing...');

  // Crear 10 pacientes
  const patients = [];
  for (let i = 0; i < 10; i++) {
    const patient = generateRandomPatient();
    await nurseDB.addPatient(patient);
    patients.push(patient);
  }
  console.log('✅ 10 pacientes creados');

  // Crear 100 medicaciones
  let count = 0;
  for (const patient of patients) {
    for (let i = 0; i < 10; i++) {
      const med = await generateRandomMedication(patient.id, patient.name);
      await nurseDB.addMedicationRecord(med);
      count++;
    }
  }
  console.log(`✅ ${count} medicaciones creadas`);

  alertManager.showSuccess('Testing', `Datos de stress test generados: 10 pacientes, ${count} medicaciones`);
}

console.log('📦 Ejemplo de datos cargado. Funciones disponibles:');
console.log('• loadExampleData() - Cargar datos de ejemplo');
console.log('• clearExampleData() - Limpiar datos de ejemplo');
console.log('• generateStressTestData() - Generar 100+ registros de prueba');
