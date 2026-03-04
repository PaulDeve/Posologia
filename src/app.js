/**
 * APP.JS
 * Controlador principal de la aplicación
 */

class NurseApp {
  constructor() {
    this.currentModule = 'goteoModule';
    this.theme = 'light';
    this.initialized = false;
  }

  /**
   * Inicializar aplicación
   */
  async init() {
    try {
      // Iniciar base de datos
      await nurseDB.init();
      
      // Esperar un tick para asegurar que la BD esté lista
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('✅ App inicializado');

      // Cargar medicamentos base
      await this.loadBaseMedications();

      // Configurar tema
      await this.setupTheme();

      // Configurar navegación
      this.setupNavigation();

      // Cargar módulos
      await this.loadModules();

      this.initialized = true;
    } catch (error) {
      console.error('Error al inicializar:', error);
      alertManager.showDanger('Error', 'No se pudo inicializar la aplicación');
    }
  }

  /**
   * Cargar medicamentos base en IndexedDB (primera vez)
   */
  async loadBaseMedications() {
    const existingMeds = await nurseDB.getAllMedications();
    
    if (existingMeds.length > 0) {
      console.log('✅ Medicamentos ya cargados');
      return;
    }

    console.log('📥 Cargando medicamentos base...');
    
    const medications = MedicationsDatabase.getAllMedications();
    
    for (const med of medications) {
      await nurseDB.addMedication(med);
    }

    console.log(`✅ ${medications.length} medicamentos cargados`);
  }

  /**
   * Configurar tema (claro/oscuro)
   */
  async setupTheme() {
    const savedTheme = await nurseDB.getConfig('theme');
    this.theme = savedTheme || 'light';

    this.applyTheme(this.theme);

    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  /**
   * Aplicar tema
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;

    // Icono del toggle
    const toggle = document.getElementById('themeToggle');
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  /**
   * Cambiar tema
   */
  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    nurseDB.setConfig('theme', newTheme);
  }

  /**
   * Configurar navegación inferior
   */
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const moduleId = item.getAttribute('data-module');
        this.switchModule(moduleId, item);
      });
    });
  }

  /**
   * Cambiar módulo
   */
  switchModule(moduleId, navItem) {
    // Ocultar módulo actual
    const current = document.getElementById(this.currentModule);
    if (current) {
      current.classList.remove('active');
    }

    // Actualizar nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    navItem.classList.add('active');

    // Mostrar nuevo módulo
    const module = document.getElementById(moduleId);
    if (module) {
      module.classList.add('active');
      this.currentModule = moduleId;

      // Actualizar título
      const title = module.querySelector('.module__title');
      if (title) {
        document.getElementById('moduleTitle').textContent = title.textContent;
      }
    }
  }

  /**
   * Cargar módulos (inicializar después de DOM listo)
   */
  async loadModules() {
    // Los módulos se cargan automáticamente cuando se incluyen los JS
    console.log('✅ Módulos cargados');
  }

  /**
   * Mostrar loading spinner
   */
  showLoading(show = true) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.classList.toggle('hidden', !show);
    }
  }

  /**
   * Obtener datos para exportar
   */
  async getExportData() {
    const patients = await nurseDB.getAllPatients();
    const records = []; // TODO: obtener todos los registros

    return {
      timestamp: new Date().toISOString(),
      appVersion: '1.0.0',
      patients,
      medicationRecords: records
    };
  }

  /**
   * Reset de la aplicación (pedir confirmación)
   */
  async resetApp() {
    const result = await alertManager.showModal({
      type: 'danger',
      title: '⚠️ RESETEAR APLICACIÓN',
      message: 'Esta acción borrará TODOS los datos locales. Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', action: 'cancel', style: 'secondary' },
        { text: 'Resetear', action: 'confirm', style: 'danger' }
      ]
    });

    if (result === 'confirm') {
      this.showLoading(true);
      await nurseDB.clear();
      await this.loadBaseMedications();
      this.showLoading(false);
      alertManager.showSuccess('Sistema', 'Aplicación reseteada ✓');
    }
  }
}

// Inicializar cuando DOM esté listo
let app;

document.addEventListener('DOMContentLoaded', async () => {
  app = new NurseApp();
  await app.init();
});
