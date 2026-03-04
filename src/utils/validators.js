/**
 * VALIDATORS.JS
 * Validaciones clínicas y de seguridad
 */

class ClinicalValidator {
  /**
   * Validar volumen (en mL)
   */
  static validateVolume(volume) {
    if (!volume || isNaN(volume)) {
      return { valid: false, error: 'Volumen requerido' };
    }
    const vol = parseFloat(volume);
    if (vol <= 0) {
      return { valid: false, error: 'Volumen debe ser mayor a 0' };
    }
    if (vol > 5000) {
      return { valid: false, error: 'Volumen excede límite seguro (5000 mL)' };
    }
    return { valid: true };
  }

  /**
   * Validar tiempo de infusión (en horas)
   */
  static validateInfusionTime(hours, minutes = 0) {
    const total = parseFloat(hours) + parseFloat(minutes) / 60;
    if (total <= 0) {
      return { valid: false, error: 'Tiempo de infusión debe ser mayor a 0' };
    }
    if (total > 24) {
      return { valid: false, error: 'Tiempo no puede exceder 24 horas' };
    }
    return { valid: true };
  }

  /**
   * Validar concentración de medicamento
   */
  static validateConcentration(concentration, unit = 'mg/mL') {
    if (!concentration || isNaN(concentration)) {
      return { valid: false, error: 'Concentración requerida' };
    }
    const conc = parseFloat(concentration);
    if (conc <= 0) {
      return { valid: false, error: 'Concentración debe ser mayor a 0' };
    }
    return { valid: true };
  }

  /**
   * Validar dosis
   */
  static validateDose(dose, minDose, maxDose, weight = null) {
    if (!dose || isNaN(dose)) {
      return { valid: false, error: 'Dosis requerida' };
    }

    const d = parseFloat(dose);

    if (d <= 0) {
      return { valid: false, error: 'Dosis debe ser mayor a 0' };
    }

    if (minDose && d < minDose) {
      return { 
        valid: false, 
        error: `Dosis por debajo del mínimo (${minDose})`,
        severity: 'warning'
      };
    }

    if (maxDose && d > maxDose) {
      return { 
        valid: false, 
        error: `Dosis excede el máximo seguro (${maxDose})`,
        severity: 'critical'
      };
    }

    return { valid: true };
  }

  /**
   * Validar cálculo de goteo (gtt/min)
   */
  static validateDropRate(dropsPerMinute, maxRate = 200) {
    if (!dropsPerMinute || isNaN(dropsPerMinute)) {
      return { valid: false, error: 'Velocidad de goteo requerida' };
    }

    const rate = parseFloat(dropsPerMinute);

    if (rate <= 0) {
      return { valid: false, error: 'Velocidad debe ser mayor a 0' };
    }

    if (rate > maxRate) {
      return { 
        valid: false, 
        error: `⚠️ VELOCIDAD EXCESIVA: ${rate} gtt/min (máx: ${maxRate})`,
        severity: 'critical'
      };
    }

    // Alerta si es muy rápido (80% del máximo)
    if (rate > maxRate * 0.8) {
      return { 
        valid: true,
        warning: `Velocidad alta: ${rate} gtt/min. Revisar prescripción.`,
        severity: 'warning'
      };
    }

    return { valid: true };
  }

  /**
   * Validar pH de medicamento (para compatibilidad)
   */
  static validatePHCompatibility(medicationPH, solutionPH) {
    const diff = Math.abs(medicationPH - solutionPH);
    if (diff > 2) {
      return { 
        valid: false,
        error: 'Medicamento incompatible con la solución (diferencia de pH)',
        severity: 'critical'
      };
    }
    return { valid: true };
  }

  /**
   * Validar estabilidad del medicamento
   */
  static validateMedicationStability(medication, temperature = 20) {
    if (!medication.stability) {
      return { valid: true };
    }

    const { minTemp, maxTemp, maxHours } = medication.stability;

    if (temperature < minTemp || temperature > maxTemp) {
      return {
        valid: false,
        error: `Temperatura fuera de rango (${minTemp}°C - ${maxTemp}°C)`,
        severity: 'warning'
      };
    }

    return { 
      valid: true,
      warning: `Estabilidad: máximo ${maxHours} horas a ${temperature}°C`
    };
  }

  /**
   * Validar peso del paciente
   */
  static validatePatientWeight(weight, type = 'adult') {
    if (!weight || isNaN(weight)) {
      return { valid: false, error: 'Peso requerido' };
    }

    const w = parseFloat(weight);
    const ranges = {
      adult: { min: 30, max: 200 },
      pediatric: { min: 2, max: 100 },
      neonatal: { min: 0.5, max: 5 }
    };

    const range = ranges[type] || ranges.adult;

    if (w < range.min || w > range.max) {
      return {
        valid: false,
        error: `Peso fuera de rango esperado (${range.min}-${range.max} kg)`,
        severity: 'warning'
      };
    }

    return { valid: true };
  }

  /**
   * Validar edad del paciente
   */
  static validatePatientAge(age) {
    if (!age || isNaN(age)) {
      return { valid: false, error: 'Edad requerida' };
    }

    const a = parseInt(age);
    if (a < 0 || a > 120) {
      return { valid: false, error: 'Edad no válida' };
    }

    return { valid: true };
  }

  /**
   * Obtener categoría de paciente por edad
   */
  static getPatientCategory(age) {
    const a = parseInt(age);
    if (a < 1) return 'neonatal';
    if (a < 12) return 'pediatric-infant';
    if (a < 18) return 'pediatric-adolescent';
    if (a < 65) return 'adult';
    return 'geriatric';
  }

  /**
   * Validar código de autorización (simple)
   */
  static validateAuthCode(code, correctCode = '0000') {
    return code === correctCode;
  }

  /**
   * Validar tiempo de re-evaluación
   */
  static validateReevaluationTime(lastCheck, maxMinutes = 30) {
    const now = new Date();
    const diff = (now - new Date(lastCheck)) / (1000 * 60); // diferencia en minutos
    
    if (diff > maxMinutes) {
      return {
        valid: false,
        error: `Medicamento requiere re-evaluación (última: hace ${Math.round(diff)} min)`,
        severity: 'warning'
      };
    }

    return { valid: true };
  }

  /**
   * Validar infusión simultánea (incompatibilidades)
   */
  static validateSimultaneousInfusions(medications) {
    const incompatibilities = {
      'ampicilina': ['aminoglucósidos', 'vancomicina'],
      'vancomicina': ['ampicilina', 'ceftriaxona'],
      'furosemida': ['ceftriaxona', 'cisplatino'],
      'heparina': ['morfina', 'vancomicina']
    };

    const warnings = [];
    
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i].name.toLowerCase();
        const med2 = medications[j].name.toLowerCase();

        if (incompatibilities[med1] && 
            incompatibilities[med1].some(incompat => med2.includes(incompat))) {
          warnings.push(`⚠️ Posible incompatibilidad: ${med1} + ${med2}`);
        }
      }
    }

    return {
      valid: warnings.length === 0,
      warnings,
      severity: warnings.length > 0 ? 'warning' : 'info'
    };
  }
}

// Instancia global
const validator = new ClinicalValidator();
