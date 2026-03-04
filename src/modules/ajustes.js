/**
 * AJUSTES.JS
 * Módulo de configuración y ajustes
 * Tema, autorización, reseteo, backup
 */

class AjustesModule {
  constructor() {
    this.container = document.querySelector('.ajustes-container');
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <!-- APARIENCIA -->
      <div class="card fade-in">
        <div class="card__header">
          <h3 class="card__title">🎨 Apariencia</h3>
        </div>

        <div class="card__content">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md); border: 1px solid var(--border); border-radius: var(--radius-md);">
            <div>
              <div style="font-weight: 600;">Tema Oscuro</div>
              <div style="color: var(--text-muted); font-size: 0.9rem;">Para guardias nocturnas</div>
            </div>
            <button id="themeToggleBtn" class="btn btn-secondary" style="margin: 0;">
              🌙 Cambiar
            </button>
          </div>

          <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: var(--surface-alt); border-radius: var(--radius-md);">
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              Tema actual
            </div>
            <div style="font-weight: 600; color: var(--primary);" id="currentTheme">
              Claro
            </div>
          </div>
        </div>
      </div>

      <!-- SEGURIDAD -->
      <div class="card" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h3 class="card__title">🔐 Seguridad</h3>
        </div>

        <div class="card__content">
          <div class="form-group">
            <label class="form-label">Clave de Autorización (para acciones críticas)</label>
            <input 
              type="password" 
              id="authCode" 
              class="form-input input-lg" 
              placeholder="••••••"
              maxlength="6"
            >
            <div class="form-help">Mínimo 4 dígitos. Predeterminado: 0000</div>
          </div>

          <button class="btn btn-primary btn-block" id="setAuthBtn">
            🔑 ESTABLECER CLAVE
          </button>

          <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: var(--surface-alt); border-radius: var(--radius-md);">
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              ℹ️ La clave se requerirá para:
            </div>
            <ul style="margin: 0; padding-left: var(--spacing-lg); color: var(--text-main);">
              <li>Administrar dosis excesivas</li>
              <li>Omitir medicaciones</li>
              <li>Acceder a funciones críticas</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- INFORMACIÓN Y SINCRONIZACIÓN -->
      <div class="card" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h3 class="card__title">💾 Datos y Sincronización</h3>
        </div>

        <div class="card__content">
          <div style="padding: var(--spacing-lg); background: var(--surface-alt); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
              Registros almacenados
            </div>
            <div style="font-size: 1.5rem; font-weight: 600; color: var(--primary);" id="recordCount">
              0
            </div>
          </div>

          <button class="btn btn-primary btn-block" id="backupBtn">
            📦 REALIZAR BACKUP
          </button>

          <button class="btn btn-secondary btn-block" id="exportDataBtn" style="margin-top: var(--spacing-md);">
            📥 EXPORTAR DATOS (JSON)
          </button>

          <button class="btn btn-secondary btn-block" id="importDataBtn" style="margin-top: var(--spacing-md);">
            📤 IMPORTAR DATOS
          </button>
        </div>
      </div>

      <!-- INFORMACIÓN DEL SISTEMA -->
      <div class="card" style="margin-top: var(--spacing-lg);">
        <div class="card__header">
          <h3 class="card__title">ℹ️ Información del Sistema</h3>
        </div>

        <div class="card__content">
          <div class="row" style="grid-template-columns: 1fr; gap: var(--spacing-md);">
            <div style="display: flex; justify-content: space-between; padding: var(--spacing-md); border: 1px solid var(--border); border-radius: var(--radius-md);">
              <div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Versión</div>
                <div style="font-weight: 600;">1.0.0</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; padding: var(--spacing-md); border: 1px solid var(--border); border-radius: var(--radius-md);">
              <div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Base de Datos</div>
                <div style="font-weight: 600;">IndexedDB (Offline)</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; padding: var(--spacing-md); border: 1px solid var(--border); border-radius: var(--radius-md);">
              <div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Plataforma</div>
                <div style="font-weight: 600;">Web (Capacitor APK)</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; padding: var(--spacing-md); border: 1px solid var(--border); border-radius: var(--radius-md);">
              <div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Medicamentos</div>
                <div style="font-weight: 600;" id="medCount">-</div>
              </div>
            </div>
          </div>

