"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, Car } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StageLogo } from "@/components/StageLogo";
import type { FipeBrand, FipeModel, FipeYear } from "@/lib/fipe";

const formSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  whatsapp: z
    .string()
    .min(14, "Informe o número com DDD. Ex: (85) 99999-9999")
    .max(15),
  marcaCodigo: z.string().min(1, "Selecione a marca"),
  modeloCodigo: z.string().min(1, "Selecione o modelo"),
  anoCodigo: z.string().min(1, "Selecione o ano"),
  versao: z.string().optional(),
  quilometragem: z.string().min(1, "Informe a quilometragem"),
});

type FormData = z.infer<typeof formSchema>;

interface VehicleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatKm(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function VehicleForm({ open, onOpenChange }: VehicleFormProps) {
  const [brands, setBrands] = useState<FipeBrand[]>([]);
  const [models, setModels] = useState<FipeModel[]>([]);
  const [years, setYears] = useState<FipeYear[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fipePrice, setFipePrice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      marcaCodigo: "",
      modeloCodigo: "",
      anoCodigo: "",
      versao: "",
      quilometragem: "",
    },
  });

  const selectedBrand = watch("marcaCodigo");
  const selectedModel = watch("modeloCodigo");
  const selectedYear = watch("anoCodigo");

  // Load brands on open
  useEffect(() => {
    if (!open || brands.length > 0) return;
    setLoadingBrands(true);
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch(() => {})
      .finally(() => setLoadingBrands(false));
  }, [open, brands.length]);

  // Load models when brand changes
  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      return;
    }
    setLoadingModels(true);
    setValue("modeloCodigo", "");
    setValue("anoCodigo", "");
    setYears([]);
    setFipePrice(null);
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`
    )
      .then((res) => res.json())
      .then((data) => setModels(data.modelos || []))
      .catch(() => {})
      .finally(() => setLoadingModels(false));
  }, [selectedBrand, setValue]);

  // Load years when model changes
  useEffect(() => {
    if (!selectedBrand || !selectedModel) {
      setYears([]);
      return;
    }
    setLoadingYears(true);
    setValue("anoCodigo", "");
    setFipePrice(null);
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos`
    )
      .then((res) => res.json())
      .then((data) => setYears(data || []))
      .catch(() => {})
      .finally(() => setLoadingYears(false));
  }, [selectedBrand, selectedModel, setValue]);

  // Fetch FIPE price when year is selected
  useEffect(() => {
    if (!selectedBrand || !selectedModel || !selectedYear) {
      setFipePrice(null);
      return;
    }
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`
    )
      .then((res) => res.json())
      .then((data) => setFipePrice(data.Valor || null))
      .catch(() => setFipePrice(null));
  }, [selectedBrand, selectedModel, selectedYear]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setSubmitting(true);
      
      try {
        const marca = brands.find(b => b.codigo === data.marcaCodigo)?.nome || data.marcaCodigo;
        const modelo = models.find(m => String(m.codigo) === data.modeloCodigo)?.nome || data.modeloCodigo;
        const ano = years.find(y => y.codigo === data.anoCodigo)?.nome || data.anoCodigo;

        const payload = {
          ...data,
          marca_nome: marca,
          modelo_nome: modelo,
          ano_nome: ano,
          valor_fipe: fipePrice,
          origem: "Stage Motors Formulario"
        };

        await fetch("https://webhook.salesland.com.br/webhook/edda860e-5fce-463a-91e4-1267cf522833", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("Form submitted to webhook:", payload);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
        setSuccess(true);
      }
    },
    [brands, models, years, fipePrice]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setSuccess(false);
      setFipePrice(null);
      reset();
    }, 300);
  }, [onOpenChange, reset]);

  // Success state
  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="border-white/10 bg-[#0a0a0a] sm:max-w-md">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="size-10 text-green-500" />
            </div>
            <h3 className="mt-6 font-display text-3xl tracking-wider text-white">
              RECEBEMOS SEUS DADOS
            </h3>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Em até{" "}
              <span className="font-semibold text-white">2 horas</span>{" "}
              entraremos em contato pelo seu WhatsApp com uma proposta para o seu
              veículo.
            </p>
            <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.03] px-6 py-3">
              <p className="text-sm text-muted-foreground">
                Fique de olho no seu WhatsApp
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="mt-8 h-12 cursor-pointer rounded-lg bg-zinc-300 px-8 font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              ENTENDIDO
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0a0a0a] sm:max-w-lg">
        <DialogHeader className="items-center text-center">
          <div className="mb-2">
            <StageLogo className="mx-auto h-8" />
          </div>
          <DialogTitle className="font-display text-2xl tracking-wider text-white">
            VENDA SEU VEÍCULO
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados abaixo e receba uma proposta em até 2 horas.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-5"
        >
          {/* Personal info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome" className="text-sm text-muted-foreground">
                Nome completo
              </Label>
              <Input
                id="nome"
                placeholder="Seu nome"
                className="mt-1.5 h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                {...register("nome")}
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="whatsapp"
                className="text-sm text-muted-foreground"
              >
                WhatsApp (DDD + Número)
              </Label>
              <Input
                id="whatsapp"
                placeholder="(85) 99999-9999"
                className="mt-1.5 h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                {...register("whatsapp")}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue("whatsapp", formatted, { shouldValidate: true });
                }}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Informe o DDD + número. Ex: (85) 99999-9999
              </p>
              {errors.whatsapp && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <Car className="size-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Dados do veículo
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Vehicle info */}
          <div className="space-y-4">
            {/* Brand */}
            <div>
              <Label className="text-sm text-muted-foreground">Marca</Label>
              <Select
                value={selectedBrand}
                onValueChange={(val) =>
                  setValue("marcaCodigo", val ?? "", { shouldValidate: true })
                }
                disabled={loadingBrands}
              >
                <SelectTrigger className="mt-1.5 h-11 border-white/10 bg-white/5 text-white">
                  <SelectValue
                    placeholder={
                      loadingBrands ? "Carregando marcas..." : "Selecione a marca"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 border-white/10 bg-[#111]">
                  {brands.map((brand) => (
                    <SelectItem key={brand.codigo} value={brand.codigo}>
                      {brand.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.marcaCodigo && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.marcaCodigo.message}
                </p>
              )}
            </div>

            {/* Model */}
            <div>
              <Label className="text-sm text-muted-foreground">Modelo</Label>
              <Select
                value={selectedModel}
                onValueChange={(val) =>
                  setValue("modeloCodigo", val ?? "", { shouldValidate: true })
                }
                disabled={!selectedBrand || loadingModels}
              >
                <SelectTrigger className="mt-1.5 h-11 border-white/10 bg-white/5 text-white">
                  <SelectValue
                    placeholder={
                      loadingModels
                        ? "Carregando modelos..."
                        : "Selecione o modelo"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 border-white/10 bg-[#111]">
                  {models.map((model) => (
                    <SelectItem
                      key={model.codigo}
                      value={String(model.codigo)}
                    >
                      {model.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.modeloCodigo && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.modeloCodigo.message}
                </p>
              )}
            </div>

            {/* Year */}
            <div>
              <Label className="text-sm text-muted-foreground">Ano</Label>
              <Select
                value={selectedYear}
                onValueChange={(val) =>
                  setValue("anoCodigo", val ?? "", { shouldValidate: true })
                }
                disabled={!selectedModel || loadingYears}
              >
                <SelectTrigger className="mt-1.5 h-11 border-white/10 bg-white/5 text-white">
                  <SelectValue
                    placeholder={
                      loadingYears ? "Carregando anos..." : "Selecione o ano"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 border-white/10 bg-[#111]">
                  {years.map((year) => (
                    <SelectItem key={year.codigo} value={year.codigo}>
                      {year.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.anoCodigo && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.anoCodigo.message}
                </p>
              )}
            </div>

            {/* FIPE Price indicator */}
            {fipePrice && (
              <div className="rounded-lg border border-stage-red/20 bg-stage-red/5 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Valor Tabela FIPE
                </p>
                <p className="mt-1 font-display text-2xl text-stage-red">
                  {fipePrice}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Referência para avaliação do seu veículo
                </p>
              </div>
            )}

            {/* Version */}
            <div>
              <Label htmlFor="versao" className="text-sm text-muted-foreground">
                Versão{" "}
                <span className="text-muted-foreground/50">(opcional)</span>
              </Label>
              <Input
                id="versao"
                placeholder="Ex: LTZ, Premier, Titanium..."
                className="mt-1.5 h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                {...register("versao")}
              />
            </div>

            {/* Mileage */}
            <div>
              <Label
                htmlFor="quilometragem"
                className="text-sm text-muted-foreground"
              >
                Quilometragem
              </Label>
              <Input
                id="quilometragem"
                placeholder="Ex: 45.000"
                className="mt-1.5 h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                {...register("quilometragem")}
                onChange={(e) => {
                  const formatted = formatKm(e.target.value);
                  setValue("quilometragem", formatted, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.quilometragem && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.quilometragem.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="h-14 w-full cursor-pointer rounded-lg bg-zinc-300 text-base font-semibold tracking-wide text-zinc-900 transition-all hover:bg-zinc-200 cta-glow disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                ENVIANDO...
              </>
            ) : (
              "ENVIAR PARA AVALIAÇÃO"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Retornamos em até 2 horas pelo WhatsApp. Sem compromisso.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
