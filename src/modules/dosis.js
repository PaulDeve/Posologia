/**
 * DOSIS.JS
 * Módulo de dosificación (adulto, pediátrico, renal)
 * Muestra fórmulas, pasos y alertas de seguridad
 */

class DosisModule {
  constructor() {
    this.container = document.querySelector('.dosis-container');
    this.calculationType = 'adult'; // adult, pediatric, renal
    this.selectedMedication = null;
    this.weight = null;
    this.age = null;
    this.dose = null;

    this.init();
  }

  init() {
    this.render();
    this.updatePatientDataSection(); // Cargar los campos del paciente para el primer tipo
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="card fade-in">
        <div class="card__header">
          <h3 class="card__title">Dosificación de Medicamentos</h3>
          <p class="card__subtitle">Adulto, Pediátrico y Cálculo Renal</p>
        </div>

        <div class="card__content">
          <!-- TIPO DE CÁLCULO -->
          <div class="form-group">
            <label class="form-label required">Tipo de Cálculo</label>
            <div class="radio-group">
              <label class="radio-item selected" data-value="adult">
                <input type="radio" name="calcType" value="adult" checked>
                <span class="radio-label">
                  <strong>Adulto</strong>
                  <br/>
                  <small style="color: var(--text-muted);">≥18 años</small>
                </span>
              </label>
              <label class="radio-item" data-value="pediatric">
                <input type="radio" name="calcType" value="pediatric">
                <span class="radio-label">
                  <strong>Pediátrico</strong>
                  <br/>
                  <small style="color: var(--text-muted);">Basado en peso</small>
                </span>
              </label>
              <label class="radio-item" data-value="renal">
                <input type="radio" name="calcType" value="renal">
                <span class="radio-label">
                  <strong>Insuficiencia Renal</strong>
                  <br/>
                  <small style="color: var(--text-muted);">Ajuste de dosis</small>
                </span>
              </label>
            </div>
          </div>

          <!-- DATOS DEL PACIENTE -->
          <div id="patientDataSection"></div>

          <!-- SELECCIÓN DE MEDICAMENTO -->
          <div class="form-group">
            <label class="form-label required">Medicamento</label>
            <input 
              type="text" 
              id="medicationSearch" 
              class="form-input input-lg" 
              placeholder="Buscar medicamento..."
              autocomplete="off"
            >
            <div id="medicationSuggestions" style="margin-top: var(--spacing-sm);"></div>
          </div>

          <!-- MEDICAMENTO SELECCIONADO -->
          <div id="selectedMedicationDisplay"></div>

          <!-- DOSIS CALCULADA -->
          <div id="doseCalculationSection"></div>

          <!-- BOTÓN CALCULAR -->
          <button class="btn btn-primary btn-lg btn-block" id="calculateDoseBtn">
            🧮 CALCULAR DOSIS
          </button>
        </div>
      </div>

      <div id="resultSection"></div>
    `;
  }

  attachEventListeners() {
    // Cambiar tipo de cálculo
    document.querySelectorAll('[name="calcType"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.calculationType = e.target.value;
        this.updatePatientDataSection();
        this.updateRadioSelection(e.target.closest('.radio-item'));
      });
    });

    // Búsqueda de medicamento
    const medSearch = document.getElementById('medicationSearch');
    medSearch.addEventListener('input', (e) => this.searchMedications(e.target.value));
    medSearch.addEventListener('focus', (e) => this.showMedicationSuggestions());

    // Calcular dosis
    document.getElementById('calculateDoseBtn').addEventListener('click', () => {
      this.calculateDose();
    });
  }

  updateRadioSelection(element) {
    document.querySelectorAll('[name="calcType"]').forEach(radio => {
      radio.closest('.radio-item').classList.remove('selected');
    });
    element.classList.add('selected');
  }

  updatePatientDataSection() {
    const section = document.getElementById('patientDataSection');

    if (this.calculationType === 'adult') {
      section.innerHTML = `
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="form-label required">Peso</label>
              <input 
                type="number" 
                id="weightInput" 
                class="form-input input-lg" 
                placeholder="Peso en kg"
                min="30"
                max="200"
                step="0.1"
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label class="form-label">Edad (opcional)</label>
              <input 
                type="number" 
                id="ageInput" 
                class="form-input input-lg" 
                placeholder="Edad en años"
                min="18"
                max="120"
              >
            </div>
          </div>
        </div>
      `;
    } else if (this.calculationType === 'pediatric') {
      section.innerHTML = `
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="form-label required">Peso</label>
              <input 
                type="number" 
                id="weightInput" 
                class="form-input input-lg" 
                placeholder="Peso en kg"
                min="0.5"
                max="100"
                step="0.1"
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label class="form-label">Edad</label>
              <input 
                type="number" 
                id="ageInput" 
                class="form-input input-lg" 
                placeholder="Edad (meses/años)"
                min="0"
                max="18"
              >
            </div>
          </div>
        </div>
      `;
    } else if (this.calculationType === 'renal') {
      section.innerHTML = `
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="form-label">Peso</label>
              <input 
                type="number" 
                id="weightInput" 
                class="form-input" 
                placeholder="Peso en kg"
                min="30"
                max="200"
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label class="form-label required">CrCl (mL/min)</label>
              <input 
                type="number" 
                id="crclInput" 
                class="form-input" 
                placeholder="Clearance de creatinina"
                min="5"
                max="120"
              >
            </div>
          </div>
        </div>
      `;
    }
  }

  async searchMedications(query) {
    if (query.length < 2) {
      document.getElementById('medicationSuggestions').innerHTML = '';
      return;
    }

    const meds = await nurseDB.searchMedications(query);
    const suggestionsDiv = document.getElementById('medicationSuggestions');

    if (meds.length === 0) {
      suggestionsDiv.innerHTML = '<div style="color: var(--text-muted); padding: var(--spacing-md);">No hay medicamentos encontrados</div>';
      return;
    }

    suggestionsDiv.innerHTML = meds.map(med => `
      <button 
        type="button" 
        class="btn btn-secondary btn-block" 
        style="text-align: left; justify-content: flex-start;"
        data-med-id="${med.id}"
      >
        <strong>${med.name}</strong><br/>
        <small style="color: var(--text-muted);">${med.genericName || med.category}</small>
      </button>
    `).join('');

    // Agregar listeners
    suggestionsDiv.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', async () => {
        const medId = btn.getAttribute('data-med-id');
        this.selectedMedication = await nurseDB.getMedication(medId);
        this.displaySelectedMedication();
        document.getElementById('medicationSearch').value = this.selectedMedication.name;
        suggestionsDiv.innerHTML = '';
      });
    });
  }

  async showMedicationSuggestions() {
    const query = document.getElementById('medicationSearch').value;
    if (query.length === 0) {
      const meds = await nurseDB.getAllMedications();
      const recent = meds.slice(0, 10);
      const suggestionsDiv = document.getElementById('medicationSuggestions');

      suggestionsDiv.innerHTML = '<div style="color: var(--text-muted); padding: var(--spacing-sm); font-size: 0.9rem;">Medicamentos recientes:</div>' + 
        recent.map(med => `
          <button 
            type="button" 
            class="btn btn-secondary" 
            style="text-align: left; justify-content: flex-start; width: 100%; margin-bottom: var(--spacing-xs);"
            data-med-id="${med.id}"
          >
            <strong>${med.name}</strong>
          </button>
        `).join('');

      suggestionsDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async () => {
          const medId = btn.getAttribute('data-med-id');
          this.selectedMedication = await nurseDB.getMedication(medId);
          this.displaySelectedMedication();
          document.getElementById('medicationSearch').value = this.selectedMedication.name;
          suggestionsDiv.innerHTML = '';
        });
      });
    }
  }

  displaySelectedMedication() {
    const display = document.getElementById('selectedMedicationDisplay');
    const med = this.selectedMedication;
    const dosing = med.dosing[this.calculationType] || med.dosing.adult;

    display.innerHTML = `
      <div class="card" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h4 class="card__title">${med.name}</h4>
          <p class="card__subtitle">${med.genericName} • ${med.category}</p>
        </div>

        <div class="card__content">
          <div class="row">
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-xs);">Concentración</div>
              <div style="font-weight: 600;">${med.concentration?.join(', ') || 'N/A'} ${med.concentrationUnit}</div>
            </div>
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-xs);">Ruta</div>
              <div style="font-weight: 600;">${med.routes?.join(', ') || 'N/A'}</div>
            </div>
          </div>

          <div class="divider"></div>

          <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
            Rango de dosis recomendado:
          </div>
          <div style="background: var(--surface-alt); padding: var(--spacing-lg); border-radius: var(--radius-md);">
            <strong style="color: var(--primary);">
              ${dosing.min} - ${dosing.max} ${dosing.unit}
            </strong>
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: var(--spacing-sm);">
              ${dosing.frequency || dosing.notes || ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  calculateDose() {
    if (!this.selectedMedication) {
      alertManager.showDanger('Error', 'Seleccione un medicamento');
      return;
    }

    // Obtener valores de entrada
    let weightInput = document.getElementById('weightInput');
    let ageInput = document.getElementById('ageInput');
    
    this.weight = weightInput ? parseFloat(weightInput.value) : null;
    this.age = ageInput ? parseInt(ageInput.value) : null;

    // Validaciones según tipo de cálculo
    if (this.calculationType === 'adult' && !this.weight) {
      alertManager.showWarning('Validación', 'Ingrese el peso del paciente');
      return;
    }

    if (this.calculationType === 'pediatric' && (!this.weight || !this.age)) {
      alertManager.showWarning('Validación', 'Ingrese peso y edad');
      return;
    }

    const med = this.selectedMedication;
    const dosing = med.dosing[this.calculationType] || med.dosing.adult;

    // Calcular dosis
    let calculatedDose = null;
    let frequency = dosing.frequency || 'Según indicación médica';
    let notes = '';

    if (this.calculationType === 'adult') {
      // Dosis adulto típica
      calculatedDose = dosing.min ? `${dosing.min}-${dosing.max}` : 'Ver rango recomendado';
      notes = dosing.notes || '';
    } else if (this.calculationType === 'pediatric') {
      // Dosis pediátrica: típicamente por kg de peso
      const minDose = dosing.min ? parseFloat(dosing.min) * this.weight : null;
      const maxDose = dosing.max ? parseFloat(dosing.max) * this.weight : null;
      if (minDose && maxDose) {
        calculatedDose = `${minDose.toFixed(1)}-${maxDose.toFixed(1)}`;
      } else {
        calculatedDose = `${dosing.min}-${dosing.max}`;
      }
      notes = `Por ${this.weight}kg`;
    } else if (this.calculationType === 'renal') {
      const crclInput = document.getElementById('crclInput');
      const crcl = crclInput ? parseInt(crclInput.value) : null;
      if (!crcl) {
        alertManager.showWarning('Validación', 'Ingrese el clearance de creatinina');
        return;
      }
      // Ajuste renal
      if (crcl < 30) {
        calculatedDose = `${dosing.min}-${dosing.max} (reducida)`;
        notes = `CrCl: ${crcl} mL/min - Dosis reducida por fallo renal grave`;
      } else if (crcl < 50) {
        calculatedDose = `${dosing.min}-${dosing.max} (moderada)`;
        notes = `CrCl: ${crcl} mL/min - Dosis moderadamente reducida`;
      } else {
        calculatedDose = `${dosing.min}-${dosing.max}`;
        notes = `CrCl: ${crcl} mL/min - Dosis normal`;
      }
    }

    // Mostrar resultados
    this.displayResults(med, calculatedDose, frequency, notes);
    alertManager.showSuccess('Cálculo realizado', 'Dosis calculada correctamente');
  }

  displayResults(medication, dose, frequency, notes) {
    const resultSection = document.getElementById('resultSection');
    
    resultSection.innerHTML = `
      <div class="card" style="margin-top: var(--spacing-lg); background: var(--success-lightest); border-left: 4px solid var(--success);">
        <div class="card__header">
          <h3 class="card__title" style="color: var(--success);">✓ Resultado del Cálculo</h3>
        </div>
        
        <div class="card__content">
          <div style="margin-bottom: var(--spacing-lg);">
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-xs);">
              Medicamento
            </div>
            <div style="font-size: 1.1rem; font-weight: 600;">
              ${medication.name}
            </div>
          </div>

          <div style="background: white; padding: var(--spacing-lg); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              Dosis Calculada
            </div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--success); margin-bottom: var(--spacing-md);">
              ${dose} ${medication.dosing.adult?.unit || 'mg'}
            </div>

            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              Frecuencia
            </div>
            <div style="font-weight: 600; margin-bottom: var(--spacing-md);">
              ${frequency}
            </div>

            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              Observaciones
            </div>
            <div style="font-size: 0.95rem;">
              ${notes || 'Administrar según indicación médica'}
            </div>
          </div>

          <div style="background: rgba(30, 58, 138, 0.05); padding: var(--spacing-lg); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
            <strong style="color: var(--primary);">⚠️ Verificar</strong>
            <ul style="margin: var(--spacing-sm) 0 0 0; padding-left: var(--spacing-lg); font-size: 0.9rem;">
              <li>Contraindicaciones en el paciente</li>
              <li>Interacciones con otros medicamentos</li>
              <li>Función renal y hepática</li>
              <li>Alergias conocidas</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    // Hacer scroll hacia los resultados
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new DosisModule();
});