          <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: var(--success); color: white; border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 600; font-size: 0.95rem;">✅ Sistema Completamente Offline</div>
            <div style="font-size: 0.85rem; opacity: 0.9; margin-top: var(--spacing-xs);">Funciona sin conexión a internet</div>
          </div>
        </div>
      </div>

      <!-- PELIGRO -->
      <div class="card" style="margin-top: var(--spacing-lg); border-color: var(--danger);">
        <div class="card__header">
          <h3 class="card__title" style="color: var(--danger);">⚠️ Zona de Peligro</h3>
          <p class="card__subtitle">Acciones irreversibles</p>
        </div>

        <div class="card__content">
          <button class="btn btn-danger btn-block" id="resetBtn">
            🔄 RESETEAR APLICACIÓN
          </button>
          <div class="form-help">Eliminará TODOS los datos locales. No se puede deshacer.</div>

          <button class="btn btn-secondary btn-block" id="clearCacheBtn" style="margin-top: var(--spacing-lg);">
            🧹 LIMPIAR CACHÉ
          </button>
        </div>
      </div>

      <!-- ABOUT -->
      <div class="card" style="margin-top: var(--spacing-lg); background: var(--surface-alt);">
        <div class="card__content" style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">💉</div>
          <h3 style="margin-bottom: var(--spacing-sm);">NurseApp</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
            Sistema Clínico Offline para Administración de Medicamentos<br/>
            <strong>v1.0.0</strong> • Seguro • Funcional • Offline-First<br/>
            <br/>
            Diseñado para enfermería y personal médico en contextos críticos.
          </p>
        </div>
      </div>
    `;

    this.loadSystemInfo();
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      if (app) {
        app.toggleTheme();
        this.updateThemeDisplay();
      }
    });

    document.getElementById('setAuthBtn').addEventListener('click', () => {
      this.setAuthCode();
    });

    document.getElementById('backupBtn').addEventListener('click', () => {
      this.performBackup();
    });

    document.getElementById('exportDataBtn').addEventListener('click', () => {
      this.exportData();
    });

    document.getElementById('importDataBtn').addEventListener('click', () => {
      // Implementar importación
      alertManager.showInfo('Importación', 'Función en desarrollo');
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (app) {
        app.resetApp();
      }
    });

    document.getElementById('clearCacheBtn').addEventListener('click', () => {
      this.clearCache();
    });
  }

  updateThemeDisplay() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Oscuro' : 'Claro';
    document.getElementById('currentTheme').textContent = theme;
  }

  async loadSystemInfo() {
    const medications = await nurseDB.getAllMedications();
    document.getElementById('medCount').textContent = medications.length;
  }

  setAuthCode() {
    const code = document.getElementById('authCode').value;

    if (!code) {
      alertManager.showWarning('Validación', 'Ingrese una clave');
      return;
    }

    if (code.length < 4) {
      alertManager.showWarning('Validación', 'La clave debe tener al menos 4 dígitos');
      return;
    }

    nurseDB.setConfig('authCode', code);
    alertManager.showSuccess('Seguridad', 'Clave establecida ✓');
    document.getElementById('authCode').value = '';
  }

  async performBackup() {
    try {
      app.showLoading(true);
      const data = await app.getExportData();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `nursapp-backup-${timestamp}.json`;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      app.showLoading(false);
      alertManager.showSuccess('Backup', `Descargado: ${filename}`);
    } catch (error) {
      app.showLoading(false);
      alertManager.showDanger('Error', 'No se pudo realizar el backup');
    }
  }

  async exportData() {
    try {
      const data = await app.getExportData();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `nursapp-export-${timestamp}.json`;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alertManager.showSuccess('Exportación', `Archivo: ${filename}`);
    } catch (error) {
      alertManager.showDanger('Error', 'No se pudo exportar los datos');
    }
  }

  clearCache() {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
      alertManager.showSuccess('Caché', 'Limpiado correctamente ✓');
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new AjustesModule();
});
