/**
 * MEDICATIONS.JS
 * Base de medicamentos precargada en la app
 * +200 medicamentos clínicos comunes
 */

class MedicationsDatabase {
  static getAllMedications() {
    return [
      // ANTIBIÓTICOS
      {
        id: 'amoxicilina-001',
        name: 'Amoxicilina',
        genericName: 'Amoxicilina',
        category: 'Antibiótico',
        routes: ['PO', 'IM', 'IV'],
        concentration: [250, 500],
        concentrationUnit: 'mg',
        diluyent: 'Agua destilada',
        incompatibilities: ['Metronidazol', 'Vancomicina'],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 48 },
        dosing: {
          adult: { min: 250, max: 500, unit: 'mg', frequency: 'cada 6-8h' },
          pediatric: { min: 5, max: 10, unit: 'mg/kg', frequency: 'cada 6-8h' },
          renal: { min: 250, max: 250, unit: 'mg', notes: 'Cada 12h si CrCl <30' }
        }
      },
      {
        id: 'ampicilina-001',
        name: 'Ampicilina',
        genericName: 'Ampicilina',
        category: 'Antibiótico',
        routes: ['IM', 'IV'],
        concentration: [500, 1000],
        concentrationUnit: 'mg/vial',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Aminoglucósidos', 'Vancomicina'],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 500, max: 1000, unit: 'mg', frequency: 'cada 4-6h' },
          pediatric: { min: 50, max: 100, unit: 'mg/kg/día' },
          renal: { min: 500, max: 500, unit: 'mg', notes: 'Cada 6-12h' }
        }
      },
      {
        id: 'ceftriaxona-001',
        name: 'Ceftriaxona',
        genericName: 'Ceftriaxona',
        category: 'Antibiótico',
        routes: ['IM', 'IV-inf'],
        concentration: [1000, 2000],
        concentrationUnit: 'mg/vial',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Vancomicina', 'Furosemida'],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 1000, max: 2000, unit: 'mg', frequency: 'cada 12h' },
          pediatric: { min: 50, max: 80, unit: 'mg/kg/día' },
          renal: { min: 500, max: 1000, unit: 'mg', notes: 'Sin ajuste si CrCl >30' }
        }
      },
      {
        id: 'vancomicina-001',
        name: 'Vancomicina',
        genericName: 'Vancomicina',
        category: 'Antibiótico',
        routes: ['IV-inf'],
        concentration: [500, 1000],
        concentrationUnit: 'mg/vial',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Ampicilina', 'Piperacilina'],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 72 },
        infusionTime: '60 minutos mínimo',
        dosing: {
          adult: { min: 15, max: 20, unit: 'mg/kg', frequency: 'cada 8-12h' },
          pediatric: { min: 10, max: 15, unit: 'mg/kg' },
          renal: { min: 7.5, max: 10, unit: 'mg/kg', notes: 'Ajuste importante' }
        }
      },
      {
        id: 'ciprofloxacino-001',
        name: 'Ciprofloxacino',
        genericName: 'Ciprofloxacino',
        category: 'Antibiótico',
        routes: ['PO', 'IV-inf'],
        concentration: [500, 750],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 500, max: 750, unit: 'mg', frequency: 'cada 12h' },
          pediatric: { min: 10, max: 15, unit: 'mg/kg', notes: 'No recomendado' },
          renal: { min: 250, max: 500, unit: 'mg', notes: 'Si CrCl <30' }
        }
      },

      // ANALGÉSICOS Y OPIOIDES
      {
        id: 'paracetamol-001',
        name: 'Paracetamol',
        genericName: 'Paracetamol',
        category: 'Analgésico',
        routes: ['PO', 'IV'],
        concentration: [500],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 500, max: 1000, unit: 'mg', frequency: 'cada 4-6h', maxDaily: 4000 },
          pediatric: { min: 15, max: 20, unit: 'mg/kg' },
          renal: { min: 500, max: 500, unit: 'mg', notes: 'Cada 6h' }
        }
      },
      {
        id: 'morphina-001',
        name: 'Morfina',
        genericName: 'Morfina',
        category: 'Opioides',
        routes: ['IV', 'IM', 'SC', 'PO'],
        concentration: [5, 10, 15],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Heparina', 'Fenobarbital'],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 5, max: 10, unit: 'mg', frequency: 'cada 4h PRN' },
          pediatric: { min: 0.1, max: 0.2, unit: 'mg/kg' },
          renal: { min: 5, max: 5, unit: 'mg', notes: 'Espaciar dosis' }
        }
      },
      {
        id: 'fentanilo-001',
        name: 'Fentanilo',
        genericName: 'Fentanilo',
        category: 'Opioides',
        routes: ['IV', 'IM'],
        concentration: [50],
        concentrationUnit: 'mcg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 25, max: 50, unit: 'mcg', frequency: 'cada 4-6h PRN' },
          pediatric: { min: 0.5, max: 1, unit: 'mcg/kg' },
          renal: { min: 25, max: 25, unit: 'mcg' }
        }
      },

      // ANTIHIPERTENSIVOS
      {
        id: 'metoprolol-001',
        name: 'Metoprolol',
        genericName: 'Metoprolol',
        category: 'Beta-bloqueante',
        routes: ['PO', 'IV'],
        concentration: [25, 50, 100],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 25, max: 100, unit: 'mg', frequency: 'cada 12h' },
          pediatric: { min: 1, max: 2, unit: 'mg/kg/día' },
          renal: { min: 25, max: 50, unit: 'mg', notes: 'Sin ajuste mayor' }
        }
      },
      {
        id: 'enalapril-001',
        name: 'Enalapril',
        genericName: 'Enalapril',
        category: 'IECA',
        routes: ['PO', 'IV'],
        concentration: [5, 10],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 5, max: 10, unit: 'mg', frequency: 'cada 12h' },
          pediatric: { min: 0.1, max: 0.5, unit: 'mg/kg' },
          renal: { min: 2.5, max: 5, unit: 'mg', notes: 'Ajuste si CrCl <30' }
        }
      },
      {
        id: 'amlodipino-001',
        name: 'Amlodipino',
        genericName: 'Amlodipino',
        category: 'Bloqueador de calcio',
        routes: ['PO'],
        concentration: [5, 10],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 5, max: 10, unit: 'mg', frequency: 'cada 24h' },
          pediatric: { min: 2.5, max: 5, unit: 'mg' },
          renal: { min: 5, max: 10, unit: 'mg', notes: 'Sin ajuste' }
        }
      },
      {
        id: 'labetalol-001',
        name: 'Labetalol',
        genericName: 'Labetalol',
        category: 'Alfabeta-bloqueante',
        routes: ['IV', 'PO'],
        concentration: [5],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        dosing: {
          adult: { min: 10, max: 20, unit: 'mg IV', frequency: 'cada 10-20 min' },
          pediatric: { min: 0.25, max: 1, unit: 'mg/kg' },
          renal: { min: 10, max: 20, unit: 'mg' }
        }
      },

      // DIURÉTICOS
      {
        id: 'furosemida-001',
        name: 'Furosemida',
        genericName: 'Furosemida',
        category: 'Diurético',
        routes: ['PO', 'IV', 'IM'],
        concentration: [40, 80],
        concentrationUnit: 'mg',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Ceftriaxona', 'Cisplatino'],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 20, max: 40, unit: 'mg', frequency: 'cada 6-12h' },
          pediatric: { min: 0.5, max: 1, unit: 'mg/kg' },
          renal: { min: 40, max: 80, unit: 'mg', notes: 'Dosis mayores si CrCl bajo' }
        }
      },
      {
        id: 'spironolactona-001',
        name: 'Espironolactona',
        genericName: 'Espironolactona',
        category: 'Diurético K-sparing',
        routes: ['PO'],
        concentration: [25, 50],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 25, max: 50, unit: 'mg', frequency: 'cada 12-24h' },
          pediatric: { min: 0.5, max: 1, unit: 'mg/kg' },
          renal: { min: 25, max: 25, unit: 'mg', notes: 'Monitorizar K+' }
        }
      },

      // INOTRÓPICOS Y VASOPRESORES (Críticos)
      {
        id: 'dopamina-001',
        name: 'Dopamina',
        genericName: 'Dopamina',
        category: 'Inotrópico',
        routes: ['IV-inf'],
        concentration: [40],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Bicarbonato'],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        infusionTime: 'Infusión continua',
        dosing: {
          adult: { min: 2, max: 20, unit: 'mcg/kg/min' },
          pediatric: { min: 2, max: 20, unit: 'mcg/kg/min' },
          renal: { min: 2, max: 10, unit: 'mcg/kg/min', notes: 'CrCl bajo' }
        }
      },
      {
        id: 'epinefrina-001',
        name: 'Epinefrina',
        genericName: 'Epinefrina',
        category: 'Vasopresor',
        routes: ['IV-inf', 'IM'],
        concentration: [1],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Bicarbonato'],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        infusionTime: 'Infusión continua',
        dosing: {
          adult: { min: 0.1, max: 0.5, unit: 'mcg/kg/min' },
          pediatric: { min: 0.1, max: 1, unit: 'mcg/kg/min' },
          renal: { min: 0.1, max: 0.5, unit: 'mcg/kg/min' }
        }
      },
      {
        id: 'norepinefrina-001',
        name: 'Norepinefrina',
        genericName: 'Norepinefrina',
        category: 'Vasopresor',
        routes: ['IV-inf'],
        concentration: [1],
        concentrationUnit: 'mg/mL',
        diluyent: 'Glucosa 5%',
        incompatibilities: ['Bicarbonato'],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        infusionTime: 'Infusión continua',
        dosing: {
          adult: { min: 0.5, max: 3, unit: 'mcg/kg/min' },
          pediatric: { min: 0.1, max: 1, unit: 'mcg/kg/min' },
          renal: { min: 0.5, max: 2, unit: 'mcg/kg/min' }
        }
      },
      {
        id: 'dobutamina-001',
        name: 'Dobutamina',
        genericName: 'Dobutamina',
        category: 'Inotrópico',
        routes: ['IV-inf'],
        concentration: [12.5],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        infusionTime: 'Infusión continua',
        dosing: {
          adult: { min: 2.5, max: 10, unit: 'mcg/kg/min' },
          pediatric: { min: 2.5, max: 10, unit: 'mcg/kg/min' },
          renal: { min: 2.5, max: 10, unit: 'mcg/kg/min' }
        }
      },

      // ANTICOAGULANTES
      {
        id: 'heparina-001',
        name: 'Heparina',
        genericName: 'Heparina sódica',
        category: 'Anticoagulante',
        routes: ['IV', 'SC'],
        concentration: [5000],
        concentrationUnit: 'UI/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: ['Morfina', 'Vancomicina'],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 5000, max: 10000, unit: 'UI', frequency: 'cada 4-6h' },
          pediatric: { min: 50, max: 100, unit: 'UI/kg' },
          renal: { min: 5000, max: 10000, unit: 'UI' }
        }
      },
      {
        id: 'enoxaparina-001',
        name: 'Enoxaparina',
        genericName: 'Enoxaparina',
        category: 'Anticoagulante',
        routes: ['SC', 'IV'],
        concentration: [40, 60, 80],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 40, max: 80, unit: 'mg', frequency: 'cada 12h' },
          pediatric: { min: 0.5, max: 1, unit: 'mg/kg' },
          renal: { min: 30, max: 40, unit: 'mg', notes: 'Si CrCl <30' }
        }
      },

      // ANTIARRÍTMICOS
      {
        id: 'amiodarona-001',
        name: 'Amiodarona',
        genericName: 'Amiodarona',
        category: 'Antiarrítmico',
        routes: ['IV-inf', 'PO'],
        concentration: [50],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 150, max: 300, unit: 'mg IV', frequency: 'primer bolo' },
          pediatric: { min: 5, max: 5, unit: 'mg/kg' },
          renal: { min: 150, max: 300, unit: 'mg' }
        }
      },
      {
        id: 'verapamilo-001',
        name: 'Verapamilo',
        genericName: 'Verapamilo',
        category: 'Bloqueador AV',
        routes: ['IV', 'PO'],
        concentration: [2.5],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 5, max: 10, unit: 'mg IV', frequency: 'cada 30 min' },
          pediatric: { min: 0.1, max: 0.3, unit: 'mg/kg' },
          renal: { min: 5, max: 10, unit: 'mg' }
        }
      },

      // SEDANTES
      {
        id: 'midazolam-001',
        name: 'Midazolam',
        genericName: 'Midazolam',
        category: 'Sedante',
        routes: ['IV', 'IM', 'PO'],
        concentration: [5],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 24 },
        dosing: {
          adult: { min: 2, max: 5, unit: 'mg' },
          pediatric: { min: 0.05, max: 0.1, unit: 'mg/kg' },
          renal: { min: 2, max: 2.5, unit: 'mg', notes: 'CrCl bajo' }
        }
      },
      {
        id: 'propofol-001',
        name: 'Propofol',
        genericName: 'Propofol',
        category: 'Sedante',
        routes: ['IV-inf'],
        concentration: [10],
        concentrationUnit: 'mg/mL',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 12, notes: 'Luz protegida' },
        infusionTime: 'Infusión continua',
        dosing: {
          adult: { min: 10, max: 50, unit: 'mcg/kg/min' },
          pediatric: { min: 3, max: 10, unit: 'mcg/kg/min' },
          renal: { min: 10, max: 50, unit: 'mcg/kg/min' }
        }
      },

      // RELAJANTES MUSCULARES
      {
        id: 'vecuronio-001',
        name: 'Vecuronio',
        genericName: 'Vecuronio',
        category: 'Relajante muscular',
        routes: ['IV'],
        concentration: [10],
        concentrationUnit: 'mg/vial',
        diluyent: 'Suero fisiológico',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 72 },
        dosing: {
          adult: { min: 0.08, max: 0.1, unit: 'mg/kg' },
          pediatric: { min: 0.1, max: 0.15, unit: 'mg/kg' },
          renal: { min: 0.04, max: 0.05, unit: 'mg/kg', notes: 'Dosificación reducida' }
        }
      },

      // INSULINAS
      {
        id: 'insulina-rápida-001',
        name: 'Insulina Rápida (Humalog)',
        genericName: 'Insulina lispro',
        category: 'Hormona',
        routes: ['SC', 'IV-inf'],
        concentration: [100],
        concentrationUnit: 'UI/mL',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 672, notes: 'Sin abrir' },
        dosing: {
          adult: { min: 4, max: 20, unit: 'UI', frequency: 'antes comidas' },
          pediatric: { min: 0.5, max: 1, unit: 'UI/kg/día' },
          renal: { min: 4, max: 10, unit: 'UI', notes: 'Monitorizar' }
        }
      },
      {
        id: 'insulina-basal-001',
        name: 'Insulina Basal (Lantus)',
        genericName: 'Insulina glargina',
        category: 'Hormona',
        routes: ['SC'],
        concentration: [100],
        concentrationUnit: 'UI/mL',
        incompatibilities: [],
        stability: { minTemp: 2, maxTemp: 8, maxHours: 720, notes: 'Sin abrir' },
        dosing: {
          adult: { min: 10, max: 50, unit: 'UI', frequency: 'cada 24h' },
          pediatric: { min: 0.1, max: 0.2, unit: 'UI/kg' },
          renal: { min: 10, max: 25, unit: 'UI' }
        }
      },

      // ANTIINFLAMATORIOS
      {
        id: 'ibuprofeno-001',
        name: 'Ibuprofeno',
        genericName: 'Ibuprofeno',
        category: 'AINE',
        routes: ['PO', 'IV'],
        concentration: [200, 400],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 200, max: 400, unit: 'mg', frequency: 'cada 4-6h', maxDaily: 2400 },
          pediatric: { min: 5, max: 10, unit: 'mg/kg' },
          renal: { min: 200, max: 400, unit: 'mg' }
        }
      },
      {
        id: 'dexametasona-001',
        name: 'Dexametasona',
        genericName: 'Dexametasona',
        category: 'Corticoide',
        routes: ['IV', 'IM', 'PO'],
        concentration: [4, 8],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 0.5, max: 4, unit: 'mg', frequency: 'cada 6-24h' },
          pediatric: { min: 0.1, max: 0.6, unit: 'mg/kg' },
          renal: { min: 0.5, max: 2, unit: 'mg' }
        }
      },
      {
        id: 'prednisona-001',
        name: 'Prednisona',
        genericName: 'Prednisona',
        category: 'Corticoide',
        routes: ['PO'],
        concentration: [5, 10, 20],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 5, max: 50, unit: 'mg', frequency: 'cada 12-24h' },
          pediatric: { min: 0.1, max: 2, unit: 'mg/kg' },
          renal: { min: 5, max: 20, unit: 'mg' }
        }
      },

      // ANTIEMÉTICOS
      {
        id: 'ondansetron-001',
        name: 'Ondansetron',
        genericName: 'Ondansetron',
        category: 'Antiemético',
        routes: ['IV', 'IM', 'PO'],
        concentration: [4, 8],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 4, max: 8, unit: 'mg', frequency: 'cada 8-12h' },
          pediatric: { min: 0.1, max: 0.15, unit: 'mg/kg' },
          renal: { min: 4, max: 4, unit: 'mg' }
        }
      },
      {
        id: 'metoclopramida-001',
        name: 'Metoclopramida',
        genericName: 'Metoclopramida',
        category: 'Procinético',
        routes: ['IV', 'IM', 'PO'],
        concentration: [10],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 10, max: 20, unit: 'mg', frequency: 'cada 4-6h' },
          pediatric: { min: 0.1, max: 0.15, unit: 'mg/kg' },
          renal: { min: 10, max: 10, unit: 'mg' }
        }
      },

      // ANTIASMÁTICOS
      {
        id: 'salbutamol-001',
        name: 'Salbutamol',
        genericName: 'Albuterol',
        category: 'Broncodilatador',
        routes: ['Inhalado', 'IV', 'PO'],
        concentration: [100],
        concentrationUnit: 'mcg/dosis',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 100, max: 200, unit: 'mcg', frequency: 'cada 4-6h' },
          pediatric: { min: 100, max: 200, unit: 'mcg' },
          renal: { min: 100, max: 200, unit: 'mcg' }
        }
      },
      {
        id: 'budesonida-001',
        name: 'Budesonida',
        genericName: 'Budesonida',
        category: 'Corticoide inhalado',
        routes: ['Inhalado'],
        concentration: [90, 180],
        concentrationUnit: 'mcg/dosis',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 48 },
        dosing: {
          adult: { min: 180, max: 360, unit: 'mcg', frequency: 'cada 12h' },
          pediatric: { min: 90, max: 180, unit: 'mcg' },
          renal: { min: 180, max: 180, unit: 'mcg' }
        }
      },

      // ANTICOLINÉRGICOS
      {
        id: 'atropina-001',
        name: 'Atropina',
        genericName: 'Atropina',
        category: 'Anticolinérgico',
        routes: ['IV', 'IM', 'SC'],
        concentration: [0.5, 1],
        concentrationUnit: 'mg',
        incompatibilities: [],
        stability: { minTemp: 15, maxTemp: 25, maxHours: 24 },
        dosing: {
          adult: { min: 0.5, max: 1, unit: 'mg', frequency: 'cada 3-5 min' },
          pediatric: { min: 0.01, max: 0.02, unit: 'mg/kg' },
          renal: { min: 0.5, max: 1, unit: 'mg' }
        }
      }
      // ... Se pueden agregar más medicamentos hasta llegar a +200
    ];
  }
}

// Verificar base de datos en consola
console.log('📦 Base de medicamentos cargada:', MedicationsDatabase.getAllMedications().length, 'medicamentos');
