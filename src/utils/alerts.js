/**
 * ALERTS.JS
 * Sistema de alertas visuales y notificaciones
 */

class AlertManager {
  constructor() {
    this.container = document.getElementById('alertsContainer');
    this.alerts = [];
  }

  /**
   * Mostrar alerta informativa (azul)
   */
  showInfo(title, message, duration = 4000) {
    return this.show({
      type: 'info',
      title,
      message,
      duration,
      closable: true
    });
  }

  /**
   * Mostrar advertencia (amarillo)
   */
  showWarning(title, message, duration = 5000) {
    return this.show({
      type: 'warning',
      title,
      message,
      duration,
      closable: true
    });
  }

  /**
   * Mostrar error/peligro (rojo)
   */
  showDanger(title, message, duration = 6000) {
    return this.show({
      type: 'danger',
      title,
      message,
      duration,
      closable: true
    });
  }

  /**
   * Mostrar éxito (verde)
   */
  showSuccess(title, message, duration = 3000) {
    return this.show({
      type: 'success',
      title,
      message,
      duration,
      closable: true
    });
  }

  /**
   * Alerta bloqueante (modal) - requiere acción del usuario
   */
  showModal(options) {
    return new Promise((resolve) => {
      const {
        type = 'warning',
        title = 'Atención',
        message = '',
        buttons = [
          { text: 'Aceptar', action: 'accept', style: 'primary' }
        ]
      } = options;

      const modal = document.createElement('div');
      modal.className = 'alert-modal';
      modal.innerHTML = `
        <div class="alert-modal__content">
          <div class="alert-modal__header">
            <span class="alert-modal__icon">${this._getIcon(type)}</span>
            <h2 class="alert-modal__title">${title}</h2>
            <button class="alert-modal__close" aria-label="Cerrar">&times;</button>
          </div>
          <div class="alert-modal__body">
            ${message}
          </div>
          <div class="alert-modal__actions">
            ${buttons.map(btn => `
              <button class="btn btn-${btn.style || 'secondary'}" data-action="${btn.action}">
                ${btn.text}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeModal = () => {
        modal.classList.add('closing');
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      };

      // Cerrar con botón X
      modal.querySelector('.alert-modal__close').addEventListener('click', () => {
        closeModal();
        resolve(null);
      });

      // Acciones de botones
      modal.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          closeModal();
          resolve(action);
        });
      });

      // Cerrar al hacer clic fuera
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
          resolve(null);
        }
      });
    });
  }

  /**
   * Alerta de confirmación crítica (con contraseña opcional)
   */
  async showCriticalConfirmation(title, message, requirePassword = false) {
    const buttons = [
      { text: 'Cancelar', action: 'cancel', style: 'secondary' },
      { text: 'Confirmar', action: 'confirm', style: 'danger' }
    ];

    let passwordField = '';
    if (requirePassword) {
      passwordField = `
        <div class="form-group mt-md">
          <label class="form-label">Clave de autorización</label>
          <input type="password" id="authPassword" class="form-input input-lg" placeholder="Ingrese clave">
        </div>
      `;
    }

    const result = await this.showModal({
      type: 'danger',
      title,
      message: `
        <div style="color: var(--text-main);">
          <p><strong>${message}</strong></p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            Esta es una acción crítica y requiere confirmación.
          </p>
          ${passwordField}
        </div>
      `,
      buttons
    });

    if (requirePassword && result === 'confirm') {
      const password = document.getElementById('authPassword')?.value;
      return { confirmed: true, password };
    }

    return { confirmed: result === 'confirm' };
  }

  /**
   * Mostrar alerta genérica (privada)
   */
  show(options) {
    const {
      type = 'info',
      title = '',
      message = '',
      duration = 4000,
      closable = true
    } = options;

    const alert = document.createElement('div');
    const id = `alert-${Date.now()}`;
    alert.id = id;
    alert.className = `alert alert-${type} fade-in`;
    alert.innerHTML = `
      <span class="alert__icon">${this._getIcon(type)}</span>
      <div class="alert__content">
        ${title ? `<div class="alert__title">${title}</div>` : ''}
        <p class="alert__message">${message}</p>
      </div>
      ${closable ? '<button class="alert__close" aria-label="Cerrar">&times;</button>' : ''}
    `;

    this.container.appendChild(alert);
    this.alerts.push(id);

    // Botón cerrar
    if (closable) {
      alert.querySelector('.alert__close').addEventListener('click', () => {
        this.close(id);
      });
    }

    // Auto-cerrar después de duration
    if (duration > 0) {
      setTimeout(() => {
        this.close(id);
      }, duration);
    }

    return id;
  }

  /**
   * Cerrar alerta
   */
  close(id) {
    const alert = document.getElementById(id);
    if (alert) {
      alert.classList.add('closing');
      setTimeout(() => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
        this.alerts = this.alerts.filter(a => a !== id);
      }, 300);
    }
  }

  /**
   * Cerrar todas las alertas
   */
  closeAll() {
    this.alerts.forEach(id => this.close(id));
  }

  /**
   * Toast flotante (notificación simple)
   */
  showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast fade-in';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('closing');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }

  /**
   * Obtener icono según tipo
   */
  _getIcon(type) {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      danger: '❌',
      success: '✅',
      critical: '🚨'
    };
    return icons[type] || '•';
  }

  /**
   * Mostrar alerta de velocidad excesiva (específica para goteo)
   */
  showExcessiveSpeedAlert(currentSpeed, maxSpeed) {
    return this.show({
      type: 'danger',
      title: '⚠️ VELOCIDAD EXCESIVA',
      message: `
        <strong>Riesgo de Sobredosis</strong><br/>
        Velocidad actual: <strong>${currentSpeed}</strong><br/>
        Máximo seguro: <strong>${maxSpeed}</strong><br/>
        <span style="font-size: 0.9rem; color: var(--text-muted);">
          Ajuste los parámetros o confirme con clave de autorización
        </span>
      `,
      duration: 6000
    });
  }

  /**
   * Alerta de incompatibilidad de medicamentos
   */
  showIncompatibilityAlert(medications) {
    const medList = medications.map(m => `• ${m.name}`).join('<br/>');
    return this.show({
      type: 'warning',
      title: '⚠️ POSIBLE INCOMPATIBILIDAD',
      message: `
        Los siguientes medicamentos pueden ser incompatibles:<br/>
        ${medList}<br/>
        <span style="font-size: 0.9rem; color: var(--text-muted);">
          Revisar con el prescriptor antes de administrar
        </span>
      `,
      duration: 7000
    });
  }
}

// Instancia global
const alertManager = new AlertManager();
