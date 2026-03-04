/**
 * FORMATTERS.JS
 * Formateo de datos para presentación clínica
 */

class Formatters {
  /**
   * Formatear número con decimales y símbolo de unidad
   */
  static formatNumber(value, decimals = 2, unit = '') {
    if (!value && value !== 0) return '-';
    const num = parseFloat(value);
    return `${num.toFixed(decimals)}${unit ? ' ' + unit : ''}`;
  }

  /**
   * Formatear velocidad de goteo
   */
  static formatDropRate(dropsPerMinute, type = 'macrogotero') {
    const gtt = parseFloat(dropsPerMinute).toFixed(0);
    const status = parseFloat(dropsPerMinute) > 150 ? '⚠️' : '✓';
    return `${status} ${gtt} gtt/min`;
  }

  /**
   * Formatear volumen
   */
  static formatVolume(mL) {
    const vol = parseFloat(mL);
    if (vol < 1000) {
      return `${vol.toFixed(1)} mL`;
    }
    return `${(vol / 1000).toFixed(2)} L`;
  }

  /**
   * Formatear tiempo de infusión
   */
  static formatInfusionTime(hours, minutes = 0) {
    const h = parseInt(hours);
    const m = parseInt(minutes);
    const parts = [];
    
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}min`);
    
    return parts.length > 0 ? parts.join(' ') : '0 min';
  }

  /**
   * Formatear duración en horas decimales a HH:MM
   */
  static formatHoursToHHMM(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  /**
   * Formatear dosis con unidad
   */
  static formatDose(dose, unit = 'mg') {
    if (!dose && dose !== 0) return '-';
    const d = parseFloat(dose);
    
    if (unit === 'mcg' && d >= 1000) {
      return `${(d / 1000).toFixed(2)} mg`;
    }
    
    return `${d.toFixed(2)} ${unit}`;
  }

  /**
   * Formatear peso
   */
  static formatWeight(kg) {
    if (!kg && kg !== 0) return '-';
    return `${parseFloat(kg).toFixed(2)} kg`;
  }

  /**
   * Formatear edad
   */
  static formatAge(age, unit = 'años') {
    const a = parseInt(age);
    if (a < 1) return `${Math.round(a * 12)} meses`;
    if (a < 18) return `${a} años`;
    return `${a} años`;
  }

  /**
   * Formatear fecha y hora
   */
  static formatDateTime(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  /**
   * Formatear solo hora
   */
  static formatTime(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }

  /**
   * Formatear solo fecha
   */
  static formatDate(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  /**
   * Formatear tiempo transcurrido (ej: "hace 5 minutos")
   */
  static formatTimeAgo(date) {
    const now = new Date();
    const then = typeof date === 'string' ? new Date(date) : date;
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return 'Hace unos segundos';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} horas`;
    
    return `Hace ${Math.floor(seconds / 86400)} días`;
  }

  /**
   * Formatear concentración
   */
  static formatConcentration(value, unit = 'mg/mL') {
    return `${parseFloat(value).toFixed(2)} ${unit}`;
  }

  /**
   * Formatear nombre de medicamento con presentación
   */
  static formatMedicationName(name, concentration = null, unit = null) {
    let formatted = name;
    
    if (concentration && unit) {
      formatted += ` (${concentration} ${unit})`;
    }
    
    return formatted;
  }

  /**
   * Formatear ruta de administración
   */
  static formatRoute(route) {
    const routes = {
      'IV': 'Intravenosa',
      'IM': 'Intramuscular',
      'SC': 'Subcutánea',
      'PO': 'Oral',
      'IV-inf': 'Infusión IV',
      'TOP': 'Tópica',
      'INHA': 'Inhalada',
      'PR': 'Rectal'
    };
    
    return routes[route] || route;
  }

  /**
   * Formatear estado de medicación
   */
  static formatMedicationStatus(status) {
    const statuses = {
      'pending': '⏳ Pendiente',
      'administered': '✅ Administrada',
      'withheld': '❌ Omitida',
      'delayed': '⚠️ Retrasada',
      'not-needed': '🚫 No requerida'
    };
    
    return statuses[status] || status;
  }

  /**
   * Formatear texto clínico (capitalizar, limpiar)
   */
  static formatClinicalText(text) {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + text.slice(1);
  }

  /**
   * Formatear velocidad de infusión (mL/h)
   */
  static formatInfusionRate(mlPerHour) {
    if (!mlPerHour && mlPerHour !== 0) return '-';
    return `${parseFloat(mlPerHour).toFixed(1)} mL/h`;
  }

  /**
   * Crear resumen de cálculo (para mostrar trabajo realizado)
   */
  static createCalculationSummary(formula, values, result) {
    return `
      <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: var(--spacing-lg); border-top: 1px solid var(--border); padding-top: var(--spacing-md);">
        <strong>Cálculo realizado:</strong><br/>
        <code style="background: var(--surface-alt); padding: var(--spacing-sm); border-radius: var(--radius-md); display: block; overflow-x: auto;">
          ${formula}
        </code>
        <div style="margin-top: var(--spacing-sm);">
          ${Object.entries(values).map(([k, v]) => 
            `<div>${k}: <strong>${v}</strong></div>`
          ).join('')}
        </div>
        <div style="margin-top: var(--spacing-md); font-weight: 600; color: var(--primary);">
          Resultado: ${result}
        </div>
      </div>
    `;
  }

  /**
   * Formatear para imprimir/exportar
   */
  static formatForPrint(data) {
    const formatted = [];
    
    for (const [key, value] of Object.entries(data)) {
      formatted.push(`${key}: ${value}`);
    }
    
    return formatted.join('\n');
  }
}

// Instancia global
const formatters = Formatters;
