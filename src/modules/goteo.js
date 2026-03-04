/**
 * GOTEO.JS
 * Módulo de cálculo de goteo IV (macrogotero y microgotero)
 * Fórmula: (Volumen × Factor) / Tiempo(min) = Gotas/min
 */

class GoteoModule {
  constructor() {
    this.container = document.querySelector('.goteo-container');
    this.volume = null;
    this.infusionHours = 0;
    this.infusionMinutes = 0;
    this.dropType = 'macrogotero'; // macrogotero (15 gtt/mL) o microgotero (60 gtt/mL)
    this.result = null;

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="card fade-in">
        <div class="card__header">
          <h3 class="card__title">Cálculo de Goteo IV</h3>
          <p class="card__subtitle">Ingrese volumen, tiempo e tipo de gotero</p>
        </div>

        <div class="card__content">
          <!-- VOLUMEN -->
          <div class="form-group">
            <label class="form-label required">Volumen (mL)</label>
            <input 
              type="number" 
              id="volumeInput" 
              class="form-input input-lg" 
              placeholder="500" 
              min="1" 
              max="5000"
              step="100"
            >
            <div class="form-help">Rango seguro: 50 - 5000 mL</div>
          </div>

          <!-- TIEMPO DE INFUSIÓN -->
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label class="form-label required">Horas</label>
                <input 
                  type="number" 
                  id="hoursInput" 
                  class="form-input input-lg" 
                  placeholder="2" 
                  min="0" 
                  max="24"
                  step="1"
                >
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label class="form-label required">Minutos</label>
                <select id="minutesInput" class="form-input input-lg">
                  <option value="0">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TIPO DE GOTERO -->
          <div class="form-group">
            <label class="form-label required">Tipo de Equipo</label>
            <div class="radio-group">
              <label class="radio-item selected" data-value="macrogotero">
                <input 
                  type="radio" 
                  name="dropType" 
                  value="macrogotero" 
                  checked
                >
                <span class="radio-label">
                  <strong>Macrogotero</strong> (15 gtt/mL)
                  <br/>
                  <small style="color: var(--text-muted);">Para fluidos normales</small>
                </span>
              </label>
              <label class="radio-item" data-value="microgotero">
                <input 
                  type="radio" 
                  name="dropType" 
                  value="microgotero"
                >
                <span class="radio-label">
                  <strong>Microgotero</strong> (60 gtt/mL)
                  <br/>
                  <small style="color: var(--text-muted);">Para medicamentos/fluidos sensibles</small>
                </span>
              </label>
            </div>
          </div>

          <!-- BOTÓN CALCULAR -->
          <button class="btn btn-primary btn-lg btn-block" id="calculateBtn">
            📊 CALCULAR
          </button>
        </div>
      </div>

      <!-- RESULTADO -->
      <div id="resultSection"></div>

      <!-- FORMULARIO DE AJUSTE -->
      <div id="adjustmentSection"></div>
    `;

    this.attachResultListeners();
  }

  attachEventListeners() {
    const volumeInput = document.getElementById('volumeInput');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const radioItems = document.querySelectorAll('.radio-item');

    // Validar volumen en tiempo real
    volumeInput.addEventListener('change', () => {
      const validation = ClinicalValidator.validateVolume(volumeInput.value);
      if (!validation.valid) {
        alertManager.showWarning('Volumen', validation.error);
        volumeInput.value = '';
      }
    });

    // Actualizar selección de gotero
    radioItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
          radioItems.forEach(r => r.classList.remove('selected'));
          item.classList.add('selected');
          this.dropType = radio.value;
        }
      });
    });

    // Calcular
    calculateBtn.addEventListener('click', () => this.calculate());

    // Enter para calcular
    volumeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.calculate();
    });
    hoursInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.calculate();
    });
  }

  attachResultListeners() {
    // Se actualiza dinámicamente
  }

  calculate() {
    const volumeInput = document.getElementById('volumeInput');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');

    // Obtener valores
    this.volume = parseFloat(volumeInput.value);
    this.infusionHours = parseInt(hoursInput.value) || 0;
    this.infusionMinutes = parseInt(minutesInput.value) || 0;

    // Validar inputs
    const volumeValidation = ClinicalValidator.validateVolume(this.volume);
    if (!volumeValidation.valid) {
      alertManager.showDanger('Error', volumeValidation.error);
      return;
    }

    const timeValidation = ClinicalValidator.validateInfusionTime(
      this.infusionHours,
      this.infusionMinutes
    );
    if (!timeValidation.valid) {
      alertManager.showDanger('Error', timeValidation.error);
      return;
    }

    // Calcular
    const result = this.performCalculation();

    // Mostrar resultado
    this.displayResult(result);

    // Registrar en base de datos
    this.recordCalculation(result);
  }

  performCalculation() {
    // Convertir tiempo a minutos
    const totalMinutes = this.infusionHours * 60 + this.infusionMinutes;

    // Factor de conversión según tipo de gotero
    const factor = this.dropType === 'macrogotero' ? 15 : 60;

    // Fórmula: (Volumen × Factor) / Tiempo(minutos)
    const dropsPerMinute = (this.volume * factor) / totalMinutes;

    // Cálculo alternativo: mL/h
    const mlPerHour = this.volume / (totalMinutes / 60);

    return {
      volume: this.volume,
      time: totalMinutes,
      hours: this.infusionHours,
      minutes: this.infusionMinutes,
      dropType: this.dropType,
      factor: factor,
      dropsPerMinute: dropsPerMinute,
      mlPerHour: mlPerHour,
      timestamp: new Date().toISOString()
    };
  }

  displayResult(result) {
    const resultSection = document.getElementById('resultSection');

    // Validar velocidad
    const speedValidation = ClinicalValidator.validateDropRate(result.dropsPerMinute);

    const alertClass = speedValidation.warning ? 'warning' : 'success';
    const alertIcon = speedValidation.warning ? '⚠️' : '✅';

    resultSection.innerHTML = `
      <div class="card slide-up">
        <div class="card__header">
          <h3 class="card__title">📊 Resultado del Cálculo</h3>
        </div>

        <div class="card__content">
          <!-- RESULTADO PRINCIPAL -->
          <div class="result-box">
            <div class="result-box__label">Gotas por Minuto</div>
            <div class="result-box__value">${Math.round(result.dropsPerMinute)}</div>
            <div class="result-box__unit">gtt/min</div>
          </div>

          <!-- RESULTADOS SECUNDARIOS -->
          <div class="row">
            <div class="col">
              <div style="background: var(--surface-alt); padding: var(--spacing-lg); border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-sm);">mL por Hora</div>
                <div style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">
                  ${result.mlPerHour.toFixed(1)} <span style="font-size: 1rem;">mL/h</span>
                </div>
              </div>
            </div>
            <div class="col">
              <div style="background: var(--surface-alt); padding: var(--spacing-lg); border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-sm);">Tipo de Gotero</div>
                <div style="font-size: 1.25rem; font-weight: 600; color: var(--primary);">
                  ${result.dropType === 'macrogotero' ? 'Macro' : 'Micro'}<br/>
                  <small style="font-size: 0.9rem; color: var(--text-muted);">${result.factor} gtt/mL</small>
                </div>
              </div>
            </div>
          </div>

          <!-- ALERTA DE VELOCIDAD -->
          ${speedValidation.warning ? `
            <div style="background: var(--danger-lightest); border-left: 4px solid var(--danger); padding: var(--spacing-lg); border-radius: var(--radius-md); margin-top: var(--spacing-lg);">
              <div style="font-weight: 600; color: var(--danger); margin-bottom: var(--spacing-sm);">
                ⚠️ VELOCIDAD EXCESIVA
              </div>
              <div style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">
                <strong>Riesgo de Sobredosis</strong><br/>
                Velocidad calculada: <strong>${Math.round(result.dropsPerMinute)} gtt/min</strong><br/>
                Máximo recomendado: <strong>150 gtt/min</strong><br/>
                <small style="color: var(--text-muted);">Revisar prescripción y parámetros de entrada</small>
              </div>
            </div>
          ` : ''}

          <!-- FÓRMULA Y PASOS -->
          <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: var(--spacing-lg); border-top: 1px solid var(--border); padding-top: var(--spacing-lg);">
            <strong style="color: var(--text-main);">Cálculo realizado:</strong><br/>
            <code style="background: var(--surface-alt); padding: var(--spacing-md); border-radius: var(--radius-md); display: block; margin: var(--spacing-md) 0; overflow-x: auto; font-size: 0.85rem;">
(Volumen × Factor Gotero) ÷ Tiempo (minutos)<br/>
(${result.volume} mL × ${result.factor} gtt/mL) ÷ ${result.time} min = ${Math.round(result.dropsPerMinute)} gtt/min
            </code>
            
            <div style="margin-top: var(--spacing-md);">
              <div>• <strong>Volumen:</strong> ${result.volume} mL</div>
              <div>• <strong>Tipo:</strong> ${result.dropType} (${result.factor} gtt/mL)</div>
              <div>• <strong>Tiempo total:</strong> ${result.hours}h ${result.minutes}min (${result.time} min)</div>
              <div>• <strong>Resultado:</strong> ${Math.round(result.dropsPerMinute)} gtt/min ó ${result.mlPerHour.toFixed(1)} mL/h</div>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN -->
          <div class="btn-group" style="margin-top: var(--spacing-lg);">
            <button class="btn btn-success btn-block" id="confirmBtn">
              ✅ CONFIRMAR E INICIAR
            </button>
            <button class="btn btn-secondary btn-block" id="adjustBtn">
              🔧 AJUSTAR INFUSIÓN
            </button>
          </div>
        </div>
      </div>
    `;

    // Agregar listeners a botones
    document.getElementById('confirmBtn').addEventListener('click', () => {
      this.confirmInfusion(result);
    });

    document.getElementById('adjustBtn').addEventListener('click', () => {
      this.showAdjustmentForm(result);
    });

    this.result = result;
  }

  confirmInfusion(result) {
    alertManager.showSuccess(
      '✅ Goteo Iniciado',
      `Velocidad: ${Math.round(result.dropsPerMinute)} gtt/min<br/>Tiempo estimado: ${result.hours}h ${result.minutes}min`
    );

    // TODO: Iniciar notificaciones de monitoreo
    console.log('Goteo iniciado:', result);
  }

  showAdjustmentForm(result) {
    const adjustSection = document.getElementById('adjustmentSection');

    adjustSection.innerHTML = `
      <div class="card slide-up" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h3 class="card__title">🔧 Ajustar Infusión</h3>
          <p class="card__subtitle">Modifique la velocidad de goteo</p>
        </div>

        <div class="card__content">
          <div class="form-group">
            <label class="form-label required">Nueva velocidad (gtt/min)</label>
            <input 
              type="number" 
              id="newDropRateInput" 
              class="form-input input-lg" 
              value="${Math.round(result.dropsPerMinute)}"
              min="1"
              max="300"
              step="1"
            >
          </div>

          <div style="background: var(--surface-alt); padding: var(--spacing-lg); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-sm);">Velocidad calculada originalmente</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: var(--text-main);">
              ${Math.round(result.dropsPerMinute)} gtt/min
            </div>
          </div>

          <div class="btn-group">
            <button class="btn btn-success btn-block" id="saveAdjustmentBtn">
              💾 GUARDAR AJUSTE
            </button>
            <button class="btn btn-secondary btn-block" id="cancelAdjustmentBtn">
              ❌ CANCELAR
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('saveAdjustmentBtn').addEventListener('click', () => {
      const newRate = parseFloat(document.getElementById('newDropRateInput').value);
      const validation = ClinicalValidator.validateDropRate(newRate);

      if (!validation.valid && validation.severity === 'critical') {
        alertManager.showDanger(
          'Velocidad excesiva',
          `${validation.error}<br/><br/>¿Desea continuar de todas formas?<br/><small>Requiere confirmación de enfermero responsable</small>`
        );
      } else if (validation.warning) {
        alertManager.showWarning(
          'Advertencia',
          validation.warning
        );
      }

      this.confirmAdjustment(newRate, result);
    });

    document.getElementById('cancelAdjustmentBtn').addEventListener('click', () => {
      adjustSection.innerHTML = '';
    });
  }

  confirmAdjustment(newRate, originalResult) {
    alertManager.showSuccess(
      '✅ Ajuste guardado',
      `Nueva velocidad: ${Math.round(newRate)} gtt/min<br/>Original: ${Math.round(originalResult.dropsPerMinute)} gtt/min`
    );
  }

  recordCalculation(result) {
    // Guardar en IndexedDB para historial
    // TODO: Implementar grabación de cálculos
    console.log('Cálculo registrado:', result);
  }
}

// Inicializar cuando el módulo esté listo
document.addEventListener('DOMContentLoaded', () => {
  new GoteoModule();
});
