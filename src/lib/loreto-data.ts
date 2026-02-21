export const LORETO_DATA = {
  diresa: {
    id: '16',
    codigo: 'DIRESA-LORETO',
    nombre: 'LORETO',
    pais: 'Perú'
  },
  redes: [
    { id: '1601', codigo: 'RED-MAYNAS-CIUDAD', nombre: 'MAYNAS - CIUDAD', diresaId: '16' },
    { id: '1602', codigo: 'RED-MAYNAS-PERIFERIE', nombre: 'MAYNAS PERIFERIE', diresaId: '16' },
    { id: '1603', codigo: 'RED-RAMON-CASTILLA', nombre: 'RAMON CASTILLA', diresaId: '16' },
    { id: '1604', codigo: 'RED-LORETO', nombre: 'LORETO', diresaId: '16' },
    { id: '1605', codigo: 'RED-UCAYALI', nombre: 'UCAYALI', diresaId: '16' },
    { id: '1606', codigo: 'RED-REQUENA', nombre: 'REQUENA', diresaId: '16' },
    { id: '1607', codigo: 'RED-ALTO-AMAZONAS', nombre: 'ALTO AMAZONAS', diresaId: '16' },
    { id: '1608', codigo: 'RED-DAMTEM', nombre: 'DAMTEM', diresaId: '16' },
    { id: '1609', codigo: 'RED-SANIDAD', nombre: 'SANIDAD', diresaId: '16' },
  ],
  microrredes: {
    '1601': [
      { id: '160101', codigo: 'MR-IQUITOS', nombre: 'IQUITOS', redId: '1601' },
      { id: '160102', codigo: 'MR-BELEN', nombre: 'BELEN', redId: '1601' },
      { id: '160103', codigo: 'MR-PUNCHANA', nombre: 'PUNCHANA', redId: '1601' },
      { id: '160104', codigo: 'MR-SAN JUAN', nombre: 'SAN JUAN', redId: '1601' },
    ],
    '1602': [
      { id: '160201', codigo: 'MR-NANAY', nombre: 'NANAY', redId: '1602' },
      { id: '160202', codigo: 'MR-INDIANA', nombre: 'INDIANA', redId: '1602' },
      { id: '160203', codigo: 'MR-FORDIA', nombre: 'FORDIA', redId: '1602' },
      { id: '160204', codigo: 'MR-ALTO NANAY', nombre: 'ALTO NANAY', redId: '1602' },
    ],
    '1603': [
      { id: '160301', codigo: 'MR-RAMON CASTILLA', nombre: 'RAMON CASTILLA', redId: '1603' },
      { id: '160302', codigo: 'MR-YAVARI', nombre: 'YAVARI', redId: '1603' },
      { id: '160303', codigo: 'MR-JENARO HERRERA', nombre: 'JENARO HERRERA', redId: '1603' },
    ],
    '1604': [
      { id: '160401', codigo: 'MR-NUEVA YORK', nombre: 'NUEVA YORK', redId: '1604' },
      { id: '160402', codigo: 'MR-TROMPETEROS', nombre: 'TROMPETEROS', redId: '1604' },
      { id: '160403', codigo: 'MR-GENERAL VILLAR', nombre: 'GENERAL VILLAR', redId: '1604' },
    ],
    '1605': [
      { id: '160501', codigo: 'MR-CONTAMANA', nombre: 'CONTAMANA', redId: '1605' },
      { id: '160502', codigo: 'MR-PADRE ABAD', nombre: 'PADRE ABAD', redId: '1605' },
      { id: '160503', codigo: 'MR-CURIMANA', nombre: 'CURIMANA', redId: '1605' },
    ],
    '1606': [
      { id: '160601', codigo: 'MR-REQUENA', nombre: 'REQUENA', redId: '1606' },
      { id: '160602', codigo: 'MR-EMILIO', nombre: 'EMILIO', redId: '1606' },
      { id: '160603', codigo: 'MR-CAPAHUARI', nombre: 'CAPAHUARI', redId: '1606' },
    ],
    '1607': [
      { id: '160701', codigo: 'MR-IURMAGUAS', nombre: 'IURMAGUAS', redId: '1607' },
      { id: '160702', codigo: 'MR-YSOPOLIS', nombre: 'YSOPOLIS', redId: '1607' },
      { id: '160703', codigo: 'MR-CHAVASQUI', nombre: 'CHAVASQUI', redId: '1607' },
    ],
    '1608': [
      { id: '160801', codigo: 'MR-DAMTEM', nombre: 'DAMTEM', redId: '1608' },
      { id: '160802', codigo: 'MR-FRANCISCO', nombre: 'FRANCISCO', redId: '1608' },
    ],
    '1609': [
      { id: '160901', codigo: 'MR-SANIDAD', nombre: 'SANIDAD', redId: '1609' },
    ],
  },
  establecimientos: {
    '160101': [
      { id: '16010101', codigo: 'I-4-001', nombre: 'Hospital Regional de Loreto', microrredId: '160101', nivel: 'I-4', tipo: 'MINSA' },
      { id: '16010102', codigo: 'I-3-001', nombre: 'Centro de Salud Iquitos', microrredId: '160101', nivel: 'I-3', tipo: 'MINSA' },
      { id: '16010103', codigo: 'I-2-001', nombre: 'Centro de Salud Santa Rosa', microrredId: '160101', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160102': [
      { id: '16010201', codigo: 'I-3-002', nombre: 'Centro de Salud Belen', microrredId: '160102', nivel: 'I-3', tipo: 'MINSA' },
      { id: '16010202', codigo: 'I-2-002', nombre: 'Puesto de Salud 9 de Octubre', microrredId: '160102', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160103': [
      { id: '16010301', codigo: 'I-3-003', nombre: 'Centro de Salud Punchana', microrredId: '160103', nivel: 'I-3', tipo: 'MINSA' },
    ],
    '160104': [
      { id: '16010401', codigo: 'I-2-003', nombre: 'Centro de Salud San Juan', microrredId: '160104', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160201': [
      { id: '16020101', codigo: 'I-2-004', nombre: 'Centro de Salud Nanay', microrredId: '160201', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160202': [
      { id: '16020201', codigo: 'I-1-001', nombre: 'Puesto de Salud Indiana', microrredId: '160202', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160203': [
      { id: '16020301', codigo: 'I-1-002', nombre: 'Puesto de Salud Fordia', microrredId: '160203', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160204': [
      { id: '16020401', codigo: 'I-1-003', nombre: 'Puesto de Salud Alto Nanay', microrredId: '160204', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160301': [
      { id: '16030101', codigo: 'I-2-005', nombre: 'Centro de Salud Ramon Castilla', microrredId: '160301', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160302': [
      { id: '16030201', codigo: 'I-1-004', nombre: 'Puesto de Salud Yavari', microrredId: '160302', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160303': [
      { id: '16030301', codigo: 'I-1-005', nombre: 'Puesto de Salud Jenaro Herrera', microrredId: '160303', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160401': [
      { id: '16040101', codigo: 'I-2-006', nombre: 'Centro de Salud Nueva York', microrredId: '160401', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160402': [
      { id: '16040201', codigo: 'I-1-006', nombre: 'Puesto de Salud Trompeteros', microrredId: '160402', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160403': [
      { id: '16040301', codigo: 'I-1-007', nombre: 'Puesto de Salud General Villar', microrredId: '160403', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160501': [
      { id: '16050101', codigo: 'I-2-007', nombre: 'Centro de Salud Contamana', microrredId: '160501', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160502': [
      { id: '16050201', codigo: 'I-2-008', nombre: 'Centro de Salud Padre Abad', microrredId: '160502', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160503': [
      { id: '16050301', codigo: 'I-1-008', nombre: 'Puesto de Salud Curimana', microrredId: '160503', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160601': [
      { id: '16060101', codigo: 'I-2-009', nombre: 'Centro de Salud Requena', microrredId: '160601', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160602': [
      { id: '16060201', codigo: 'I-1-009', nombre: 'Puesto de Salud Emilio', microrredId: '160602', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160603': [
      { id: '16060301', codigo: 'I-1-010', nombre: 'Puesto de Salud Capahuari', microrredId: '160603', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160701': [
      { id: '16070101', codigo: 'I-2-010', nombre: 'Centro de Salud Iurmaguas', microrredId: '160701', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160702': [
      { id: '16070201', codigo: 'I-1-011', nombre: 'Puesto de Salud Ysopolis', microrredId: '160702', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160703': [
      { id: '16070301', codigo: 'I-1-012', nombre: 'Puesto de Salud Chavasqui', microrredId: '160703', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160801': [
      { id: '16080101', codigo: 'I-2-011', nombre: 'Centro de Salud Damtem', microrredId: '160801', nivel: 'I-2', tipo: 'MINSA' },
    ],
    '160802': [
      { id: '16080201', codigo: 'I-1-013', nombre: 'Puesto de Salud Francisco', microrredId: '160802', nivel: 'I-1', tipo: 'MINSA' },
    ],
    '160901': [
      { id: '16090101', codigo: 'I-3-004', nombre: 'Centro de Salud Sanidar', microrredId: '160901', nivel: 'I-3', tipo: 'ESSALUD' },
    ],
  },
}

export const DEPARTAMENTOS_LORETO = [
  { id: '16', nombre: 'LORETO' }
]

export const PROVINCIAS_LORETO = [
  { id: '1601', nombre: 'MAYNAS', departamentoId: '16' },
  { id: '1602', nombre: 'LORETO', departamentoId: '16' },
  { id: '1603', nombre: 'UCAYALI', departamentoId: '16' },
  { id: '1604', nombre: 'RAMON CASTILLA', departamentoId: '16' },
  { id: '1605', nombre: 'ALTO AMAZONAS', departamentoId: '16' },
  { id: '1606', nombre: 'REQUENA', departamentoId: '16' },
  { id: '1607', nombre: 'MARISCAL RAMON CASTILLA', departamentoId: '16' },
  { id: '1608', nombre: 'PUTUMAYO', departamentoId: '16' },
]

export const DISTRITOS_LORETO: Record<string, { id: string; nombre: string; provinciaId: string }[]> = {
  '1601': [
    { id: '160101', nombre: 'IQUITOS', provinciaId: '1601' },
    { id: '160102', nombre: 'BELEN', provinciaId: '1601' },
    { id: '160103', nombre: 'PUNCHANA', provinciaId: '1601' },
    { id: '160104', nombre: 'SAN JUAN BAUTISTA', provinciaId: '1601' },
    { id: '160105', nombre: 'NANAY', provinciaId: '1601' },
    { id: '160106', nombre: 'TORRES CAUSANA', provinciaId: '1601' },
    { id: '160107', nombre: 'ALTO NANAY', provinciaId: '1601' },
    { id: '160108', nombre: 'PUTUMAYO', provinciaId: '1601' },
    { id: '160109', nombre: 'YAVARI', provinciaId: '1601' },
  ],
  '1602': [
    { id: '160201', nombre: 'TROMPETEROS', provinciaId: '1602' },
    { id: '160202', nombre: 'NUEVA YORK', provinciaId: '1602' },
    { id: '160203', nombre: 'BALSAPUERTO', provinciaId: '1602' },
  ],
  '1603': [
    { id: '160301', nombre: 'CALLERIA', provinciaId: '1603' },
    { id: '160302', nombre: 'CAMANÁ', provinciaId: '1603' },
    { id: '160303', nombre: 'PADRE ABAD', provinciaId: '1603' },
    { id: '160304', nombre: 'CURIMANA', provinciaId: '1603' },
  ],
  '1604': [
    { id: '160401', nombre: 'RAMON CASTILLA', provinciaId: '1604' },
    { id: '160402', nombre: 'JENARO HERRERA', provinciaId: '1604' },
    { id: '160403', nombre: 'YAVARI', provinciaId: '1604' },
    { id: '160404', nombre: 'SARAMURO', provinciaId: '1604' },
  ],
  '1605': [
    { id: '160501', nombre: 'YURIMAGUAS', provinciaId: '1605' },
    { id: '160502', nombre: 'BALSAPUERTO', provinciaId: '1605' },
    { id: '160503', nombre: 'JENARO HERRERA', provinciaId: '1605' },
    { id: '160504', nombre: 'LAGUNAS', provinciaId: '1605' },
    { id: '160505', nombre: 'SANTO TOMAS', provinciaId: '1605' },
  ],
  '1606': [
    { id: '160601', nombre: 'REQUENA', provinciaId: '1606' },
    { id: '160602', nombre: 'CAPAHUARI', provinciaId: '1606' },
    { id: '160603', nombre: 'EMILIO', provinciaId: '1606' },
    { id: '160604', nombre: 'MAQUIA', provinciaId: '1606' },
    { id: '160605', nombre: 'SAQUENA', provinciaId: '1606' },
  ],
  '1607': [
    { id: '160701', nombre: 'MARISCAL RAMON CASTILLA', provinciaId: '1607' },
    { id: '160702', nombre: 'YAVARI', provinciaId: '1607' },
    { id: '160703', nombre: 'PEBAS', provinciaId: '1607' },
    { id: '160704', nombre: 'NAPO', provinciaId: '1607' },
  ],
  '1608': [
    { id: '160801', nombre: 'MANSENATE', provinciaId: '1608' },
    { id: '160802', nombre: 'TENIENTE MANUEL CLAVERO', provinciaId: '1608' },
    { id: '160803', nombre: 'PUTUMAYO', provinciaId: '1608' },
  ],
}
