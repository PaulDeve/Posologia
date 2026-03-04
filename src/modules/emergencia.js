/**
 * EMERGENCIA.JS
 * Módulo de emergencia - Interfaz rápida sin formularios
 * 1 toque = cálculo inmediato + registro automático
 */

class EmergenciaModule {
  constructor() {
    this.container = document.querySelector('.emergencia-container');
    this.criticalMedications = [
      { name: 'Epinefrina 1:1000', dose: '0.3-0.5 mg IM' },
      { name: 'Atropina', dose: '0.5-1 mg IV' },
      { name: 'Dopamina', dose: '2-20 mcg/kg/min IV' },
      { name: 'Fentanilo', dose: '50-100 mcg IV' },
      { name: 'Midazolam', dose: '2-5 mg IV' },
      { name: 'Amiodarona', dose: '150-300 mg IV bolo' }
    ];

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: var(--spacing-xl); border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
        <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-sm);">
          🚨 MODO EMERGENCIA ACTIVADO
        </div>
        <div style="font-size: 0.95rem; opacity: 0.9;">
          Interfaz simplificada para acciones críticas rápidas
        </div>
      </div>

      <div class="card fade-in">
        <div class="card__header">
          <h3 class="card__title">Medicamentos Críticos Predefinidos</h3>
          <p class="card__subtitle">Seleccione para cálculo inmediato</p>
        </div>

        <div class="card__content">
          <div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-md);">
            ${this.criticalMedications.map((med, idx) => `
              <button 
                class="btn btn-danger btn-lg btn-block" 
                data-med-idx="${idx}"
                style="justify-content: flex-start; font-size: 1rem; text-align: left; padding: var(--spacing-lg);"
              >
                <div style="flex: 1;">
                  <div style="font-weight: 700;">${med.name}</div>
                  <div style="font-size: 0.9rem; opacity: 0.9;">${med.dose}</div>
                </div>
                <div style="font-size: 1.5rem;">→</div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Medicamento personalizado -->
      <div class="card" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h3 class="card__title">O Ingrese Medicamento Manual</h3>
        </div>

        <div class="card__content">
          <div class="form-group">
            <label class="form-label">Nombre del Medicamento</label>
            <input 
              type="text" 
              id="customMedName" 
              class="form-input input-lg" 
              placeholder="Ej: Propofol"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Dosis/Pauta</label>
            <input 
              type="text" 
              id="customDose" 
              class="form-input input-lg" 
              placeholder="Ej: 2 mg/kg IV"
            >
          </div>

          <button class="btn btn-success btn-lg btn-block" id="customMedBtn">
            ⚡ REGISTRAR Y CONTINUAR
          </button>
        </div>
      </div>

      <!-- Registro de acciones -->
      <div id="actionsLog"></div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Medicamentos predefinidos
    document.querySelectorAll('[data-med-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-med-idx'));
        this.recordCriticalMedication(this.criticalMedications[idx]);
      });
    });

    // Medicamento personalizado
    document.getElementById('customMedBtn').addEventListener('click', () => {
      const name = document.getElementById('customMedName').value;
      const dose = document.getElementById('customDose').value;

      if (!name || !dose) {
        alertManager.showDanger('Error', 'Complete todos los campos');
        return;
      }

      this.recordCriticalMedication({ name, dose, custom: true });
    });
  }

  recordCriticalMedication(med) {
    // Grabación inmediata
    const timestamp = new Date();

    const record = {
      type: 'emergency',
      medication: med.name,
      dose: med.dose,
      timestamp: timestamp.toISOString(),
      status: 'administrada'
    };

    // Guardar en BD
    nurseDB.addMedicationRecord(record);

    // Notificación visual
    this.showEmergencyConfirmation(med, timestamp);

    // Limpiar si es personalizado
    if (med.custom) {
      document.getElementById('customMedName').value = '';
      document.getElementById('customDose').value = '';
    }
  }

  showEmergencyConfirmation(med, timestamp) {
    const logDiv = document.getElementById('actionsLog');

    const entry = document.createElement('div');
    entry.className = 'card slide-up';
    entry.style.marginTop = 'var(--spacing-lg)';
    entry.style.backgroundColor = 'var(--success)';
    entry.style.color = 'white';
    entry.style.borderColor = 'var(--success)';

    entry.innerHTML = `
      <div style="display: flex; gap: var(--spacing-lg); align-items: center;">
        <div style="font-size: 2rem;">✅</div>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 1.125rem;">${med.name}</div>
          <div style="opacity: 0.95; font-size: 0.95rem;">
            ${med.dose} • ${Formatters.formatTime(timestamp)}
          </div>
        </div>
      </div>
    `;

    logDiv.insertBefore(entry, logDiv.firstChild);

    // Auto-remover después de 3 segundos
    setTimeout(() => {
      entry.style.opacity = '0.5';
    }, 3000);

    // Toast notificación
    alertManager.showToast(`${med.name} registrado ✓`, 2000);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new EmergenciaModule();
});
