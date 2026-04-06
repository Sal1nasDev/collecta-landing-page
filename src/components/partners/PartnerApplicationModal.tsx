import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitHubSpotForm } from "@/lib/hubspot";

const PARTNER_FORM_GUID = import.meta.env.VITE_HUBSPOT_PARTNER_FORM_GUID as string;

interface PartnerApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultLevel?: string;
}

const PartnerApplicationModal = ({ open, onOpenChange, defaultLevel = "not-sure" }: PartnerApplicationModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", role: "", level: defaultLevel, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleOpenChange = (value: boolean) => {
    if (value) setForm((prev) => ({ ...prev, level: defaultLevel }));
    onOpenChange(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.company || !form.role || !form.level) {
      toast({ title: t('partners.modal.errorTitle'), description: t('partners.modal.errorMessage'), variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitHubSpotForm(PARTNER_FORM_GUID, [
        { name: "firstname", value: form.firstName },
        { name: "lastname", value: form.lastName },
        { name: "email", value: form.email },
        { name: "company", value: form.company },
        { name: "jobtitle", value: form.role },
        { name: "arms_partner_level", value: form.level },
        { name: "2-32057200/partner_id", value: "" },
        { name: "message", value: form.message },
      ]);
      toast({ title: t('partners.modal.successTitle'), description: t('partners.modal.successMessage') });
      setForm({ firstName: "", lastName: "", email: "", company: "", role: "", level: "not-sure", message: "" });
      onOpenChange(false);
    } catch {
      toast({ title: t('partners.modal.errorTitle'), description: t('partners.modal.errorMessage'), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl sm:text-2xl font-bold">{t('partners.modal.title')}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{t('partners.modal.subtitle')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">{t('partners.modal.firstName')}</label>
              <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder={t('partners.modal.firstName').replace(' *', '')} className="h-11" maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">{t('partners.modal.lastName')}</label>
              <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder={t('partners.modal.lastName').replace(' *', '')} className="h-11" maxLength={100} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t('partners.modal.email')}</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="h-11" maxLength={255} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t('partners.modal.company')}</label>
            <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t('partners.modal.company').replace(' *', '')} className="h-11" maxLength={200} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t('partners.modal.role')}</label>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder={t('partners.modal.rolePlaceholder')} className="h-11" maxLength={150} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t('partners.modal.partnershipType')}</label>
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="registered">{t('partners.modal.options.registered')}</option>
              <option value="certified">{t('partners.modal.options.certified')}</option>
              <option value="strategic">{t('partners.modal.options.strategic')}</option>
              <option value="not-sure">{t('partners.modal.options.notSure')}</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t('partners.modal.message')}</label>
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t('partners.modal.messagePlaceholder')} className="min-h-[90px]" maxLength={1000} />
          </div>

          <Button type="submit" variant="cta" size="xl" className="w-full" disabled={submitting}>
            {submitting ? t('partners.modal.submitting') : t('partners.modal.submit')}
          </Button>

          <p className="text-xs text-muted-foreground text-center">{t('partners.modal.footer')}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerApplicationModal;
