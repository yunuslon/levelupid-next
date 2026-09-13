"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@levelupid/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@levelupid/ui/components/form";
import { Input } from "@levelupid/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@levelupid/ui/components/select";
import { Textarea } from "@levelupid/ui/components/textarea";

import { useOnboardingStore } from "../_store/onboarding-store";

const identitasSchema = z.object({
  storeName: z.string().min(3, "Nama toko minimal 3 karakter"),
  businessCategory: z.string().min(1, "Pilih kategori usaha"),
  description: z.string().max(500).optional(),
  tagline: z.string().max(100).optional(),
});

type IdentitasFormData = z.infer<typeof identitasSchema>;

const BUSINESS_CATEGORIES = [
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "food", label: "Food & Beverage" },
  { value: "electronics", label: "Electronics" },
  { value: "home", label: "Home & Garden" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "automotive", label: "Automotive" },
  { value: "other", label: "Lainnya" },
];

export function IdentitasStep({ onComplete }: { onComplete: () => void }) {
  const { formData, updateField, markStepComplete } = useOnboardingStore();

  const form = useForm<IdentitasFormData>({
    resolver: zodResolver(identitasSchema),
    defaultValues: {
      storeName: formData.storeName,
      businessCategory: formData.businessCategory,
      description: formData.description,
      tagline: formData.tagline,
    },
  });

  const onSubmit = (data: IdentitasFormData) => {
    updateField("storeName", data.storeName);
    updateField("businessCategory", data.businessCategory);
    updateField("description", data.description);
    updateField("tagline", data.tagline);
    markStepComplete(0);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Identitas Toko</h2>
        <p className="text-sm text-muted-foreground">
          Berikan informasi dasar tentang toko Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Nama Toko *</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Toko ABC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessCategory"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Kategori Usaha *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  items={BUSINESS_CATEGORIES}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jelaskan tentang toko Anda..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maksimal 500 karakter</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Kualitas Terbaik, Harga Terjangkau"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Slogan singkat toko Anda (maksimal 100 karakter)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Lanjut ke Kontak
          </Button>
        </form>
      </Form>
    </div>
  );
}
