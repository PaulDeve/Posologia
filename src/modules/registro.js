/**
 * REGISTRO.JS
 * Módulo de registro - Historial de medicaciones
 * Búsqueda, edición y exportación
 */

class RegistroModule {
  constructor() {
    this.container = document.querySelector('.registro-container');
    this.allRecords = [];
    this.filteredRecords = [];
    this.filterStatus = 'all';

    this.init();
  }

  init() {
    this.loadRecords();
    this.render();
    this.attachEventListeners();
  }

  async loadRecords() {
    // TODO: Cargar registros de todos los pacientes
    // Por ahora usamos registros de ejemplo
    this.allRecords = [];
  }

  render() {
    this.container.innerHTML = `
      <div class="card fade-in">
        <div class="card__header">
          <h3 class="card__title">Registro de Medicaciones</h3>
          <p class="card__subtitle">Historial completo y auditoría</p>
        </div>

        <div class="card__content">
          <!-- FILTROS -->
          <div class="form-group">
            <label class="form-label">Filtrar por estado</label>
            <select id="filterStatus" class="form-input">
              <option value="all">Todas</option>
              <option value="administrada">Administradas</option>
              <option value="pendiente">Pendientes</option>
              <option value="omitida">Omitidas</option>
              <option value="retrasada">Retrasadas</option>
            </select>
          </div>

          <!-- BÚSQUEDA -->
          <div class="form-group">
            <label class="form-label">Buscar medicamento o paciente</label>
            <input 
              type="text" 
              id="searchInput" 
              class="form-input input-lg" 
              placeholder="Nombre del medicamento o paciente..."
            >
          </div>

          <!-- RANGO DE FECHAS -->
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label class="form-label">Desde</label>
                <input type="date" id="dateFrom" class="form-input">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label class="form-label">Hasta</label>
                <input type="date" id="dateTo" class="form-input">
              </div>
            </div>
          </div>

          <!-- BOTONES -->
          <div class="btn-group">
            <button class="btn btn-primary btn-block" id="searchBtn">
              🔍 BUSCAR
            </button>
            <button class="btn btn-secondary btn-block" id="exportBtn">
              📥 EXPORTAR
            </button>
          </div>
        </div>
      </div>

      <!-- RESULTADOS -->
      <div id="resultsSection" style="margin-top: var(--spacing-lg);"></div>
    `;

    this.displayRecords(this.allRecords);
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.getElementById('filterStatus').addEventListener('change', (e) => {
      this.filterStatus = e.target.value;
      this.applyFilters();
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
      this.applyFilters();
    });

    document.getElementById('searchInput').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.applyFilters();
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportRecords();
    });
  }

  applyFilters() {
    let filtered = [...this.allRecords];

    // Filtro por estado
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === this.filterStatus);
    }

    // Búsqueda por texto
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.medication?.toLowerCase().includes(searchTerm) ||
        r.patientName?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de fechas
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;

    if (dateFrom || dateTo) {
      filtered = filtered.filter(r => {
        const recordDate = new Date(r.timestamp);
        if (dateFrom && recordDate < new Date(dateFrom)) return false;
        if (dateTo && recordDate > new Date(dateTo)) return false;
        return true;
      });
    }

    this.displayRecords(filtered);
  }

  displayRecords(records) {
    const resultsDiv = document.getElementById('resultsSection');

    if (records.length === 0) {
      resultsDiv.innerHTML = `
        <div style="text-align: center; padding: var(--spacing-2xl); color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">📭</div>
          <div>No hay registros para mostrar</div>
        </div>
      `;
      return;
    }

    resultsDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
        <h3 style="margin: 0;">Registros encontrados: <strong>${records.length}</strong></h3>
      </div>
    ` + records.map(record => this.renderRecord(record)).join('');
  }

  renderRecord(record) {
    const statusIcon = {
      administrada: '✅',
      pendiente: '⏳',
      omitida: '❌',
      retrasada: '⚠️'
    }[record.status] || '•';

    return `
      <div class="card" style="margin-bottom: var(--spacing-lg);">
        <div class="card__header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <h4 class="card__title">${statusIcon} ${record.medication}</h4>
              <p class="card__subtitle">
                ${record.patientName ? `Paciente: ${record.patientName}` : 'Registro'}
              </p>
            </div>
            <div class="badge" style="margin-left: var(--spacing-md);">
              ${record.status}
            </div>
          </div>
        </div>

        <div class="card__content">
          <div class="row">
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem;">Dosis</div>
              <div style="font-weight: 600;">${record.dose || 'N/A'}</div>
            </div>
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem;">Ruta</div>
              <div style="font-weight: 600;">${record.route || 'N/A'}</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="row">
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem;">Registrado por</div>
              <div style="font-weight: 600;">${record.registeredBy || 'Sistema'}</div>
            </div>
            <div class="col">
              <div style="color: var(--text-muted); font-size: 0.9rem;">Hora</div>
              <div style="font-weight: 600;">${Formatters.formatDateTime(record.timestamp)}</div>
            </div>
          </div>

          ${record.notes ? `
            <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background: var(--surface-alt); border-radius: var(--radius-md);">
              <strong style="font-size: 0.9rem; color: var(--text-muted);">Notas:</strong><br/>
              <div style="margin-top: var(--spacing-xs);">${record.notes}</div>
            </div>
          ` : ''}

          <div class="btn-group" style="margin-top: var(--spacing-lg);">
            <button class="btn btn-secondary btn-sm" data-record-id="${record.id}">
              📝 EDITAR
            </button>
            <button class="btn btn-secondary btn-sm" data-record-id="${record.id}">
              🗑️ ELIMINAR
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async exportRecords() {
    const records = this.filteredRecords.length > 0 ? this.filteredRecords : this.allRecords;

    if (records.length === 0) {
      alertManager.showWarning('Exportación', 'No hay registros para exportar');
      return;
    }

    // Formato CSV
    const csv = this.generateCSV(records);

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `medicaciones-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alertManager.showSuccess('Exportación', 'Archivo descargado ✓');
  }

  generateCSV(records) {
    const headers = ['Medicamento', 'Paciente', 'Dosis', 'Ruta', 'Estado', 'Registrado por', 'Fecha y Hora', 'Notas'];
    const rows = records.map(r => [
      r.medication,
      r.patientName || '-',
      r.dose || '-',
      r.route || '-',
      r.status,
      r.registeredBy || '-',
      Formatters.formatDateTime(r.timestamp),
      r.notes || '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new RegistroModule();
});
