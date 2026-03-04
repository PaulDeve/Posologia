/**
 * DATABASE.JS
 * Sistema de almacenamiento offline con IndexedDB
 * Maneja: Medicamentos, Pacientes, Registros de medicación, Configuración
 */

class NurseDB {
  constructor() {
    this.dbName = 'NurseAppDB';
    this.version = 1;
    this.db = null;
  }

  /**
   * Inicializar base de datos
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Error abriendo DB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('✅ Base de datos inicializada');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store: Medicamentos
        if (!db.objectStoreNames.contains('medications')) {
          const medicStore = db.createObjectStore('medications', { keyPath: 'id' });
          medicStore.createIndex('name', 'name', { unique: false });
          medicStore.createIndex('category', 'category', { unique: false });
        }

        // Store: Pacientes
        if (!db.objectStoreNames.contains('patients')) {
          const patientStore = db.createObjectStore('patients', { keyPath: 'id' });
          patientStore.createIndex('mrn', 'mrn', { unique: true });
          patientStore.createIndex('name', 'name', { unique: false });
        }

        // Store: Registros de medicación
        if (!db.objectStoreNames.contains('medicationRecords')) {
          const recordStore = db.createObjectStore('medicationRecords', { keyPath: 'id', autoIncrement: true });
          recordStore.createIndex('patientId', 'patientId', { unique: false });
          recordStore.createIndex('timestamp', 'timestamp', { unique: false });
          recordStore.createIndex('status', 'status', { unique: false });
        }

        // Store: Configuración
        if (!db.objectStoreNames.contains('config')) {
          db.createObjectStore('config', { keyPath: 'key' });
        }

        // Store: Alertas clínicas
        if (!db.objectStoreNames.contains('clinicalAlerts')) {
          const alertStore = db.createObjectStore('clinicalAlerts', { keyPath: 'id', autoIncrement: true });
          alertStore.createIndex('severity', 'severity', { unique: false });
          alertStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        console.log('✅ Object stores creados');
      };
    });
  }

  /**
   * CRUD: Medicamentos
   */
  async addMedication(medication) {
    const tx = this.db.transaction(['medications'], 'readwrite');
    const store = tx.objectStore('medications');
    return new Promise((resolve, reject) => {
      const request = store.add(medication);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getMedication(id) {
    const tx = this.db.transaction(['medications'], 'readonly');
    const store = tx.objectStore('medications');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllMedications() {
    if (!this.db) {
      return [];
    }
    const tx = this.db.transaction(['medications'], 'readonly');
    const store = tx.objectStore('medications');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async searchMedications(query) {
    const all = await this.getAllMedications();
    const q = query.toLowerCase();
    return all.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.genericName?.toLowerCase().includes(q) ||
      m.category?.toLowerCase().includes(q)
    );
  }

  /**
   * CRUD: Pacientes
   */
  async addPatient(patient) {
    patient.id = patient.mrn || Date.now();
    const tx = this.db.transaction(['patients'], 'readwrite');
    const store = tx.objectStore('patients');
    return new Promise((resolve, reject) => {
      const request = store.put(patient);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPatient(id) {
    if (!this.db) {
      return null;
    }
    const tx = this.db.transaction(['patients'], 'readonly');
    const store = tx.objectStore('patients');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllPatients() {
    if (!this.db) {
      return [];
    }
    const tx = this.db.transaction(['patients'], 'readonly');
    const store = tx.objectStore('patients');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * CRUD: Registros de medicación
   */
  async addMedicationRecord(record) {
    record.timestamp = record.timestamp || new Date().toISOString();
    const tx = this.db.transaction(['medicationRecords'], 'readwrite');
    const store = tx.objectStore('medicationRecords');
    return new Promise((resolve, reject) => {
      const request = store.add(record);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getMedicationRecord(id) {
    const tx = this.db.transaction(['medicationRecords'], 'readonly');
    const store = tx.objectStore('medicationRecords');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPatientRecords(patientId) {
    const tx = this.db.transaction(['medicationRecords'], 'readonly');
    const store = tx.objectStore('medicationRecords');
    const index = store.index('patientId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(patientId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateMedicationRecord(id, updates) {
    const record = await this.getMedicationRecord(id);
    const updated = { ...record, ...updates };
    const tx = this.db.transaction(['medicationRecords'], 'readwrite');
    const store = tx.objectStore('medicationRecords');
    return new Promise((resolve, reject) => {
      const request = store.put(updated);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * CRUD: Configuración
   */
  async setConfig(key, value) {
    const tx = this.db.transaction(['config'], 'readwrite');
    const store = tx.objectStore('config');
    return new Promise((resolve, reject) => {
      const request = store.put({ key, value });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getConfig(key) {
    const tx = this.db.transaction(['config'], 'readonly');
    const store = tx.objectStore('config');
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.value : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Alertas clínicas
   */
  async addClinicalAlert(alert) {
    alert.timestamp = alert.timestamp || new Date().toISOString();
    const tx = this.db.transaction(['clinicalAlerts'], 'readwrite');
    const store = tx.objectStore('clinicalAlerts');
    return new Promise((resolve, reject) => {
      const request = store.add(alert);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Limpiar base de datos (resetear app)
   */
  async clear() {
    const stores = ['medications', 'patients', 'medicationRecords', 'config', 'clinicalAlerts'];
    for (const store of stores) {
      const tx = this.db.transaction([store], 'readwrite');
      const request = tx.objectStore(store).clear();
      await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }

  /**
   * Exportar datos para backup
   */
  async exportData() {
    const data = {
      medications: await this.getAllMedications(),
      patients: await this.getAllPatients(),
      medicationRecords: await this.getPatientRecords(null), // TODO: fix this
      timestamp: new Date().toISOString()
    };
    return data;
  }
}

// Instancia global
const nurseDB = new NurseDB();
