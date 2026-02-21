"use client";

import * as React from "react";
import { Save, X, ChevronDown, Building2, MapPin, User, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LORETO_DATA, PROVINCIAS_LORETO, DISTRITOS_LORETO } from "@/lib/loreto-data";
import { NotificacionFormData, validateNotificacion, TIPOS_DOCUMENTO, TIPOS_SEXO, NACIONALIDADES, ETNIAS, TIPOS_EDAD, PROCEDENCIAS, TIPOS_VIA, AGRUPAMIENTOS, TIPOS_DIAGNOSTICO, OPCIONES_SI_NO } from "@/lib/notificacion-schema";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

function SelectField({ value, onChange, placeholder, options, required, error }: SelectFieldProps) {
  return (
    <FormField label="" required={required} error={error}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

interface ComboboxFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { id: string; label: string }[];
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

function ComboboxField({ value, onChange, placeholder, options, required, error, icon }: ComboboxFieldProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField label="" required={required} error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={`w-full justify-between ${error ? "border-red-500" : ""}`}
          >
            <div className="flex items-center gap-2">
              {icon && <span className="shrink-0">{icon}</span>}
              <span className={value ? "" : "text-muted-foreground"}>
                {value || placeholder}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.id}
                    value={opt.label}
                    onSelect={() => {
                      onChange(opt.label);
                      setOpen(false);
                    }}
                  >
                    {icon && <span className="mr-2">{icon}</span>}
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export function NotificacionForm() {
  const [formData, setFormData] = React.useState<NotificacionFormData>({
    tipoVigilancia: "VIGILANCIA PASIVA",
    diresa: "LORETO",
    red: "",
    microred: "",
    establecimiento: "",
    tipoDocumento: "",
    numeroDocumento: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    sexo: "",
    nacionalidad: "PERU",
    etnia: "",
    puebloEtnico: "",
    numeroHistoriaClinica: "",
    fechaHospitalizacion: "",
    edad: "",
    tipoEdad: "AÑOS",
    paisPaciente: "PERU",
    departamentoPaciente: "LORETO",
    provinciaPaciente: "",
    distritoPaciente: "",
    procedencia: "",
    tipoVia: "",
    numeroPuerta: "",
    nombreVia: "",
    agrupamientoRuralUrbano: "",
    nombreAgrupamiento: "",
    manzana: "",
    block: "",
    interior: "",
    kilometro: "",
    lote: "",
    referencia: "",
    latitud: "",
    longitud: "",
    paisInfección: "PERU",
    departamentoInfección: "LORETO",
    provinciaInfección: "",
    distritoInfección: "",
    localidad: "",
    diagnostico: "",
    tipoDiagnostico: "",
    protegido: "",
    tomaMuestra: "",
    inicioSintomas: "",
    anioSemana: "",
    semana: "",
    defuncion: "",
    investigacion: "",
    notificacion: "",
    anioNotificacion: "",
    semanaNotificacion: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [currentYear] = React.useState(new Date().getFullYear());

  const redesOptions = LORETO_DATA.redes.map(r => ({ id: r.id, label: r.nombre }));
  const microredesOptions = formData.red ? (LORETO_DATA.microrredes[formData.red as keyof typeof LORETO_DATA.microrredes] || []).map((m: { id: string; nombre: string }) => ({ id: m.id, label: m.nombre })) : [];
  const establecimientosOptions = formData.microred ? (LORETO_DATA.establecimientos[formData.microred as keyof typeof LORETO_DATA.establecimientos] || []).map((e: { id: string; codigo: string; nombre: string }) => ({ id: e.id, label: `${e.codigo} - ${e.nombre}` })) : [];
  
  const provinciasPacienteOptions = PROVINCIAS_LORETO.map(p => ({ id: p.id, label: p.nombre }));
  const distritosPacienteOptions = formData.provinciaPaciente ? (DISTRITOS_LORETO[formData.provinciaPaciente] || []).map(d => ({ id: d.id, label: d.nombre })) : [];
  
  const provinciasInfeccionOptions = PROVINCIAS_LORETO.map(p => ({ id: p.id, label: p.nombre }));
  const distritosInfeccionOptions = formData.provinciaInfección ? (DISTRITOS_LORETO[formData.provinciaInfección] || []).map(d => ({ id: d.id, label: d.nombre })) : [];

  const handleChange = (field: keyof NotificacionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateNotificacion(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", formData);
    alert("Notificación guardada correctamente");
  };

  const handleCancel = () => {
    if (confirm("¿Está seguro de cancelar? Los datos no guardados se perderán.")) {
      window.history.back();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Usuario Reg: <span className="font-medium text-foreground">-</span> |{" "}
          Fecha Reg: <span className="font-medium text-foreground">-</span> |{" "}
          Usuario Mod: <span className="font-medium text-foreground">-</span> |{" "}
          Fecha Mod: <span className="font-medium text-foreground">-</span>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Datos Notificación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tipo Vigilancia" required error={errors.tipoVigilancia}>
              <Select value={formData.tipoVigilancia} onValueChange={(v: string) => handleChange("tipoVigilancia", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VIGILANCIA PASIVA">VIGILANCIA PASIVA</SelectItem>
                  <SelectItem value="VIGILANCIA ACTIVA">VIGILANCIA ACTIVA</SelectItem>
                  <SelectItem value="VIGILANCIA CENTINELA">VIGILANCIA CENTINELA</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Establecimiento Notificante</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="Diresa" required>
              <Input value={formData.diresa} disabled className="bg-muted" />
            </FormField>
            <ComboboxField
              value={formData.red}
              onChange={(v) => {
                const red = LORETO_DATA.redes.find(r => r.nombre === v);
                handleChange("red", red?.id || "");
                handleChange("microred", "");
                handleChange("establecimiento", "");
              }}
              placeholder="Seleccionar..."
              options={redesOptions}
              required
              error={errors.red}
              icon={<Building2 className="h-4 w-4" />}
            />
            <ComboboxField
              value={formData.microred}
              onChange={(v) => {
                handleChange("microred", v);
                handleChange("establecimiento", "");
              }}
              placeholder="Seleccionar..."
              options={microredesOptions}
              required
              error={errors.microred}
              icon={<Building2 className="h-4 w-4" />}
            />
            <ComboboxField
              value={formData.establecimiento}
              onChange={(v) => handleChange("establecimiento", v)}
              placeholder="Seleccionar..."
              options={establecimientosOptions}
              required
              error={errors.establecimiento}
              icon={<Building2 className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectField
              value={formData.tipoDocumento}
              onChange={(v) => handleChange("tipoDocumento", v)}
              placeholder="Seleccionar..."
              options={TIPOS_DOCUMENTO}
              required
              error={errors.tipoDocumento}
            />
            <FormField label="Número Documento" required error={errors.numeroDocumento}>
              <Input
                value={formData.numeroDocumento}
                onChange={(e) => handleChange("numeroDocumento", e.target.value)}
                placeholder="Número"
              />
            </FormField>
            <FormField label="Apellido Paterno" required error={errors.apellidoPaterno}>
              <Input
                value={formData.apellidoPaterno}
                onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
                placeholder="Apellido Paterno"
              />
            </FormField>
            <FormField label="Apellido Materno" required error={errors.apellidoMaterno}>
              <Input
                value={formData.apellidoMaterno}
                onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
                placeholder="Apellido Materno"
              />
            </FormField>
            <FormField label="Nombres" required error={errors.nombres}>
              <Input
                value={formData.nombres}
                onChange={(e) => handleChange("nombres", e.target.value)}
                placeholder="Nombres"
              />
            </FormField>
            <SelectField
              value={formData.sexo}
              onChange={(v) => handleChange("sexo", v)}
              placeholder="Seleccionar..."
              options={TIPOS_SEXO}
              required
              error={errors.sexo}
            />
            <SelectField
              value={formData.nacionalidad}
              onChange={(v) => handleChange("nacionalidad", v)}
              placeholder="Seleccionar..."
              options={NACIONALIDADES}
            />
            <SelectField
              value={formData.etnia}
              onChange={(v: string) => handleChange("etnia", v)}
              placeholder="Seleccionar..."
              options={ETNIAS}
            />
            <FormField label="Pueblo Etnico">
              <Select value={formData.puebloEtnico} onValueChange={(v) => handleChange("puebloEtnico", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NINGUNO">Ninguno</SelectItem>
                  <SelectItem value="QUEIXUA">Quechua</SelectItem>
                  <SelectItem value="AMAZONICO">Pueblo Amazónico</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="N° Historia Clínica">
              <Input
                value={formData.numeroHistoriaClinica}
                onChange={(e) => handleChange("numeroHistoriaClinica", e.target.value)}
                placeholder="N° historia Clínica"
              />
            </FormField>
            <FormField label="Fecha Hospitalización">
              <Input
                type="date"
                value={formData.fechaHospitalizacion}
                onChange={(e) => handleChange("fechaHospitalizacion", e.target.value)}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-2">
              <FormField label="Edad" required error={errors.edad}>
                <Input
                  type="number"
                  value={formData.edad}
                  onChange={(e) => handleChange("edad", e.target.value)}
                  placeholder="Edad"
                />
              </FormField>
              <SelectField
                value={formData.tipoEdad}
                onChange={(v) => handleChange("tipoEdad", v)}
                placeholder="Tipo..."
                options={TIPOS_EDAD}
                required
                error={errors.tipoEdad}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Dirección Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="País">
              <Input value={formData.paisPaciente} disabled className="bg-muted" />
            </FormField>
            <FormField label="Departamento">
              <Input value={formData.departamentoPaciente} disabled className="bg-muted" />
            </FormField>
            <ComboboxField
              value={formData.provinciaPaciente}
              onChange={(v) => {
                const prov = PROVINCIAS_LORETO.find(p => p.nombre === v);
                handleChange("provinciaPaciente", prov?.id || "");
                handleChange("distritoPaciente", "");
              }}
              placeholder="Seleccionar..."
              options={provinciasPacienteOptions}
              icon={<MapPin className="h-4 w-4" />}
            />
            <ComboboxField
              value={formData.distritoPaciente}
              onChange={(v) => handleChange("distritoPaciente", v)}
              placeholder="Seleccionar..."
              options={distritosPacienteOptions}
              required
              error={errors.distritoPaciente}
              icon={<MapPin className="h-4 w-4" />}
            />
            <SelectField
              value={formData.procedencia}
              onChange={(v) => handleChange("procedencia", v)}
              placeholder="Seleccionar..."
              options={PROCEDENCIAS}
            />
            <SelectField
              value={formData.tipoVia}
              onChange={(v) => handleChange("tipoVia", v)}
              placeholder="Seleccionar..."
              options={TIPOS_VIA}
            />
            <FormField label="Número de Puerta">
              <Input
                value={formData.numeroPuerta}
                onChange={(e) => handleChange("numeroPuerta", e.target.value)}
                placeholder="Número"
              />
            </FormField>
            <FormField label="Nombre de la vía">
              <Input
                value={formData.nombreVia}
                onChange={(e) => handleChange("nombreVia", e.target.value)}
                placeholder="Nombre"
              />
            </FormField>
            <SelectField
              value={formData.agrupamientoRuralUrbano}
              onChange={(v) => handleChange("agrupamientoRuralUrbano", v)}
              placeholder="Seleccionar..."
              options={AGRUPAMIENTOS}
            />
            <FormField label="Nombre Agrupamiento">
              <Input
                value={formData.nombreAgrupamiento}
                onChange={(e) => handleChange("nombreAgrupamiento", e.target.value)}
                placeholder="Nombre"
              />
            </FormField>
            <FormField label="Manzana">
              <Input
                value={formData.manzana}
                onChange={(e) => handleChange("manzana", e.target.value)}
              />
            </FormField>
            <FormField label="Block">
              <Input
                value={formData.block}
                onChange={(e) => handleChange("block", e.target.value)}
              />
            </FormField>
            <FormField label="Interior">
              <Input
                value={formData.interior}
                onChange={(e) => handleChange("interior", e.target.value)}
              />
            </FormField>
            <FormField label="Kilómetro">
              <Input
                value={formData.kilometro}
                onChange={(e) => handleChange("kilometro", e.target.value)}
              />
            </FormField>
            <FormField label="Lote">
              <Input
                value={formData.lote}
                onChange={(e) => handleChange("lote", e.target.value)}
              />
            </FormField>
            <FormField label="Referencia">
              <Input
                value={formData.referencia}
                onChange={(e) => handleChange("referencia", e.target.value)}
              />
            </FormField>
            <FormField label="Latitud">
              <Input
                value={formData.latitud}
                onChange={(e) => handleChange("latitud", e.target.value)}
                placeholder="Latitud"
              />
            </FormField>
            <FormField label="Longitud">
              <Input
                value={formData.longitud}
                onChange={(e) => handleChange("longitud", e.target.value)}
                placeholder="Longitud"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lugar Probable Infección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="País">
              <Input value={formData.paisInfección} disabled className="bg-muted" />
            </FormField>
            <FormField label="Departamento">
              <Input value={formData.departamentoInfección} disabled className="bg-muted" />
            </FormField>
            <ComboboxField
              value={formData.provinciaInfección}
              onChange={(v) => {
                const prov = PROVINCIAS_LORETO.find(p => p.nombre === v);
                handleChange("provinciaInfección", prov?.id || "");
                handleChange("distritoInfección", "");
              }}
              placeholder="Seleccionar..."
              options={provinciasInfeccionOptions}
              icon={<MapPin className="h-4 w-4" />}
            />
            <ComboboxField
              value={formData.distritoInfección}
              onChange={(v) => handleChange("distritoInfección", v)}
              placeholder="Seleccionar..."
              options={distritosInfeccionOptions}
              required
              error={errors.distritoInfección}
              icon={<MapPin className="h-4 w-4" />}
            />
            <FormField label="Localidad">
              <Input
                value={formData.localidad}
                onChange={(e) => handleChange("localidad", e.target.value)}
                placeholder="Localidad"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Diagnóstico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="Diagnóstico" required error={errors.diagnostico}>
              <Select value={formData.diagnostico} onValueChange={(v) => handleChange("diagnostico", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A00">A00 - Cólera</SelectItem>
                  <SelectItem value="A01">A01 - Fiebres tifoideas y paratifoideas</SelectItem>
                  <SelectItem value="A02">A02 - Otras infecciones intestinales</SelectItem>
                  <SelectItem value="A15">A15 - Tuberculosis respiratoria</SelectItem>
                  <SelectItem value="A20">A20 - Peste</SelectItem>
                  <SelectItem value="A90">A90 - Dengue [fiebre dengue]</SelectItem>
                  <SelectItem value="B05">B05 - Sarampión</SelectItem>
                  <SelectItem value="B06">B06 - Rubéola</SelectItem>
                  <SelectItem value="J06">J06 - Infecciones agudas vias respiratorias</SelectItem>
                  <SelectItem value="OTRO">Otro</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <SelectField
              value={formData.tipoDiagnostico}
              onChange={(v) => handleChange("tipoDiagnostico", v)}
              placeholder="Seleccionar..."
              options={TIPOS_DIAGNOSTICO}
              required
              error={errors.tipoDiagnostico}
            />
            <SelectField
              value={formData.protegido}
              onChange={(v) => handleChange("protegido", v)}
              placeholder="Seleccionar..."
              options={OPCIONES_SI_NO}
            />
            <SelectField
              value={formData.tomaMuestra}
              onChange={(v) => handleChange("tomaMuestra", v)}
              placeholder="Seleccionar..."
              options={OPCIONES_SI_NO}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Fechas y Semanas Epidemiológicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="Inicio de Síntomas" required error={errors.inicioSintomas}>
              <Input
                type="date"
                value={formData.inicioSintomas}
                onChange={(e) => handleChange("inicioSintomas", e.target.value)}
              />
            </FormField>
            <FormField label="Año" required error={errors.anioSemana}>
              <Select value={formData.anioSemana} onValueChange={(v) => handleChange("anioSemana", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map(y => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Semana" required error={errors.semana}>
              <Select value={formData.semana} onValueChange={(v) => handleChange("semana", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semana" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 52 }, (_, i) => i + 1).map(s => (
                    <SelectItem key={s} value={s.toString()}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Defunción">
              <Input
                type="date"
                value={formData.defuncion}
                onChange={(e) => handleChange("defuncion", e.target.value)}
              />
            </FormField>
            <FormField label="Investigación">
              <Input
                type="date"
                value={formData.investigacion}
                onChange={(e) => handleChange("investigacion", e.target.value)}
              />
            </FormField>
            <FormField label="Notificación" required error={errors.notificacion}>
              <Input
                type="date"
                value={formData.notificacion}
                onChange={(e) => handleChange("notificacion", e.target.value)}
              />
            </FormField>
            <FormField label="Año de Notificación" required error={errors.anioNotificacion}>
              <Select value={formData.anioNotificacion} onValueChange={(v) => handleChange("anioNotificacion", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map(y => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Semana de Notificación" required error={errors.semanaNotificacion}>
              <Select value={formData.semanaNotificacion} onValueChange={(v) => handleChange("semanaNotificacion", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semana" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 52 }, (_, i) => i + 1).map(s => (
                    <SelectItem key={s} value={s.toString()}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Usuario Reg: <span className="font-medium text-foreground">-</span> |{" "}
          Fecha Reg: <span className="font-medium text-foreground">-</span> |{" "}
          Usuario Mod: <span className="font-medium text-foreground">-</span> |{" "}
          Fecha Mod: <span className="font-medium text-foreground">-</span>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
}
